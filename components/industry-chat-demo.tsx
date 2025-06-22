"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Stack,
} from "@mui/material"
import { styled } from "@mui/system"

// Styled Components for better visual presentation
const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}))

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  backgroundColor: isUser ? theme.palette.primary.light : theme.palette.grey[200],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  maxWidth: "70%",
  marginLeft: isUser ? "auto" : "0",
  marginRight: isUser ? "0" : "auto",
  textAlign: isUser ? "right" : "left",
}))

const InputArea = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}))

const IndustryChatDemo = () => {
  const [industry, setIndustry] = useState("healthcare")
  const [userInput, setUserInput] = useState("")
  const [chatHistory, setChatHistory] = useState([])

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value)
    setChatHistory([]) // Clear chat when industry changes
  }

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return

    const userMessage = { text: userInput, sender: "user" }
    setChatHistory((prevHistory) => [...prevHistory, userMessage])
    setUserInput("")

    // Simulate AI response based on the selected industry
    let aiResponseText = ""
    switch (industry) {
      case "healthcare":
        aiResponseText = generateHealthcareResponse(userInput)
        break
      case "finance":
        aiResponseText = generateFinanceResponse(userInput)
        break
      case "education":
        aiResponseText = generateEducationResponse(userInput)
        break
      default:
        aiResponseText = "I'm sorry, I can't provide a relevant response for that industry."
    }

    // Simulate a delay for a more realistic feel
    await new Promise((resolve) => setTimeout(resolve, 750))

    const aiMessage = { text: aiResponseText, sender: "ai" }
    setChatHistory((prevHistory) => [...prevHistory, aiMessage])
  }

  // Example AI response generators (replace with actual API calls)
  const generateHealthcareResponse = (userInput) => {
    if (userInput.toLowerCase().includes("appointment")) {
      return "To schedule an appointment, please call our office at 555-123-4567 or visit our website."
    } else if (userInput.toLowerCase().includes("insurance")) {
      return "We accept most major insurance plans. Please check with your provider to confirm coverage."
    } else {
      return "Thank you for your inquiry. How can I assist you further with your healthcare needs?"
    }
  }

  const generateFinanceResponse = (userInput) => {
    if (userInput.toLowerCase().includes("investment")) {
      return "Investing involves risk, including the potential loss of principal. Please consult with a financial advisor before making any investment decisions."
    } else if (userInput.toLowerCase().includes("loan")) {
      return "We offer a variety of loan products to meet your needs. Please visit our website or contact a loan officer for more information."
    } else {
      return "Thank you for contacting us. What financial questions do you have today?"
    }
  }

  const generateEducationResponse = (userInput) => {
    if (userInput.toLowerCase().includes("enrollment")) {
      return "Enrollment for the upcoming semester is now open. Please visit our admissions office or website for details."
    } else if (userInput.toLowerCase().includes("courses")) {
      return "We offer a wide range of courses in various disciplines. Please check our course catalog for a complete list."
    } else {
      return "Welcome! How can I help you with your educational inquiries?"
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Industry Chat Demo
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="industry-select-label">Select Industry</InputLabel>
        <Select
          labelId="industry-select-label"
          id="industry-select"
          value={industry}
          label="Select Industry"
          onChange={handleIndustryChange}
        >
          <MenuItem value="healthcare">Healthcare</MenuItem>
          <MenuItem value="finance">Finance</MenuItem>
          <MenuItem value="education">Education</MenuItem>
        </Select>
      </FormControl>

      <ChatContainer>
        {chatHistory.map((message, index) => (
          <Stack
            direction="row"
            key={index}
            alignItems="flex-start"
            spacing={2}
            mb={2}
            justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}
          >
            {message.sender === "ai" && <Avatar sx={{ bgcolor: "secondary.main" }}>AI</Avatar>}
            <MessageBubble isUser={message.sender === "user"}>{message.text}</MessageBubble>
            {message.sender === "user" && <Avatar sx={{ bgcolor: "primary.main" }}>You</Avatar>}
          </Stack>
        ))}
      </ChatContainer>

      <InputArea>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSendMessage()
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ ml: 2 }}>
          Send
        </Button>
      </InputArea>
    </Container>
  )
}

export default IndustryChatDemo
