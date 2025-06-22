"use client"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, Loader2 } from "lucide-react"

interface ChatWidgetProps {
  title?: string
  description?: string
  className?: string
}

export function ChatWidget({
  title = "Comerse.ai Live Assistant Demo",
  description = "See how your AI handles customer queries in real-time",
  className = "",
}: ChatWidgetProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your Fashion Assistant. I'm here to help you find the perfect items and answer any questions about our products, sizing, shipping, and returns. How can I assist you today?",
      },
    ],
  })

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
          {title}
        </CardTitle>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-4 h-96 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-white shadow-sm border"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && <Bot className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                      {message.role === "user" && <User className="h-4 w-4 text-blue-100 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.role === "user" ? "text-blue-200" : "text-gray-500"
                          }`}
                        >
                          {message.role === "user" ? "You" : "Comerse.ai Assistant"} •{" "}
                          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm border rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-500">AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="border-t pt-4 mt-4">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about products, sizing, shipping, returns..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 text-xs"
                onClick={() =>
                  handleInputChange({ target: { value: "Do you have winter coats in size medium?" } } as any)
                }
              >
                Winter coats in medium?
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 text-xs"
                onClick={() => handleInputChange({ target: { value: "What's your return policy?" } } as any)}
              >
                Return policy?
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 text-xs"
                onClick={() => handleInputChange({ target: { value: "How do I track my order?" } } as any)}
              >
                Track my order?
              </Badge>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
