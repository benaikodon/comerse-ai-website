import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  TrendingUp,
  Clock,
  Settings,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
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
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/analytics" className="text-blue-600 font-medium">
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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Detailed insights into your AI support performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Queries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">47,392</div>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>18% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Resolution Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">82.4%</div>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>5.2% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">1.3s</div>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>0.4s faster</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Cost Savings</CardTitle>
                  <BarChart3 className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">$12,847</div>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>23% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Query Volume Trend</CardTitle>
                  <CardDescription>Daily query volume over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive chart showing daily query trends</p>
                      <p className="text-sm text-gray-500 mt-2">Peak: 2,847 queries on March 15th</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resolution Rate by Hour</CardTitle>
                  <CardDescription>AI performance throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <p className="text-gray-600">Hourly resolution rate analysis</p>
                      <p className="text-sm text-gray-500 mt-2">Best performance: 9 AM - 11 AM (89% resolution)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Product Information</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">89%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Order Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">94%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shipping Info</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Returns</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "76%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">76%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">English</span>
                      <Badge variant="secondary">68%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Spanish</span>
                      <Badge variant="secondary">18%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">French</span>
                      <Badge variant="secondary">8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">German</span>
                      <Badge variant="secondary">4%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other</span>
                      <Badge variant="secondary">2%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">9:00 AM - 11:00 AM</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Peak</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">2:00 PM - 4:00 PM</span>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">7:00 PM - 9:00 PM</span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">11:00 PM - 6:00 AM</span>
                      <Badge variant="secondary">Low</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Analysis</CardTitle>
                  <CardDescription>Average response times by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Simple Queries</span>
                      <span className="text-sm text-green-600 font-medium">0.8s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Product Information</span>
                      <span className="text-sm text-blue-600 font-medium">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Complex Queries</span>
                      <span className="text-sm text-yellow-600 font-medium">2.1s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Technical Support</span>
                      <span className="text-sm text-red-600 font-medium">3.4s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Escalation Rates</CardTitle>
                  <CardDescription>Queries escalated to human agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Product Info</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">2.1%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Order Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">1.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Returns</span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">8.4%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Technical Issues</span>
                      <Badge className="bg-red-100 text-red-800 border-red-200">15.2%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Query Categories Breakdown</CardTitle>
                  <CardDescription>Distribution of customer queries by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600">Pie chart showing category distribution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Resolution rates by query category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Product Information</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">89%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Order Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">94%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shipping & Returns</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "76%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">76%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Technical Support</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: "62%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">62%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Satisfaction</CardTitle>
                  <CardDescription>Customer satisfaction score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">4.8/5</div>
                    <p className="text-sm text-gray-600">Based on 2,847 ratings</p>
                    <div className="flex items-center justify-center mt-4 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className={`w-6 h-6 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}>
                          ⭐
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Trend</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Trending upward</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback Summary</CardTitle>
                  <CardDescription>Common themes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">Fast responses</Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Accurate answers</Badge>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">Helpful suggestions</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Easy to understand</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
