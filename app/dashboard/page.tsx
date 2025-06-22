import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  TrendingUp,
  Clock,
  Globe,
  Settings,
  BarChart3,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import Link from "next/link"
import { VoiceChatWidget } from "@/components/voice-chat-widget"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Comerse.ai</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/analytics" className="text-gray-600 hover:text-blue-600 transition-colors">
              Analytics
            </Link>
            <Link href="/dashboard/integrations" className="text-gray-600 hover:text-blue-600 transition-colors">
              Integrations
            </Link>
            <Link href="/dashboard/settings" className="text-gray-600 hover:text-blue-600 transition-colors">
              Settings
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800 border-green-200">Pro Plan</Badge>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Here's how your Comerse.ai support is performing today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Queries Resolved</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>12% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Resolution Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">84%</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>3% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1.2s</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>0.3s faster</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Customer Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>0.2 points higher</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Chat Demo */}
            <VoiceChatWidget />

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest customer interactions and AI performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Query resolved: Product sizing question</p>
                      <p className="text-xs text-gray-600">Fashion category • 2 minutes ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New conversation started</p>
                      <p className="text-xs text-gray-600">Electronics category • 5 minutes ago</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Escalated to human agent</p>
                      <p className="text-xs text-gray-600">Complex return request • 12 minutes ago</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Escalated</Badge>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Query resolved: Shipping information</p>
                      <p className="text-xs text-gray-600">Home goods category • 18 minutes ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Query Resolution</span>
                    <span>84%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Customer Satisfaction</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Usage</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">34,000 / 50,000 queries used</p>
                </div>
              </CardContent>
            </Card>

            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Query Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Product Information</span>
                    <Badge variant="secondary">42%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Shipping & Returns</span>
                    <Badge variant="secondary">28%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Order Status</span>
                    <Badge variant="secondary">18%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Support</span>
                    <Badge variant="secondary">12%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure AI Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white text-gray-700 border-gray-300">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white text-gray-700 border-gray-300">
                  <Globe className="h-4 w-4 mr-2" />
                  Manage Integrations
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">Upgrade to Enterprise</CardTitle>
                <CardDescription className="text-purple-600">
                  Unlock unlimited queries and advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-purple-700 mb-4">
                  <li>• Unlimited monthly queries</li>
                  <li>• Voice support module</li>
                  <li>• Custom model training</li>
                  <li>• 24/7 dedicated support</li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Upgrade Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
