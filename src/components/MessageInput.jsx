import React, { useState } from "react";
import topRight from "../assets/top-right.png"; // adjust path if needed

export default function MessageInput({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center bg-white rounded-4 shadow-lg p-2"
    >
      <textarea
        className="form-control border-0 shadow-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        rows={2}   // <-- taller box
        style={{
          resize: "none",
          minHeight: "85px",   // <-- bigger height
          overflow: "hidden",
          verticalAlign: "top",
          textAlign: "left",
          paddingTop: "8px",   // keeps cursor at top
          lineHeight: "1.4",   // more readable
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button
        type="submit"
        className="btn btn-dark rounded-3 ms-2 d-flex align-items-center justify-content-center"
        style={{ width: "40px", height: "40px", marginTop: "40px" }}
        disabled={disabled}
      >
        <img
          src={topRight}
          alt="Send"
          style={{ width: "18px", height: "18px" }}
        />
      </button>
    </form>
  );
}
