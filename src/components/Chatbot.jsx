import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Harshad's AI assistant 🤖. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to AI server" },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        animate={{ boxShadow: ['0 4px 20px rgba(167, 139, 113, 0.4)', '0 4px 30px rgba(167, 139, 113, 0.8)', '0 4px 20px rgba(167, 139, 113, 0.4)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '60px', height: '60px', borderRadius: '50%',
          backgroundColor: 'var(--accent-gold)', color: 'var(--bg-primary)',
          border: 'none', fontSize: '1.5rem', cursor: 'pointer',
          zIndex: 100,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass"
            style={{
              position: 'fixed', bottom: '6rem', right: '2rem',
              width: '350px', height: '500px', zIndex: 100,
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <h3 className="text-gold playfair italic" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Harshad's AI Agent</h3>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  style={{ alignSelf: msg.sender === "user" ? 'flex-end' : 'flex-start', maxWidth: '80%' }}
                >
                  <div style={{
                    padding: '0.75rem 1rem', borderRadius: '12px',
                    backgroundColor: msg.sender === "user" ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)',
                    color: msg.sender === "user" ? 'var(--bg-primary)' : 'var(--text-primary)',
                    fontSize: '0.95rem', lineHeight: 1.4,
                    borderBottomRightRadius: msg.sender === "user" ? 0 : '12px',
                    borderBottomLeftRadius: msg.sender === "bot" ? 0 : '12px',
                  }}>
                    {msg.sender === "user" ? (
                      msg.text
                    ) : (
                      <div className="markdown-body" style={{ whiteSpace: 'pre-wrap' }}>
                        {String(msg.text || "")}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                style={{
                  flex: 1, padding: '0.75rem 1rem', borderRadius: '8px',
                  border: '1px solid var(--glass-border)', backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white', outline: 'none', fontSize: '0.95rem'
                }}
              />
              <button
                onClick={handleSend}
                className="btn-primary"
                style={{ padding: '0 1.25rem' }}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}