import React, { useState } from 'react';
import '../styles/chatMessage.scss'

export default function SendMessage({ onSendMessage }: { onSendMessage: any }) {
  const [message, setMessage] = useState('');
  // Bon, bonne chance pour trouver le type tout seul ici! Par contre, ça permet d'utiliser l'autocomplete!
  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSendClick = () => {
    onSendMessage(message)
    setMessage('')
  }


  return (
    <div className="chat-container">
      <input type="text" value={message} onChange={onMessageChange} className="chat-input" placeholder="Type your message..." />
      <button className="send-button" onClick={handleSendClick}>Send</button>
    </div>
  )
}