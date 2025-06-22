"use client"

import { useState, useEffect, useCallback } from "react"

interface Voice {
  name: string
  lang: string
  localService: boolean
  default: boolean
}

export function useTextToSpeech() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<Voice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true)

      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices().map((voice) => ({
          name: voice.name,
          lang: voice.lang,
          localService: voice.localService,
          default: voice.default,
        }))
        setVoices(availableVoices)

        // Set default voice (prefer English voices)
        const englishVoice =
          availableVoices.find((voice) => voice.lang.startsWith("en") && voice.name.toLowerCase().includes("female")) ||
          availableVoices.find((voice) => voice.lang.startsWith("en"))

        if (englishVoice) {
          setSelectedVoice(englishVoice)
        }
      }

      loadVoices()
      speechSynthesis.addEventListener("voiceschanged", loadVoices)

      return () => {
        speechSynthesis.removeEventListener("voiceschanged", loadVoices)
      }
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return

      // Cancel any ongoing speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)

      if (selectedVoice) {
        const voice = speechSynthesis.getVoices().find((v) => v.name === selectedVoice.name)
        if (voice) {
          utterance.voice = voice
        }
      }

      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      speechSynthesis.speak(utterance)
    },
    [isSupported, selectedVoice, rate, pitch, volume],
  )

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [isSupported])

  const pause = useCallback(() => {
    if (isSupported) {
      speechSynthesis.pause()
    }
  }, [isSupported])

  const resume = useCallback(() => {
    if (isSupported) {
      speechSynthesis.resume()
    }
  }, [isSupported])

  return {
    isSupported,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    speak,
    stop,
    pause,
    resume,
  }
}
