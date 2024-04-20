// ChatApp.js
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const response = await axios.post("http://localhost:5000/send-msg", {
      query: inputText,
    });

    const reply = response.data.reply;

    setMessages([
      ...messages,
      { text: inputText, sender: "user", timestamp: new Date() },
      { text: reply, sender: "bot", timestamp: new Date() },
    ]);
    setInputText("");
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {message.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className="bg-gray-100 p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 mr-2 py-2 px-4 rounded-full bg-white border border-gray-300 focus:outline-none"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button
            className="py-2 px-6 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
