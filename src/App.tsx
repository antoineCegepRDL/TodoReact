import { useEffect, useState } from "react"
import Message from "./Components/Message"
import SendMessage from "./Components/SendMessage"
import ChatMessage from "./types/ChatMessage"

const user = "Antoine the super hacker 2000"

export default function App() {
  const [chatMessages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Fetch messages here and then update the state with setMessages
    const getMessage = async () => {
      const fetchedChatMessage: ChatMessage = await (await fetch('https://chat-server-cegeprdl-609ad4537875.herokuapp.com//message')).json()
      setMessages((currentChatMessages: ChatMessage[]) => {
        if (currentChatMessages[currentChatMessages.length - 1]?.message !== fetchedChatMessage.message) {
          return [...currentChatMessages, fetchedChatMessage]
        }
        return currentChatMessages
      })
    }
    setInterval(getMessage, 1000);
  }, []);

  const onSendMessage = async (message: string) => {
    const response = await fetch('https://chat-server-cegeprdl-609ad4537875.herokuapp.com//message', {
      body: JSON.stringify({ message, from: user }),
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    if (response.ok) {
      const chatMessage: ChatMessage = { date: new Date(), from: user, isUserMessage: true, message }
      setMessages((currentChatMessages: ChatMessage[]) => {
        return [...currentChatMessages, chatMessage]
      })
    }
  }

  return (
    <div>
      <h1>Les messages</h1>
      <div className="chat-container">
        {JSON.stringify(chatMessages)}
        {chatMessages.map((message, index) => (
          <Message chatMessage={message} key={index}/>
        ))}
        <SendMessage onSendMessage={onSendMessage}></SendMessage>
      </div>
    </div>
  )
}

