import type { Route } from "../pages/+types/chat";

import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { LogOut, Send } from "lucide-react";
import ChatMessage from "../components/chat/chat-message";
import { useMobile } from "../hooks/use-mobile";
import { useNavigate } from "react-router";

// Mock data for initial messages
const initialMessages = [
  {
    id: "1",
    content: "Hey there! How are you?",
    sender: "John Doe",
    senderId: "user1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isCurrentUser: false,
  },
  {
    id: "2",
    content: "I'm good, thanks! How about you?",
    sender: "You",
    senderId: "currentUser",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    isCurrentUser: true,
  },
  {
    id: "3",
    content: "Doing well! Just working on this new project.",
    sender: "John Doe",
    senderId: "user1",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    isCurrentUser: false,
  },
]

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chat" },
    { name: "Technology", content: "" },
  ];
}

export default function Chat() {
    const [messages, setMessages] = useState(initialMessages)
    const [newMessage, setNewMessage] = useState("")
    const [users, setUsers] = useState([
      { id: "user1", name: "John Doe", status: "online" },
      { id: "user2", name: "Jane Smith", status: "offline" },
      { id: "user3", name: "Mike Johnson", status: "online" },
    ])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const isMobile = useMobile()
    const [showUserList, setShowUserList] = useState(!isMobile)
  
    useEffect(() => {
      scrollToBottom()
    }, [messages])
  
    useEffect(() => {
      setShowUserList(!isMobile)
    }, [isMobile])
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault()
      if (!newMessage.trim()) return
  
      const newMsg = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "You",
        senderId: "currentUser",
        timestamp: new Date().toISOString(),
        isCurrentUser: true,
      }
  
      setMessages([...messages, newMsg])
      setNewMessage("")
  
      // Here you would send the message to your Express.js backend
      // Example: fetch('/api/messages', { method: 'POST', body: JSON.stringify({ content: newMessage }) });
    }
  
    const handleLogout = () => {
      // Here you would call your Express.js logout endpoint
      // Example: fetch('/api/logout', { method: 'POST' });
  
      navigate("/login")
    }
  
    return (
      <div className="flex h-screen bg-gray-50">
        {/* User list sidebar - hidden on mobile by default */}
        {showUserList && (
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Contacts</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full mr-1 ${
                          user.status === "online" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      {user.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              {isMobile && (
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setShowUserList(!showUserList)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </Button>
              )}
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                  Online
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
  
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
  
          {/* Message input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Input
                className="flex-1"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
}