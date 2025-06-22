import { Brain, Sparkles } from "lucide-react"

interface ComerseLogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white" | "dark"
  showText?: boolean
}

export function ComerseLogo({ size = "md", variant = "default", showText = true }: ComerseLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  }

  const sparklesSizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  }

  const logoColors = {
    default: "bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700",
    white: "bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600",
    dark: "bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800",
  }

  const textColors = {
    default: "text-gray-900",
    white: "text-white",
    dark: "text-gray-800",
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${logoColors[variant]} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Brain className={`${iconSizeClasses[size]} text-white`} />
        </div>
        {/* AI Sparkle Indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center shadow-sm">
          <Sparkles className={`${sparklesSizeClasses[size]} text-white`} />
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold ${textColors[variant]} tracking-tight`}>Comerse AI</span>
          {size === "lg" && <span className="text-xs text-gray-500 -mt-1 tracking-wide">Customer Intelligence</span>}
        </div>
      )}
    </div>
  )
}
