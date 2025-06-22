"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Bot, Clock, CheckCircle, Star } from "lucide-react"
import { ComerseLogo } from "@/components/comerse-logo"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  metadata?: {
    resolved?: boolean
    satisfaction?: number
    category?: string
    responseTime?: string
  }
}

interface Scenario {
  id: string
  title: string
  industry: string
  description: string
  messages: ChatMessage[]
  metrics: {
    responseTime: string
    satisfaction: number
    category: string
  }
}

const demoScenarios: Scenario[] = [
  {
    id: "fashion-return",
    title: "Fashion Return & Exchange",
    industry: "Fashion",
    description: "Customer wants to exchange a winter coat for different size",
    messages: [
      {
        id: "1",
        role: "user",
        content:
          "Hi! I ordered a winter coat last week but it's too small. Can I exchange it for a larger size? My order number is #WC-2024-1234.",
        timestamp: "2:34 PM",
      },
      {
        id: "2",
        role: "assistant",
        content:
          "Hi there! 👋 I found your order #WC-2024-1234 for the Arctic Winter Coat in Medium. I can absolutely help you exchange it for a Large!\n\nI've initiated the exchange process and sent you a prepaid return label via email. Once we receive your return, we'll ship the Large size immediately.\n\n**Expected timeline:** New coat arrives in 3-5 business days! 🚚",
        timestamp: "2:34 PM",
        metadata: {
          resolved: true,
          satisfaction: 5,
          category: "Returns & Exchanges",
          responseTime: "0.3s",
        },
      },
    ],
    metrics: {
      responseTime: "0.3s",
      satisfaction: 5,
      category: "Returns & Exchanges",
    },
  },
  {
    id: "electronics-troubleshooting",
    title: "Electronics Troubleshooting",
    industry: "Electronics",
    description: "Customer having issues with wireless headphones connectivity",
    messages: [
      {
        id: "1",
        role: "user",
        content:
          "My new wireless headphones won't connect to my iPhone. I've tried turning Bluetooth off and on but it's still not working. Model is SoundPro X1.",
        timestamp: "3:15 PM",
      },
      {
        id: "2",
        role: "assistant",
        content:
          "I can help you troubleshoot your SoundPro X1 headphones! Let's try these steps:\n\n**Step 1:** Reset your headphones by holding the power + volume down buttons for 10 seconds\n**Step 2:** On your iPhone, go to Settings > Bluetooth and 'Forget' any previous SoundPro connections\n**Step 3:** Put headphones in pairing mode (blue flashing light) and reconnect\n\nIf this doesn't work, I can arrange a replacement under your 2-year warranty. Would you like me to start that process?",
        timestamp: "3:15 PM",
        metadata: {
          resolved: true,
          satisfaction: 5,
          category: "Technical Support",
          responseTime: "0.4s",
        },
      },
    ],
    metrics: {
      responseTime: "0.4s",
      satisfaction: 5,
      category: "Technical Support",
    },
  },
  {
    id: "beauty-recommendation",
    title: "Beauty Product Recommendation",
    industry: "Beauty",
    description: "Customer seeking skincare recommendations for sensitive skin",
    messages: [
      {
        id: "1",
        role: "user",
        content:
          "I have very sensitive skin and I'm looking for a gentle moisturizer. I've had reactions to products with fragrances before. What would you recommend?",
        timestamp: "4:22 PM",
      },
      {
        id: "2",
        role: "assistant",
        content:
          "Perfect! For sensitive skin, I recommend our **Gentle Care Hydrating Moisturizer** - it's specifically formulated for sensitive skin and is:\n\n✅ **Fragrance-free** and hypoallergenic\n✅ **Dermatologist tested** for sensitive skin\n✅ Contains **ceramides and hyaluronic acid** for gentle hydration\n✅ **Non-comedogenic** (won't clog pores)\n\nIt has a 4.8/5 rating from customers with sensitive skin. Would you like me to add it to your cart? I can also include some free samples of our gentle cleanser that pairs perfectly with it! 🌿",
        timestamp: "4:22 PM",
        metadata: {
          resolved: true,
          satisfaction: 5,
          category: "Product Recommendations",
          responseTime: "0.2s",
        },
      },
    ],
    metrics: {
      responseTime: "0.2s",
      satisfaction: 5,
      category: "Product Recommendations",
    },
  },
]

export function DemoChatScenarios() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(demoScenarios[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const playScenario = (scenario: Scenario) => {
    setActiveScenario(scenario)
    setCurrentMessageIndex(0)
    setIsPlaying(true)

    // Simulate typing delay for demo effect
    setTimeout(() => {
      setCurrentMessageIndex(1)
      setTimeout(() => {
        setIsPlaying(false)
      }, 1000)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Scenario Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoScenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeScenario.id === scenario.id ? "ring-2 ring-purple-500 bg-purple-50" : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => playScenario(scenario)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {scenario.industry}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">{scenario.metrics.responseTime}</span>
                </div>
              </div>
              <CardTitle className="text-sm font-semibold">{scenario.title}</CardTitle>
              <p className="text-xs text-gray-600">{scenario.description}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Chat Demo */}
      <Card className="bg-white shadow-xl border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <CardTitle className="text-lg">Live Customer Support Demo</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Live
              </Badge>
              <Badge variant="outline">{activeScenario.industry}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6 min-h-[300px]">
            {/* Customer Message */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-sm text-gray-800 leading-relaxed">{activeScenario.messages[0]?.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center">
                  <span>Customer</span>
                  <span className="mx-2">•</span>
                  <span>{activeScenario.messages[0]?.timestamp}</span>
                </div>
              </div>
            </div>

            {/* AI Response */}
            {currentMessageIndex >= 1 && (
              <div className="flex items-start space-x-4 animate-fade-in">
                <div className="flex-shrink-0">
                  <ComerseLogo size="sm" variant="default" showText={false} />
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl rounded-tl-sm p-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                        {activeScenario.messages[1]?.content}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Bot className="h-3 w-3 mr-1" />
                      <span>Comerse AI</span>
                      <span className="mx-2">•</span>
                      <span>Resolved in {activeScenario.metrics.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < activeScenario.metrics.satisfaction ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Resolved</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isPlaying && currentMessageIndex === 0 && (
              <div className="flex items-start space-x-4 animate-fade-in">
                <div className="flex-shrink-0">
                  <ComerseLogo size="sm" variant="default" showText={false} />
                </div>
                <div className="flex-1">
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl rounded-tl-sm p-4">
                    <div className="flex items-center space-x-2 text-purple-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                      <span className="text-sm font-medium">AI is analyzing and crafting response...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Demo Controls */}
          <div className="border-t pt-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>Auto-resolved</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span>Response: {activeScenario.metrics.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>Rating: {activeScenario.metrics.satisfaction}/5</span>
                </div>
              </div>
              <Button
                onClick={() => playScenario(activeScenario)}
                disabled={isPlaying}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isPlaying ? "Playing..." : "Replay Demo"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
