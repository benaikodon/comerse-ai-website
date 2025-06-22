"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Upload,
  FileText,
  Database,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Plus,
  Trash2,
  Edit,
  Globe,
  ShoppingCart,
  Package,
} from "lucide-react"

export default function TrainingPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(65)

  const dataSources = [
    { name: "Product Catalog", status: "connected", items: "2,847 products", lastSync: "2 hours ago" },
    { name: "FAQ Database", status: "connected", items: "156 questions", lastSync: "1 day ago" },
    { name: "Return Policy", status: "connected", items: "1 document", lastSync: "3 days ago" },
    { name: "Shipping Info", status: "pending", items: "0 items", lastSync: "Never" },
  ]

  const trainingMetrics = [
    { label: "Product Knowledge", score: 92, color: "bg-green-500" },
    { label: "Customer Service", score: 88, color: "bg-blue-500" },
    { label: "Policy Understanding", score: 95, color: "bg-purple-500" },
    { label: "Technical Support", score: 76, color: "bg-yellow-500" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Training Center</h1>
        <p className="text-gray-600 mt-2">
          Train your AI assistant with your specific product catalog and business knowledge
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 text-blue-600 mr-2" />
              Training Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Training Progress</span>
                <span className="text-sm text-gray-600">{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />

              <div className="grid grid-cols-2 gap-4 mt-6">
                {trainingMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <span className="text-sm text-gray-600">{metric.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${metric.color}`} style={{ width: `${metric.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {isTraining && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                    <span className="text-sm font-medium text-blue-800">Training in progress...</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Processing new product data and updating AI knowledge base
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 text-blue-600 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={() => setIsTraining(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retrain AI
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Training Data
            </Button>
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              View Training Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="data-sources" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
          <TabsTrigger value="product-catalog">Product Catalog</TabsTrigger>
          <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          <TabsTrigger value="custom-training">Custom Training</TabsTrigger>
        </TabsList>

        <TabsContent value="data-sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-blue-600 mr-2" />
                  Connected Data Sources
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Source
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {source.name.includes("Product") && <Package className="h-5 w-5 text-blue-600" />}
                        {source.name.includes("FAQ") && <FileText className="h-5 w-5 text-blue-600" />}
                        {source.name.includes("Policy") && <FileText className="h-5 w-5 text-blue-600" />}
                        {source.name.includes("Shipping") && <Globe className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{source.name}</h3>
                        <p className="text-sm text-gray-600">
                          {source.items} • Last sync: {source.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={source.status === "connected" ? "default" : "secondary"}>
                        {source.status === "connected" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {source.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product-catalog" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 text-blue-600 mr-2" />
                  Upload Product Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drop your CSV, JSON, or XML files here</p>
                  <Button variant="outline">Choose Files</Button>
                </div>

                <div>
                  <Label>Data Source Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify Export</SelectItem>
                      <SelectItem value="woocommerce">WooCommerce</SelectItem>
                      <SelectItem value="magento">Magento</SelectItem>
                      <SelectItem value="csv">Generic CSV</SelectItem>
                      <SelectItem value="json">JSON API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm text-gray-600">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 text-blue-600 mr-2" />
                  Catalog Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Products</span>
                    <span className="text-2xl font-bold text-blue-600">2,847</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Categories</span>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Brands</span>
                      <span className="text-sm font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Variants</span>
                      <span className="text-sm font-medium">8,921</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Out of Stock</span>
                      <span className="text-sm font-medium text-red-600">43</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="knowledge-base" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  Business Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Company Information</Label>
                  <Textarea placeholder="Tell us about your company, mission, values..." className="min-h-[100px]" />
                </div>

                <div>
                  <Label>Return Policy</Label>
                  <Textarea placeholder="Describe your return and exchange policy..." className="min-h-[80px]" />
                </div>

                <div>
                  <Label>Shipping Information</Label>
                  <Textarea placeholder="Shipping methods, times, costs..." className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 text-blue-600 mr-2" />
                  AI Personality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tone of Voice</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Response Style</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Custom Instructions</Label>
                  <Textarea
                    placeholder="Any specific instructions for how the AI should behave..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom-training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 text-blue-600 mr-2" />
                Custom Q&A Training
              </CardTitle>
              <p className="text-sm text-gray-600">Add specific questions and answers to improve AI responses</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label>Question</Label>
                  <Textarea placeholder="What question might customers ask?" />
                </div>
                <div>
                  <Label>Ideal Answer</Label>
                  <Textarea placeholder="How should the AI respond?" />
                </div>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Q&A Pair
              </Button>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Existing Q&A Pairs</h4>
                {[
                  { q: "What's your return policy?", a: "We offer 30-day returns..." },
                  { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries..." },
                  { q: "How do I track my order?", a: "You can track your order using..." },
                ].map((qa, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{qa.q}</p>
                        <p className="text-sm text-gray-600 mt-1">{qa.a}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
