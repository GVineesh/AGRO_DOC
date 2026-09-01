
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Trash2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { getChatResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm AgroAssist. How can I help you with your farm today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await getChatResponse([], input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response || "I'm sorry, I couldn't process that. Can you try rephrasing?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AgroAssist Chat</h1>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Expert Farming Support</p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-white/40 hover:text-red-400 transition-colors"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden bg-white/5">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                flex max-w-[85%] items-start gap-3 
                ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}
              `}>
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1
                  ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-emerald-500'}
                `}>
                  {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={`
                  p-4 rounded-2xl text-sm leading-relaxed shadow-lg
                  ${msg.sender === 'user' 
                    ? 'bg-blue-600/20 text-blue-50 border border-blue-500/20 rounded-tr-none' 
                    : 'bg-white/10 text-emerald-50 border border-white/10 rounded-tl-none'}
                `}>
                  {msg.text}
                  <div className={`text-[10px] mt-2 opacity-30 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center animate-pulse">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/10">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about farming, seeds, pests..."
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-4 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`
                absolute right-2 p-3 rounded-lg transition-all
                ${input.trim() && !loading 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
                  : 'bg-white/5 text-white/20'}
              `}
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-white/20 mt-3 text-center flex items-center justify-center gap-1">
            <Sparkles size={10} /> AI can make mistakes. Check important information with your local agricultural center.
          </p>
        </form>
      </GlassCard>
    </div>
  );
};

export default Chat;
