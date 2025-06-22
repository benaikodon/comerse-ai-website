import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Globe,
  Mic,
  Shield,
  Zap,
  CheckCircle,
  User,
  Brain,
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  Play,
} from "lucide-react"
import Link from "next/link"
import { VoiceChatBubble } from "@/components/voice-chat-bubble"
import { ComerseLogo } from "@/components/comerse-logo"
import { DemoChatScenarios } from "@/components/demo-chat-scenarios"
import { DemoMetrics } from "@/components/demo-metrics"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <ComerseLogo size="md" variant="default" showText={true} />

            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-purple-600">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">AI Agents</span>
              </div>
              <Link
                href="#solutions"
                className="text-sm text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Solutions
              </Link>
              <Link href="#demo" className="text-sm text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Demo
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="text-sm text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Enhanced Value Proposition */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2 text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 500+ retailers worldwide
                </Badge>

                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                  Transform customer service with
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    AI that understands
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Resolve 87% of customer queries instantly. Reduce support costs by 60%. Boost satisfaction scores by
                  35% with AI trained specifically for ecommerce.
                </p>
              </div>

              {/* Enhanced Key Benefits */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-purple-600 mb-2">0.2s</div>
                  <div className="text-sm text-gray-600 font-medium">Avg Response</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                  <div className="text-sm text-gray-600 font-medium">Auto-Resolved</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-purple-600 mb-2">60%</div>
                  <div className="text-sm text-gray-600 font-medium">Cost Savings</div>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-xl px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Free 14-day trial</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">5-minute setup</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">No credit card</span>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Interactive Demo */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium ml-4">Live Customer Support</span>
                    <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Online
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4 h-96 overflow-y-auto">
                  {/* Enhanced Customer Message */}
                  <div className="flex items-start space-x-3 animate-fade-in">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4">
                        <p className="text-sm text-gray-800">
                          Hi! I ordered a winter coat last week but it's too small. Can I exchange it for a larger size?
                          My order number is #WC-2024-1234.
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 flex items-center">
                        <span>Sarah Chen</span>
                        <span className="mx-2">•</span>
                        <span>Just now</span>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">VIP Customer</Badge>
                      </div>
                    </div>
                  </div>

                  {/* AI Typing Indicator */}
                  <div className="flex items-start space-x-3 animate-fade-in animation-delay-1000">
                    <ComerseLogo size="sm" variant="default" showText={false} />
                    <div className="flex-1">
                      <div className="bg-purple-50 border border-purple-200 rounded-2xl rounded-tl-sm p-4">
                        <div className="flex items-center space-x-2 text-purple-600">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                          </div>
                          <span className="text-sm font-medium">AI is analyzing your order...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced AI Response */}
                  <div className="flex items-start space-x-3 animate-fade-in animation-delay-2000">
                    <ComerseLogo size="sm" variant="default" showText={false} />
                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl rounded-tl-sm p-4">
                        <p className="text-sm text-gray-800 leading-relaxed">
                          Hi Sarah! 👋 I found your order #WC-2024-1234 for the Arctic Winter Coat in Medium. I can
                          absolutely help you exchange it for a Large!
                          <br />
                          <br />
                          I've initiated the exchange process and sent you a prepaid return label via email. Once we
                          receive your return, we'll ship the Large size immediately.
                          <br />
                          <br />
                          <strong>Expected timeline:</strong> New coat arrives in 3-5 business days! 🚚
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Brain className="h-3 w-3 mr-1" />
                          <span>Comerse AI</span>
                          <span className="mx-2">•</span>
                          <span>Resolved in 0.3s</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">Auto-Resolved</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Success Indicator */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 animate-fade-in animation-delay-3000">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="text-sm font-semibold text-green-800">Exchange processed successfully!</span>
                        <p className="text-xs text-green-600 mt-1">
                          Customer satisfaction: 5/5 ⭐ • Return label sent • Large size reserved
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Stats */}
              <div className="absolute -right-6 top-1/3 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
                  <div className="text-xs text-gray-600 mb-2">Customer Rating</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">2,847 reviews</div>
                </div>
              </div>

              <div className="absolute -left-6 bottom-1/4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">87% Auto-Resolved</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add this after the hero content */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live Demo Available</span>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-white mb-8">Trusted by leading ecommerce brands</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            {["Shopify", "WooCommerce", "Magento", "BigCommerce"].map((brand) => (
              <div key={brand} className="text-xl font-semibold text-white">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why retailers choose Comerse AI</h2>
            <p className="text-xl text-gray-600">Built specifically for ecommerce customer support challenges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow text-center group hover:border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Instant Resolution</CardTitle>
                <p className="text-gray-600 mt-2">
                  Resolve 80% of queries in under 0.5 seconds. No more waiting for human agents or long response times.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow text-center group hover:border-gray-200">
              <CardHeader>
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <DollarSign className="h-8 w-8 text-gray-800" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Cost Savings</CardTitle>
                <p className="text-gray-600 mt-2">
                  Reduce support costs by 50% while handling 10x more queries with the same team size.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow text-center group hover:border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Happy Customers</CardTitle>
                <p className="text-gray-600 mt-2">
                  Boost customer satisfaction by 20% with 24/7 support that never sleeps or gets frustrated.
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See it in action</h2>
            <p className="text-xl text-gray-600">Try our AI with real ecommerce scenarios. No signup required.</p>
          </div>

          <div className="space-y-8">
            <DemoMetrics />
            <DemoChatScenarios />
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8 py-4">
                Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete ecommerce support solution</h2>
            <p className="text-xl text-gray-600">Everything you need to deliver exceptional customer service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Smart Conversations</CardTitle>
                <p className="text-gray-600 mt-2">
                  Handle orders, returns, shipping, product questions, and complex troubleshooting with human-like
                  understanding.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-gray-800" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Global Support</CardTitle>
                <p className="text-gray-600 mt-2">
                  Support customers in 25+ languages with cultural awareness and local market knowledge.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Quick Setup</CardTitle>
                <p className="text-gray-600 mt-2">
                  Connect with Shopify, WooCommerce, Magento, and 50+ platforms. Live in under 5 minutes.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-gray-800" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Enterprise Security</CardTitle>
                <p className="text-gray-600 mt-2">
                  SOC 2 compliant with GDPR/CCPA compliance and end-to-end encryption for all customer data.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Voice & Chat</CardTitle>
                <p className="text-gray-600 mt-2">
                  Support across web chat, mobile apps, social media, and voice assistants with consistent experience.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-gray-800" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Advanced Analytics</CardTitle>
                <p className="text-gray-600 mt-2">
                  Track resolution rates, customer satisfaction, cost savings, and identify improvement opportunities.
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">Start with a free trial, upgrade when you're ready</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Basic</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$500</div>
                <div className="text-gray-600">per month</div>
                <p className="text-sm text-gray-500 mt-4">Perfect for small businesses</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>10,000 queries/month</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Basic integrations</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-2 border-purple-500 relative hover:shadow-lg transition-shadow scale-105">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Pro</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$2,000</div>
                <div className="text-gray-600">per month</div>
                <p className="text-sm text-gray-500 mt-4">Ideal for growing businesses</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>50,000 queries/month</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>All integrations</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Multilingual support</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$5,000</div>
                <div className="text-gray-600">per month</div>
                <p className="text-sm text-gray-500 mt-4">For large organizations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Unlimited queries</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Voice support module</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Custom model training</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Trial Information */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Start with a Free Trial</CardTitle>
                <div className="text-3xl font-bold text-purple-600 mb-2">14 Days Free</div>
                <div className="text-gray-600">1,000 queries included</div>
                <p className="text-sm text-gray-500 mt-4">Experience the full platform with no limitations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Full access to all features</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>No credit card required</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Setup assistance included</span>
                  </li>
                </ul>
                <Link href="/auth/register">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg py-3">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to transform your customer support?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of retailers delivering exceptional customer service with Comerse AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8 py-4 text-lg">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-8 py-4 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-gray-500 text-sm">No credit card required • 14-day free trial • Setup in 5 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <ComerseLogo size="md" variant="white" showText={true} />
              <p className="text-gray-400 mt-4">Exceptional customer service powered by AI.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#solutions" className="hover:text-purple-400 transition-colors">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-purple-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-purple-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-purple-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Comerse AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <VoiceChatBubble />
    </div>
  )
}
