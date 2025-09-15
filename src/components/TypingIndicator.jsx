import React from "react";

export function TypingIndicator() {
  return (
    <div className="message-container agent">
      <div className="message-bubble agent">
        <div className="d-flex align-items-center gap-1">
          <span 
            className="typing-dot bg-secondary rounded-circle" 
            style={{ 
              width: 8, 
              height: 8,
              animation: 'bounce 1.4s infinite ease-in-out both',
              animationDelay: '0s'
            }} 
          />
          <span 
            className="typing-dot bg-secondary rounded-circle" 
            style={{ 
              width: 8, 
              height: 8,
              animation: 'bounce 1.4s infinite ease-in-out both',
              animationDelay: '0.16s'
            }} 
          />
          <span 
            className="typing-dot bg-secondary rounded-circle" 
            style={{ 
              width: 8, 
              height: 8,
              animation: 'bounce 1.4s infinite ease-in-out both',
              animationDelay: '0.32s'
            }} 
          />
        </div>
      </div>
    </div>
  );
}