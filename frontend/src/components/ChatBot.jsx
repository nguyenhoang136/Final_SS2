import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown'; // 1. IMPORT THƯ VIỆN Ở ĐÂY

const ChatBot = ({ token }) => { 
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì cho bạn?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    setMessages((prev) => [...prev, { text: "...", isBot: true, isLoading: true }]);

    try {
        const response = await fetch('http://localhost:4000/api/chat/ask', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ message: currentInput }),
        });

        const data = await response.json();

        setMessages((prev) => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1] = { 
                text: data.success ? data.reply : (data.error || "Có lỗi xảy ra!"), 
                isBot: true 
            };
            return newMsgs;
        });
    } catch (error) {
        console.error("Lỗi:", error);
        setMessages((prev) => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1] = { text: "Không thể kết nối server!", isBot: true };
            return newMsgs;
        });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bubble} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </div>

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>Trợ lý AI</div>
          <div style={styles.body} ref={scrollRef}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.message,
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  backgroundColor: msg.isBot ? '#e9e9eb' : '#007bff',
                  color: msg.isBot ? 'black' : 'white',
                }}
              >
                {/* 2. SỬA TẠI ĐÂY: Dùng ReactMarkdown để render nội dung text */}
                <ReactMarkdown style={styles.markdownOverride}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))}
          </div>
          <div style={styles.footer}>
            <textarea
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Nhập tin nhắn..."
              rows={1}
            />
            <button style={styles.sendBtn} onClick={handleSendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: 'sans-serif' },
  bubble: {
    width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#007bff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
    fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    transition: 'all 0.3s'
  },
  chatWindow: {
    position: 'absolute', bottom: '80px', right: '0', width: '320px', height: '450px',
    backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden'
  },
  header: { padding: '15px', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' },
  body: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  
  // 3. CẬP NHẬT STYLE: Thêm whiteSpace để xử lý xuống dòng mượt mà hơn, xóa bớt padding thừa
  message: { 
    padding: '2px 12px', 
    borderRadius: '15px', 
    maxWidth: '80%', 
    fontSize: '14px', 
    wordBreak: 'break-word',
    whiteSpace: 'pre-line' 
  },
  footer: { padding: '10px', borderTop: '1px solid #eee', display: 'flex' },
  input: { flex: 1, border: '1px solid #ddd', borderRadius: '20px', padding: '8px 15px', outline: 'none' },
  sendBtn: { marginLeft: '8px', border: 'none', backgroundColor: 'transparent', color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }
};

export default ChatBot;