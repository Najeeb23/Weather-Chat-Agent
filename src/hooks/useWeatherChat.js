import { useState, useRef, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;
const THREAD_ID = import.meta.env.VITE_THREAD_ID;

function makeMessage(role, content = "") {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
    ts: new Date().toISOString(),
  };
}

export function useWeatherChat() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortCtrlRef = useRef(null);

  const appendMessage = useCallback((m) => {
    setMessages((prev) => [...prev, m]);
  }, []);

  const setLastAgent = useCallback((content) => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      if (last.role !== "agent") return prev;
      const updated = { ...last, content };
      return [...prev.slice(0, -1), updated];
    });
  }, []);

  async function sendMessage(userText) {
    if (!userText?.trim() || isStreaming) return;
    setError(null);

    appendMessage(makeMessage("user", userText.trim()));
    appendMessage(makeMessage("agent", "")); // create empty agent message

    setIsStreaming(true);
    const controller = new AbortController();
    abortCtrlRef.current = controller;

    try {
      const payload = {
        messages: [{ role: "user", content: userText }],
        threadId: THREAD_ID,
      };

      const url = `${API_BASE}/api/agents/weatherAgent/stream`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
          "x-mastra-dev-playground": "true",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new Error(`API Error ${res.status} ${res.statusText}: ${errorText}`);
      }

      if (!res.body) {
        // Non-streaming JSON
        const data = await res.json().catch(() => null);
        if (data?.result) {
          const r = data.result;
          const formatted = `The current weather in ${r.location} is ${r.conditions.toLowerCase()} with a temperature of ${r.temperature}°C, but it feels like ${r.feelsLike}°C. The humidity is at ${r.humidity}%, and there is a wind speed of ${r.windSpeed} km/h with gusts up to ${r.windGust} km/h.`;
          setLastAgent(formatted);
        }
        setIsStreaming(false);
        abortCtrlRef.current = null;
        return;
      }

      // Streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        // Extract only lines like 0:"text"
        const lines = accumulated.split(/\r?\n/);
        let displayText = "";
        lines.forEach((line) => {
          const match = line.match(/^\d+:"(.*)"$/);
          if (match) displayText += match[1];
        });

        if (displayText) setLastAgent(displayText); // overwrite last agent content
      }

      setIsStreaming(false);
      abortCtrlRef.current = null;
    } catch (err) {
      if (err.name === "AbortError") setError("Request aborted.");
      else setError(`Error: ${err.message}`);
      setIsStreaming(false);
      abortCtrlRef.current = null;
    }
  }

  const abort = useCallback(() => {
    if (abortCtrlRef.current) abortCtrlRef.current.abort();
  }, []);

  const clearChat = useCallback(() => {
    if (abortCtrlRef.current) abortCtrlRef.current.abort();
    setMessages([]);
    setError(null);
    setIsStreaming(false);
  }, []);

  return { messages, isStreaming, error, sendMessage, clearChat, abort };
}
