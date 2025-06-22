"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mic, Volume2, Zap, Globe, Shield } from "lucide-react"
import Link from "next/link"
import { VoiceChatWidget } from "@/components/voice-chat-widget"

export default function VoiceDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Comerse.ai</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/voice-demo" className="text-blue-600 font-medium">
              Voice Demo
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Start Free Trial</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            <Mic className="h-3 w-3 mr-1" />
            Voice-Enabled AI Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Experience the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Voice Commerce Support
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Talk naturally to our AI assistant. Get instant answers about products, sizing, shipping, and returns using
            just your voice. Perfect for hands-free shopping and accessibility.
          </p>
        </div>

        {/* Voice Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <Mic className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Speech Recognition</CardTitle>
              <CardDescription>
                Advanced speech-to-text technology that understands natural language queries in real-time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-2 hover:border-green-200 transition-colors">
            <CardHeader>
              <Volume2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Text-to-Speech</CardTitle>
              <CardDescription>
                Natural-sounding voice responses with customizable speech rate, pitch, and voice selection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-2 hover:border-purple-200 transition-colors">
            <CardHeader>
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Hands-Free Experience</CardTitle>
              <CardDescription>
                Perfect for multitasking, accessibility needs, or when typing isn't convenient
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Interactive Voice Demo */}
        <div className="mb-12">
          <VoiceChatWidget
            title="Interactive Voice Demo"
            description="Try speaking to our AI assistant - ask about products, sizing, shipping, or returns"
          />
        </div>

        {/* Voice Commerce Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                Voice Commerce Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">US households with smart speakers</span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">75%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Voice commerce growth (2024-2025)</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">+45%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Customers prefer voice for quick queries</span>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">68%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Voice queries resolved instantly</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">92%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                Accessibility & Inclusion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Visual Accessibility</p>
                    <p className="text-sm text-gray-600">
                      Perfect for customers with visual impairments or reading difficulties
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Motor Accessibility</p>
                    <p className="text-sm text-gray-600">
                      Ideal for users with limited mobility or dexterity challenges
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Multitasking Support</p>
                    <p className="text-sm text-gray-600">Shop while cooking, driving, or caring for children</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Natural Interaction</p>
                    <p className="text-sm text-gray-600">More intuitive than typing, especially for complex queries</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Voice Queries */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Try These Voice Commands</CardTitle>
            <CardDescription>Examples of what you can ask our voice-enabled AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Product Information</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>"Do you have winter coats in size medium?"</li>
                  <li>"What colors does this dress come in?"</li>
                  <li>"Tell me about your bestselling jeans"</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Sizing & Fit</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>"What size should I order if I'm usually a medium?"</li>
                  <li>"Does this run large or small?"</li>
                  <li>"What are the measurements for size large?"</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Orders & Shipping</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>"How can I track my order?"</li>
                  <li>"What's your return policy?"</li>
                  <li>"Do you offer free shipping?"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Add Voice Support to Your Store?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the voice commerce revolution and provide your customers with hands-free, accessible shopping
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
