import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/pinecone"
import { Pinecone } from "@pinecone-database/pinecone"
import type { Document } from "@langchain/core/documents"

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

const index = pinecone.Index(process.env.PINECONE_INDEX!)

// Initialize embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
})

export async function addDocuments(userId: string, documents: Document[]) {
  try {
    // Add user ID to metadata
    const docsWithUserId = documents.map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        userId,
      },
    }))

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: userId, // Use user ID as namespace for isolation
    })

    await vectorStore.addDocuments(docsWithUserId)
    return { success: true }
  } catch (error) {
    console.error("Vector store error:", error)
    return { success: false, error }
  }
}

export async function searchDocuments(userId: string, query: string, k = 5) {
  try {
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: userId,
    })

    const results = await vectorStore.similaritySearch(query, k)
    return results
  } catch (error) {
    console.error("Vector search error:", error)
    return []
  }
}

export async function deleteUserDocuments(userId: string) {
  try {
    await index.namespace(userId).deleteAll()
    return { success: true }
  } catch (error) {
    console.error("Vector delete error:", error)
    return { success: false, error }
  }
}
