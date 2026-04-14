import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ChefHat, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API client
// Note: In a production app, this should ideally be handled server-side to protect the API key.
// For this prototype, we are using it client-side as requested.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the Head Baker at 'The Irish Bakehouse'. 
Your tone is warm, professional, and full of Irish charm. 
You help customers with bread recipes (especially soda bread), 
pastry tips, and questions about the bakery's heritage. 
Keep responses concise, inviting, and use markdown for formatting if needed.
`;

export default function ExpertAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'baker'; text: string }[]>([
    { role: 'baker', text: "Top of the mornin' to ya! I'm the Master Baker. How can I help you with your baking today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Build the conversation history for context
      const history = messages.map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'Baker'}: ${msg.text}`
      ).join('\n');
      
      const prompt = `${history}\nCustomer: ${userMsg.text}\nBaker:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'baker', text: response.text || "I've misplaced my glasses and can't read the recipe. Ask me again in a moment!" }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setMessages(prev => [...prev, { role: 'baker', text: "Something went wrong in the kitchen! Make sure the GEMINI_API_KEY is set in the environment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-6 z-50 md:bottom-8"
          >
            <Button
              size="icon"
              className="w-14 h-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setIsOpen(true)}
            >
              <ChefHat className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 md:bottom-8 z-50 w-[calc(100vw-2rem)] md:w-[400px] h-[500px] max-h-[80vh] bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg leading-tight">Master Baker</h3>
                  <p className="text-xs text-primary-foreground/80 italic">The Irish Bakehouse</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-white/20 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-sm' 
                        : 'bg-background border border-border shadow-sm rounded-bl-sm text-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border shadow-sm rounded-2xl rounded-bl-sm p-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground italic">The Baker is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-muted border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our sourdough..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  size="icon" 
                  className="rounded-full shrink-0 bg-primary hover:bg-primary/90"
                  onClick={sendMessage}
                  disabled={isTyping || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
