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
import { IndustryChatDemo } from "@/components/industry-chat-demo"
import { ComerseLogo } from "@/components/comerse-logo"

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
                href="#customers"
                className="text-sm text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Customers
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                Sign in
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6">Try for free</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Value Proposition */}
            <div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-6">
                <Star className="w-3 h-3 mr-1" />
                Trusted by 500+ retailers
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Seamless and exceptional customer service
                <span className="block text-purple-600">powered by Comerse AI</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Resolve 80% of customer queries instantly, reduce support costs by 50%, and boost satisfaction scores by
                20% with AI that understands ecommerce.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">0.3s</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">87%</div>
                  <div className="text-sm text-gray-600">Resolution Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">50%</div>
                  <div className="text-sm text-gray-600">Cost Reduction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8 py-4">
                  Start free trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 rounded-lg px-8 py-4"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Setup in 5 minutes
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 ml-4">Customer Support Dashboard</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {/* Customer Message */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-sm text-gray-800">
                            Hi! I need to return my order #12345. The size doesn't fit.
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Sarah Johnson • 2:34 PM</div>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex items-start space-x-3">
                      <ComerseLogo size="sm" variant="default" showText={false} />
                      <div className="flex-1">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <p className="text-sm text-gray-800">
                            I'd be happy to help you with that return! I can see your order for the blue dress. I'll
                            process the return and email you a prepaid shipping label. You'll receive your refund within
                            3-5 business days.
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Brain className="h-3 w-3 mr-1" />
                          Comerse AI • Resolved in 0.3s
                        </div>
                      </div>
                    </div>

                    {/* Success Indicator */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Issue resolved automatically</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">4.9/5</div>
                  <div className="text-xs text-gray-600">Customer Rating</div>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
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

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow text-center group hover:border-purple-200">
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

          <IndustryChatDemo />

          <div className="text-center mt-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8 py-4">
              Try with your own data <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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
            <p className="text-xl text-gray-600">Choose the plan that fits your business size and growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Basic</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$500</div>
                <div className="text-gray-600">per month</div>
                <p className="text-sm text-gray-500 mt-4">Perfect for small retailers</p>
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
                  Start free trial
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
                <p className="text-sm text-gray-500 mt-4">Ideal for mid-sized retailers</p>
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
                  Start free trial
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">$5,000</div>
                <div className="text-gray-600">per month</div>
                <p className="text-sm text-gray-500 mt-4">For large retailers</p>
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
                  Contact sales
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Pay-as-you-go Option */}
          <div className="text-center">
            <Card className="bg-white border border-gray-200 max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Pay-as-you-go</CardTitle>
                <div className="text-3xl font-bold text-gray-900 mb-2">$0.10 - $0.50</div>
                <div className="text-gray-600">per resolved query</div>
                <p className="text-sm text-gray-500 mt-4">Perfect for businesses with variable support volume</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>No monthly commitment</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Pay only for successful resolutions</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>All features included</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Get started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your customer support?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 500+ ecommerce retailers delivering exceptional customer service with Comerse AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8 py-4 text-lg">
              Start free trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 rounded-lg px-8 py-4 text-lg"
            >
              Schedule demo
            </Button>
          </div>
          <p className="text-gray-400 text-sm">No credit card required • Setup in 5 minutes • Cancel anytime</p>
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
                  <Link href="#" className="hover:text-purple-400 transition-colors">
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
