import * as Sentry from "@sentry/nextjs"
import { env } from "./env"

export function initMonitoring() {
  if (env.SENTRY_DSN) {
    Sentry.init({
      dsn: env.SENTRY_DSN,
      environment: env.NODE_ENV,
      tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1.0,
      beforeSend(event) {
        // Filter out sensitive data
        if (event.request?.headers) {
          delete event.request.headers.authorization
          delete event.request.headers.cookie
        }
        return event
      },
    })
  }
}

export function captureError(error: Error, context?: Record<string, any>) {
  console.error("Error:", error, context)

  if (env.SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    })
  }
}

export function captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
  console.log(`[${level.toUpperCase()}] ${message}`)

  if (env.SENTRY_DSN) {
    Sentry.captureMessage(message, level)
  }
}

// Performance monitoring
export function startTransaction(name: string) {
  if (env.SENTRY_DSN) {
    return Sentry.startTransaction({ name })
  }
  return null
}

// Custom metrics
export function recordMetric(name: string, value: number, tags?: Record<string, string>) {
  console.log(`Metric: ${name} = ${value}`, tags)

  if (env.SENTRY_DSN) {
    Sentry.addBreadcrumb({
      message: `Metric: ${name}`,
      level: "info",
      data: { value, ...tags },
    })
  }
}
