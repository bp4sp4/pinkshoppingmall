"use client";
import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setInput(""); // 입력창 초기화
  };

  return (
    <div className="chatbot">
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {isOpen && (
        <div className="chatbot-content">
          <h2>💡 고객 지원 챗봇</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력하세요.(배송, 고객센터, 환불)"
            />
            <button type="submit">▶</button>
          </form>
          {response && (
            <div className="chatbot-response">
              <h3>📢 답변</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
