"use client"

import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Bot, Loader2, X, Minimize2, Mic, MicOff, Volume2 } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"

export function VoiceChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(true)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your voice-enabled Comerse Assistant. You can speak to me or type your questions. How can I help you today?",
      },
    ],
    onFinish: (message) => {
      if (autoSpeak && message.role === "assistant") {
        speak(message.content)
      }
    },
  })

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported: speechSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition()

  const { isSupported: ttsSupported, isSpeaking, speak, stop: stopSpeaking } = useTextToSpeech()

  const isVoiceSupported = speechSupported && ttsSupported

  // Update input when speech recognition provides transcript
  useEffect(() => {
    if (transcript && !isListening) {
      setInput(transcript)
      resetTranscript()
    }
  }, [transcript, isListening, setInput, resetTranscript])

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 relative"
        >
          <MessageSquare className="h-6 w-6" />
          {isVoiceSupported && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
              <Mic className="h-2 w-2 text-white absolute top-0.5 left-0.5" />
            </div>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-2xl transition-all duration-200 ${isMinimized ? "h-14" : "h-96"}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-medium">Comerse Assistant</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            {isVoiceSupported && <Badge className="bg-green-500 text-white text-xs px-1 py-0">Voice</Badge>}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-blue-700"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <CardContent className="p-0 h-80 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.role === "assistant" && isVoiceSupported && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speak(message.content)}
                          className="h-6 w-6 p-0 mt-1 hover:bg-gray-200"
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        <span className="text-sm text-gray-500">Typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  value={input + (isListening ? interimTranscript : "")}
                  onChange={handleInputChange}
                  placeholder={isListening ? "Listening..." : "Type or speak..."}
                  className="flex-1 text-sm"
                  disabled={isLoading}
                />

                {isVoiceSupported && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleVoiceToggle}
                    disabled={isLoading}
                    className={`${
                      isListening ? "bg-red-100 border-red-300 text-red-600" : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}

                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading || (!input.trim() && !transcript.trim())}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>

              {isListening && (
                <div className="flex items-center justify-center mt-2 p-1 bg-red-50 rounded">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-red-600">Listening</span>
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
