"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, MessageSquare, CheckCircle } from "lucide-react"

interface Metric {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  color: string
}

export function DemoMetrics() {
  const [currentMetrics, setCurrentMetrics] = useState<Metric[]>([
    {
      label: "Queries Resolved",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: <MessageSquare className="h-4 w-4" />,
      color: "text-blue-600",
    },
    {
      label: "Avg Response Time",
      value: "0.3s",
      change: "-0.2s",
      trend: "up",
      icon: <Clock className="h-4 w-4" />,
      color: "text-green-600",
    },
    {
      label: "Resolution Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-purple-600",
    },
    {
      label: "Customer Satisfaction",
      value: "4.9/5",
      change: "+0.2",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-yellow-600",
    },
  ])

  // Simulate live updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics((prev) =>
        prev.map((metric) => {
          const randomChange = Math.random() > 0.7
          if (!randomChange) return metric

          switch (metric.label) {
            case "Queries Resolved":
              const newQueries = Number.parseInt(metric.value.replace(",", "")) + Math.floor(Math.random() * 10)
              return { ...metric, value: newQueries.toLocaleString() }
            case "Avg Response Time":
              const times = ["0.2s", "0.3s", "0.4s", "0.1s"]
              return { ...metric, value: times[Math.floor(Math.random() * times.length)] }
            default:
              return metric
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {currentMetrics.map((metric, index) => (
        <Card
          key={metric.label}
          className="bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 transition-all duration-300"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`${metric.color} bg-opacity-10 p-2 rounded-lg`}>{metric.icon}</div>
              <Badge
                variant="secondary"
                className={`${metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs`}
              >
                {metric.change}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
