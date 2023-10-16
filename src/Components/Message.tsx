import '../styles/chatMessage.scss'
import ChatMessage from '../types/ChatMessage'

export default function Message({chatMessage}: {chatMessage: ChatMessage}) {
  const messageClasses = `message-container ${chatMessage.isUserMessage ? 'user-message' : ''}`
  return (
    <div className={messageClasses}>
      <p className='message-date'>{chatMessage.date.toLocaleString()}</p>
      <p className='message'>{chatMessage.from} : {chatMessage.message}</p>
    </div>
  )
}