import React, { useState } from 'react';
import { MessageCircle, X, Send, Users, Wrench } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  type?: 'tech' | 'nursery';
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tech' | 'nursery'>('tech');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can we help you today?",
      sender: 'support',
      timestamp: new Date(),
      type: 'tech'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date(),
        type: activeTab
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate response
      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
          text: activeTab === 'tech' 
            ? "Thanks for reaching out! Our tech team will get back to you shortly with a solution."
            : "Hello! Our nursery experts are here to help with your plant care needs. What specific assistance do you need?",
          sender: 'support',
          timestamp: new Date(),
          type: activeTab
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.type === activeTab || msg.sender === 'user'
  );

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <MessageCircle size={24} />
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-slate-200">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Plant.It Support</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-emerald-700 p-1 rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('tech')}
                className={`flex-1 p-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'tech'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Wrench size={16} />
                Tech Team
              </button>
              <button
                onClick={() => setActiveTab('nursery')}
                className={`flex-1 p-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'nursery'
                    ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Users size={16} />
                Nurseries
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : activeTab === 'tech'
                        ? 'bg-blue-100 text-blue-800 rounded-bl-none'
                        : 'bg-emerald-100 text-emerald-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${activeTab === 'tech' ? 'tech team' : 'nursery experts'}...`}
                  className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBox;