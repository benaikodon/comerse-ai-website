import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin } from "@/lib/supabase"
import { addDocuments } from "@/lib/vector-store"
import { Document } from "@langchain/core/documents"
import { z } from "zod"
import csv from "csv-parser"
import { Readable } from "stream"

const uploadSchema = z.object({
  dataType: z.enum(["product", "faq", "policy", "custom"]),
})

export async function POST(req: NextRequest) {
  try {
    // Get user from session
    const accessToken = req.cookies.get("sb-access-token")?.value
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken)
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const dataType = formData.get("dataType") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const { dataType: validatedDataType } = uploadSchema.parse({ dataType })

    // Process file based on type
    const fileContent = await file.text()
    let documents: Document[] = []

    if (file.name.endsWith(".csv")) {
      documents = await processCSV(fileContent, validatedDataType)
    } else if (file.name.endsWith(".json")) {
      documents = await processJSON(fileContent, validatedDataType)
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    // Store in database
    const { data: trainingData, error: dbError } = await supabaseAdmin
      .from("training_data")
      .insert({
        user_id: user.id,
        data_type: validatedDataType,
        content: { documents: documents.length, filename: file.name },
        status: "processing",
      })
      .select()
      .single()

    if (dbError) {
      throw dbError
    }

    // Add to vector store
    const vectorResult = await addDocuments(user.id, documents)

    if (vectorResult.success) {
      // Update status to completed
      await supabaseAdmin.from("training_data").update({ status: "completed" }).eq("id", trainingData.id)
    } else {
      // Update status to failed
      await supabaseAdmin.from("training_data").update({ status: "failed" }).eq("id", trainingData.id)
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${documents.length} documents`,
      trainingJobId: trainingData.id,
    })
  } catch (error) {
    console.error("Upload error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 })
    }

    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

async function processCSV(content: string, dataType: string): Promise<Document[]> {
  return new Promise((resolve, reject) => {
    const documents: Document[] = []
    const stream = Readable.from([content])

    stream
      .pipe(csv())
      .on("data", (row) => {
        let pageContent = ""
        let metadata: Record<string, any> = { dataType }

        switch (dataType) {
          case "product":
            pageContent = `Product: ${row.name || row.title}\nDescription: ${row.description}\nPrice: ${row.price}\nCategory: ${row.category}`
            metadata = {
              ...metadata,
              name: row.name || row.title,
              price: row.price,
              category: row.category,
              sku: row.sku,
            }
            break
          case "faq":
            pageContent = `Question: ${row.question}\nAnswer: ${row.answer}`
            metadata = {
              ...metadata,
              question: row.question,
              category: row.category,
            }
            break
          default:
            pageContent = Object.values(row).join(" ")
            metadata = { ...metadata, ...row }
        }

        if (pageContent.trim()) {
          documents.push(
            new Document({
              pageContent,
              metadata,
            }),
          )
        }
      })
      .on("end", () => resolve(documents))
      .on("error", reject)
  })
}

async function processJSON(content: string, dataType: string): Promise<Document[]> {
  const data = JSON.parse(content)
  const items = Array.isArray(data) ? data : [data]

  return items.map((item) => {
    let pageContent = ""
    let metadata: Record<string, any> = { dataType }

    switch (dataType) {
      case "product":
        pageContent = `Product: ${item.name || item.title}\nDescription: ${item.description}\nPrice: ${item.price}\nCategory: ${item.category}`
        metadata = {
          ...metadata,
          name: item.name || item.title,
          price: item.price,
          category: item.category,
          sku: item.sku,
        }
        break
      case "faq":
        pageContent = `Question: ${item.question}\nAnswer: ${item.answer}`
        metadata = {
          ...metadata,
          question: item.question,
          category: item.category,
        }
        break
      default:
        pageContent = JSON.stringify(item)
        metadata = { ...metadata, ...item }
    }

    return new Document({
      pageContent,
      metadata,
    })
  })
}
