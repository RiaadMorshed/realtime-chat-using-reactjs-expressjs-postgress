import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { formatDistanceToNow } from "../../lib/utils"

interface Message {
  id: string
  content: string
  sender: string
  senderId: string
  timestamp: string
  isCurrentUser: boolean
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { content, sender, timestamp, isCurrentUser } = message

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} max-w-[80%]`}>
        {!isCurrentUser && (
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={sender} />
            <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <div
            className={`rounded-lg px-4 py-2 ${
              isCurrentUser ? "bg-blue-500 text-white mr-2" : "bg-white text-gray-800 ml-2"
            } shadow-sm`}
          >
            {content}
          </div>
          <div className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? "text-right mr-2" : "ml-2"}`}>
            {formatDistanceToNow(new Date(timestamp))}
          </div>
        </div>
      </div>
    </div>
  )
}
