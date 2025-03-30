"use client";
import { useState, useEffect, useRef } from "react";

// 채팅 메시지 타입 정의
interface ChatMessage {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

// 추천 질문 타입 정의
interface SuggestedQuestion {
  id: string;
  text: string;
}

export default function EnhancedChatbot() {
  // 상태 관리
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<
    SuggestedQuestion[]
  >([
    { id: "1", text: "배송은 얼마나 걸리나요?" },
    { id: "2", text: "환불 정책이 어떻게 되나요?" },
    { id: "3", text: "고객센터 운영 시간이 어떻게 되나요?" },
    { id: "4", text: "인기 상품을 추천해주세요" },
  ]);

  // 채팅창 스크롤 관리를 위한 ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  // 채팅창이 열릴 때 웰컴 메시지 표시
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        text: "안녕하세요! 핑크숍 고객센터입니다. 무엇을 도와드릴까요?",
        timestamp: new Date(),
      };

      // 타이핑 효과를 위한 지연
      setIsTyping(true);
      setTimeout(() => {
        setMessages([welcomeMessage]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // 새 메시지가 추가될 때마다 스크롤 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 채팅 메시지 전송 처리
  const handleSubmit = async (
    e: React.FormEvent | null,
    questionText?: string
  ) => {
    if (e) e.preventDefault();

    const messageText = questionText || input;
    if (!messageText.trim()) return;

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // API 호출
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      // 타이핑 효과를 위한 지연
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);

        // 새로운 추천 질문 생성 (실제로는 더 복잡한 로직이 필요할 수 있음)
        updateSuggestedQuestions(messageText);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);

      // 에러 메시지 표시
      setTimeout(() => {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: "죄송합니다. 메시지 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  // 추천 질문 업데이트 (컨텍스트에 따라 다른 질문 제안)
  const updateSuggestedQuestions = (lastMessage: string) => {
    const lowerMessage = lastMessage.toLowerCase();

    if (lowerMessage.includes("배송")) {
      setSuggestedQuestions([
        { id: "1", text: "배송 조회는 어떻게 하나요?" },
        { id: "2", text: "해외 배송도 가능한가요?" },
        { id: "3", text: "배송비는 얼마인가요?" },
      ]);
    } else if (lowerMessage.includes("환불") || lowerMessage.includes("반품")) {
      setSuggestedQuestions([
        { id: "1", text: "환불 절차가 어떻게 되나요?" },
        { id: "2", text: "반품 배송비는 누가 부담하나요?" },
        { id: "3", text: "환불은 얼마나 걸리나요?" },
      ]);
    } else if (lowerMessage.includes("상품") || lowerMessage.includes("제품")) {
      setSuggestedQuestions([
        { id: "1", text: "인기 상품을 추천해주세요" },
        { id: "2", text: "신상품은 언제 업데이트되나요?" },
        { id: "3", text: "할인 중인 상품이 있나요?" },
      ]);
    } else {
      setSuggestedQuestions([
        { id: "1", text: "회원가입 혜택이 있나요?" },
        { id: "2", text: "적립금은 어떻게 사용하나요?" },
        { id: "3", text: "쿠폰은 어디서 받을 수 있나요?" },
        { id: "4", text: "고객센터 전화번호가 어떻게 되나요?" },
      ]);
    }
  };

  // 추천 질문 클릭 처리
  const handleSuggestedQuestionClick = (question: string) => {
    handleSubmit(null, question);
  };

  // 채팅창 토글
  const toggleChat = () => {
    setIsOpen(!isOpen);
    // 애니메이션 효과를 위한 클래스 추가/제거
    if (!isOpen) {
      document.body.classList.add("chatbot-open");
    } else {
      document.body.classList.remove("chatbot-open");
    }
  };

  // 메시지 시간 포맷팅
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`chatbot ${isOpen ? "chatbot--open" : ""}`}>
      <button
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-label="채팅 상담 열기"
      >
        <span className="chatbot-toggle__icon">💬</span>
        <span className="chatbot-toggle__text">상담하기</span>
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h2 className="chatbot-header__title">💡 고객 지원 챗봇</h2>
            <button
              className="chatbot-header__close"
              onClick={toggleChat}
              aria-label="채팅 상담 닫기"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-content" ref={chatContentRef}>
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbot-message ${
                    message.type === "user"
                      ? "chatbot-message--user"
                      : "chatbot-message--bot"
                  }`}
                >
                  <div className="chatbot-message__content">
                    <p>{message.text}</p>
                    <span className="chatbot-message__time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chatbot-message chatbot-message--bot">
                  <div className="chatbot-message__content">
                    <div className="chatbot-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {suggestedQuestions.length > 0 && (
              <div className="chatbot-suggested-questions">
                <p className="chatbot-suggested-questions__title">추천 질문:</p>
                <div className="chatbot-suggested-questions__list">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question.id}
                      className="chatbot-suggested-questions__item"
                      onClick={() =>
                        handleSuggestedQuestionClick(question.text)
                      }
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력하세요..."
              className="chatbot-input__field"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="chatbot-input__submit"
              disabled={isTyping || !input.trim()}
            >
              <span>전송</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
