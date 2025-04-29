import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import { FaRobot, FaTimes } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I can help with parcel delivery questions. Ask away!', isBot: true },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');

    try {
      // Send query to backend
      const res = await axios.post('http://localhost:5000/api/chatbot/ask', { query: input });
      setMessages(prev => [...prev, { text: res.data.answer, isBot: true }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: 'Something went wrong. Please try again.', isBot: true },
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-black transition"
        >
          <FaRobot size={24} />
        </button>
      ) : (
        <div className="bg-white w-80 h-96 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-red-700 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Parcel Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input Area */}
          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                placeholder="Ask about parcel delivery..."
              />
              <button
                onClick={handleSend}
                className="bg-gray-300 text-black p-2 rounded-r-lg hover:bg-red-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;