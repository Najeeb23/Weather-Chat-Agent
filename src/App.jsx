import React, { useEffect, useRef } from "react";
import { useWeatherChat } from "./hooks/useWeatherChat";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

export default function App() {
  const { messages, isStreaming, error, sendMessage } = useWeatherChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Messages Area */}
     <div className="flex-grow-1 overflow-auto p-5" style={{ paddingTop: "150px" }}>

        <div className="mx-auto" style={{ maxWidth: "700px" }}>
          <MessageList messages={messages} isStreaming={isStreaming} />
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input at Bottom */}
      <div className="bg-transparent shadow-sm p-3">

        <div className="mx-auto" style={{ maxWidth: "700px" }}>
          <MessageInput onSend={sendMessage} disabled={isStreaming} />
          {error && (
            <div className="alert alert-danger mt-2 mb-0" role="alert">
              <small>{error}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
