"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Code, Copy, CheckCircle, Globe, Settings, Zap, Database, Link, Palette, MessageSquare } from "lucide-react"

export default function IntegrationPage() {
  const [copied, setCopied] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("shopify")
  const [widgetSettings, setWidgetSettings] = useState({
    position: "bottom-right",
    primaryColor: "#3B82F6",
    greeting: "Hi! How can I help you today?",
    showOnPages: "all",
    autoOpen: false,
    voiceEnabled: true,
  })

  const integrationCode = `<!-- Comerse.ai Chat Widget -->
<script>
  window.ComerseConfig = {
    apiKey: "your-api-key-here",
    storeId: "your-store-id",
    position: "${widgetSettings.position}",
    primaryColor: "${widgetSettings.primaryColor}",
    greeting: "${widgetSettings.greeting}",
    voiceEnabled: ${widgetSettings.voiceEnabled},
    autoOpen: ${widgetSettings.autoOpen}
  };
</script>
<script src="https://cdn.comerse.ai/widget.js" async></script>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(integrationCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integration Setup</h1>
        <p className="text-gray-600 mt-2">Get your Comerse.ai assistant up and running on your website in minutes</p>
      </div>

      <Tabs defaultValue="quick-setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quick-setup">Quick Setup</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 text-blue-600 mr-2" />
                Quick Integration
              </CardTitle>
              <p className="text-sm text-gray-600">
                Copy and paste this code before the closing &lt;/body&gt; tag on your website
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  <code>{integrationCode}</code>
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  onClick={copyToClipboard}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">Step 1</h3>
                    <p className="text-sm text-green-700">Copy the code above</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800">Step 2</h3>
                    <p className="text-sm text-blue-700">Paste before &lt;/body&gt;</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-purple-800">Step 3</h3>
                    <p className="text-sm text-purple-700">Go live instantly!</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Shopify", icon: "🛍️", difficulty: "Easy", time: "2 min" },
              { name: "WooCommerce", icon: "🔧", difficulty: "Easy", time: "3 min" },
              { name: "Magento", icon: "🏪", difficulty: "Medium", time: "5 min" },
              { name: "BigCommerce", icon: "🏬", difficulty: "Easy", time: "2 min" },
              { name: "Squarespace", icon: "⬜", difficulty: "Easy", time: "3 min" },
              { name: "Custom HTML", icon: "💻", difficulty: "Easy", time: "1 min" },
            ].map((platform) => (
              <Card key={platform.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{platform.icon}</div>
                  <h3 className="font-semibold mb-2">{platform.name}</h3>
                  <div className="space-y-2">
                    <Badge variant={platform.difficulty === "Easy" ? "default" : "secondary"}>
                      {platform.difficulty}
                    </Badge>
                    <p className="text-sm text-gray-600">{platform.time} setup</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 text-blue-600 mr-2" />
                  Widget Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Position</Label>
                  <Select
                    value={widgetSettings.position}
                    onValueChange={(value) => setWidgetSettings((prev) => ({ ...prev, position: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={widgetSettings.primaryColor}
                      onChange={(e) => setWidgetSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={widgetSettings.primaryColor}
                      onChange={(e) => setWidgetSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Greeting Message</Label>
                  <Textarea
                    value={widgetSettings.greeting}
                    onChange={(e) => setWidgetSettings((prev) => ({ ...prev, greeting: e.target.value }))}
                    placeholder="Enter your greeting message..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 text-blue-600 mr-2" />
                  Widget Behavior
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Auto-open on page load</Label>
                  <Switch
                    checked={widgetSettings.autoOpen}
                    onCheckedChange={(checked) => setWidgetSettings((prev) => ({ ...prev, autoOpen: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Voice features enabled</Label>
                  <Switch
                    checked={widgetSettings.voiceEnabled}
                    onCheckedChange={(checked) => setWidgetSettings((prev) => ({ ...prev, voiceEnabled: checked }))}
                  />
                </div>

                <div>
                  <Label>Show on pages</Label>
                  <Select
                    value={widgetSettings.showOnPages}
                    onValueChange={(value) => setWidgetSettings((prev) => ({ ...prev, showOnPages: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All pages</SelectItem>
                      <SelectItem value="product">Product pages only</SelectItem>
                      <SelectItem value="checkout">Checkout pages only</SelectItem>
                      <SelectItem value="custom">Custom pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <p className="text-sm text-gray-600">See how your widget will look</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 relative min-h-[200px]">
                <div
                  className={`absolute ${widgetSettings.position.includes("bottom") ? "bottom-4" : "top-4"} ${
                    widgetSettings.position.includes("right") ? "right-4" : "left-4"
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
                    style={{ backgroundColor: widgetSettings.primaryColor }}
                  >
                    <MessageSquare className="h-8 w-8" />
                  </div>
                </div>
                <p className="text-center text-gray-500 mt-8">Your website content here...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 text-blue-600 mr-2" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>API Key</Label>
                  <div className="flex items-center space-x-2">
                    <Input value="ck_live_..." readOnly className="flex-1" />
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://your-site.com/webhook" />
                </div>

                <div>
                  <Label>Custom Domain</Label>
                  <Input placeholder="chat.your-domain.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="h-5 w-5 text-blue-600 mr-2" />
                  Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Custom CSS</Label>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <Label>GDPR Compliance</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Analytics Tracking</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Multi-language</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
