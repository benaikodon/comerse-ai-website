"use client"

import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, Settings } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"

interface VoiceChatWidgetProps {
  title?: string
  description?: string
  className?: string
}

export function VoiceChatWidget({
  title = "Comerse.ai Voice Assistant",
  description = "Talk to your AI assistant using voice commands",
  className = "",
}: VoiceChatWidgetProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [voiceInput, setVoiceInput] = useState(true)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your voice-enabled Comerse.ai Assistant. You can speak to me or type your questions. I'm here to help with products, sizing, shipping, returns, and more. How can I assist you today?",
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
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition()

  const {
    isSupported: ttsSupported,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    volume,
    setVolume,
    speak,
    stop: stopSpeaking,
    pause,
    resume,
  } = useTextToSpeech()

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

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stopSpeaking()
    } else if (messages.length > 0) {
      const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant")
      if (lastAssistantMessage) {
        speak(lastAssistantMessage.content)
      }
    }
  }

  const isVoiceSupported = speechSupported && ttsSupported

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
              {title}
              {isVoiceSupported && (
                <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">Voice Enabled</Badge>
              )}
            </CardTitle>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="bg-white text-gray-700 border-gray-300"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {!isVoiceSupported && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              Voice features are not supported in your browser. Please use Chrome, Edge, or Safari for the best
              experience.
            </p>
          </div>
        )}

        {showSettings && isVoiceSupported && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-speak">Auto-speak responses</Label>
                <Switch id="auto-speak" checked={autoSpeak} onCheckedChange={setAutoSpeak} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-input">Voice input</Label>
                <Switch id="voice-input" checked={voiceInput} onCheckedChange={setVoiceInput} />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label>Voice Selection</Label>
                <Select
                  value={selectedVoice?.name || ""}
                  onValueChange={(value) => {
                    const voice = voices.find((v) => v.name === value)
                    if (voice) setSelectedVoice(voice)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices
                      .filter((voice) => voice.lang.startsWith("en"))
                      .map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Speech Rate: {rate.toFixed(1)}x</Label>
                  <Slider
                    value={[rate]}
                    onValueChange={([value]) => setRate(value)}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Volume: {Math.round(volume * 100)}%</Label>
                  <Slider
                    value={[volume]}
                    onValueChange={([value]) => setVolume(value)}
                    min={0}
                    max={1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="bg-gray-50 rounded-lg p-4 h-96 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-white shadow-sm border"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && <Bot className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                      {message.role === "user" && <User className="h-4 w-4 text-blue-100 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs ${message.role === "user" ? "text-blue-200" : "text-gray-500"}`}>
                            {message.role === "user" ? "You" : "AI Assistant"} •{" "}
                            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {message.role === "assistant" && isVoiceSupported && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speak(message.content)}
                              className="h-6 w-6 p-0"
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm border rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="border-t pt-4 mt-4">
            <div className="flex items-center space-x-2">
              <Input
                value={input + (isListening ? interimTranscript : "")}
                onChange={handleInputChange}
                placeholder={
                  isListening
                    ? "Listening..."
                    : isVoiceSupported && voiceInput
                      ? "Type or speak your message..."
                      : "Type your message..."
                }
                className="flex-1"
                disabled={isLoading}
              />

              {isVoiceSupported && voiceInput && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceToggle}
                  disabled={isLoading}
                  className={`${
                    isListening
                      ? "bg-red-100 border-red-300 text-red-600 hover:bg-red-200"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              )}

              {isVoiceSupported && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSpeakToggle}
                  disabled={isLoading}
                  className="bg-white text-gray-700 border-gray-300"
                >
                  {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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
              <div className="flex items-center justify-center mt-3 p-2 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-600 font-medium">Listening...</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}

            {speechError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">Speech recognition error: {speechError}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 text-xs"
                onClick={() => setInput("Do you have winter coats in size medium?")}
              >
                Winter coats in medium?
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 text-xs"
                onClick={() => setInput("What's your return policy?")}
              >
                Return policy?
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 text-xs"
                onClick={() => setInput("How do I track my order?")}
              >
                Track my order?
              </Badge>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
