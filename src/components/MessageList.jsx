import React from "react";

export default function MessageList({ messages, isStreaming }) {
  return (
    <div>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message-container ${msg.role}`}
        >
          <div className={`message-bubble ${msg.role}`}>
            {msg.content}
          </div>
        </div>
      ))}

      {isStreaming && (
        <div className="message-container agent">
          <div className="message-bubble agent">
            Agent is typing...
          </div>
        </div>
      )}
    </div>
  );
}
