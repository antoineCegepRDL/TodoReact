export default interface ChatMessage {
  from: string
  message: string
  isUserMessage: boolean
  date: Date
}