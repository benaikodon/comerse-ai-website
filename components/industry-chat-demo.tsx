"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Send, Bot, User, Loader2, Shirt, Smartphone, Sparkles, Home } from "lucide-react"

const industries = [
  { value: "fashion", label: "Fashion & Apparel", icon: Shirt, color: "text-blue-600" },
  { value: "electronics", label: "Electronics", icon: Smartphone, color: "text-green-600" },
  { value: "beauty", label: "Health & Beauty", icon: Sparkles, color: "text-purple-600" },
  { value: "home", label: "Home Goods", icon: Home, color: "text-orange-600" },
]

const sampleQueries = {
  fashion: [
    "Do you have winter coats in size medium?",
    "What's the return policy for dresses?",
    "Can you recommend jeans for petite sizes?",
  ],
  electronics: [
    "Is this router compatible with my ISP?",
    "What's the battery life on these headphones?",
    "Do you offer technical support for setup?",
  ],
  beauty: [
    "Is this moisturizer suitable for oily skin?",
    "What ingredients are in this serum?",
    "Do you have fragrance-free options?",
  ],
  home: [
    "What's the weight capacity of this chair?",
    "Do you offer assembly services?",
    "What are the dimensions of this table?",
  ],
}

export function IndustryChatDemo() {
  const [selectedIndustry, setSelectedIndustry] = useState("fashion")

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat/ecommerce",
    body: { storeType: selectedIndustry },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your AI assistant. I'm here to help you with product information, sizing, shipping, returns, and any other questions you might have. How can I assist you today?",
      },
    ],
  })

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry)
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your AI assistant. I'm here to help you with product information, sizing, shipping, returns, and any other questions you might have. How can I assist you today?",
      },
    ])
  }

  const selectedIndustryData = industries.find((ind) => ind.value === selectedIndustry)
  const Icon = selectedIndustryData?.icon || Shirt

  return (
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-gray-900 font-semibold">
            <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
            Industry-Specific AI Demo
          </CardTitle>
          <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
            <SelectTrigger className="w-48 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {industries.map((industry) => {
                const IndustryIcon = industry.icon
                return (
                  <SelectItem key={industry.value} value={industry.value} className="hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <IndustryIcon className={`h-4 w-4 ${industry.color}`} />
                      <span>{industry.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-gray-600">See how our AI adapts to different ecommerce industries</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-50 rounded-xl p-4 h-96 flex flex-col">
          <div className="flex items-center space-x-2 mb-4 p-3 bg-white rounded-lg border border-gray-200">
            <Icon className={`h-5 w-5 ${selectedIndustryData?.color}`} />
            <span className="text-sm font-medium text-gray-900">{selectedIndustryData?.label} Store</span>
            <Badge className="ml-auto bg-green-100 text-green-800">AI Powered</Badge>
          </div>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && <Bot className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />}
                      {message.role === "user" && <User className="h-4 w-4 text-green-100 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.role === "user" ? "text-green-200" : "text-gray-500"
                          }`}
                        >
                          {message.role === "user" ? "Customer" : "AI Assistant"} •{" "}
                          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-xl p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-green-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder={`Ask about ${selectedIndustryData?.label.toLowerCase()} products...`}
                className="flex-1 bg-white border-gray-200"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {sampleQueries[selectedIndustry as keyof typeof sampleQueries]?.map((query, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 text-xs border-gray-300 text-gray-600"
                  onClick={() => handleInputChange({ target: { value: query } } as any)}
                >
                  {query}
                </Badge>
              ))}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
