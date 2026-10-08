"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(`${err.message} Check your connection and send the message again.`);
      setMessages(messages);
      setInput(text);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="app">
      <header className="top">
        <h1>Groq Chatbot</h1>
        <button
          type="button"
          className="ghost"
          onClick={() => {
            setMessages([]);
            setError("");
          }}
          disabled={!messages.length && !error}
        >
          Clear chat
        </button>
      </header>

      <section className="log" aria-live="polite">
        {!messages.length && !loading && (
          <p className="empty">Ask a question to get started.</p>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="msg assistant typing" aria-label="Assistant is typing">
            <span />
            <span />
            <span />
          </div>
        )}

        {error && <div className="msg error">{error}</div>}
        <div ref={endRef} />
      </section>

      <form className="composer" onSubmit={sendMessage}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a message"
          aria-label="Message"
          rows={1}
        />
        <button type="submit" className="send" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </main>
  );
}
