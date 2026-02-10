import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];
}

const WELCOME_TEXT = "Hi there! Welcome to SNJB College of Engineering. I can help you with questions about our college - like courses, fees, admissions, placements, hostel, and more. Just pick a topic below or type your question!";
const WELCOME_QUICK_REPLIES = [
  "About SNJB",
  "Courses Offered",
  "Admissions",
  "Fees Structure",
  "Placements",
  "Cutoffs",
  "Hostel & Facilities",
  "Contact Us",
  "Lateral Entry (DSE)",
  "Training & Support",
];

function formatMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  const processInline = (str: string) => {
    const parts: (string | JSX.Element)[] = [];
    let remaining = str;
    let keyIdx = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

      let nextMatch: { index: number; length: number; element: JSX.Element; type: string } | null = null;

      if (boldMatch && boldMatch.index !== undefined) {
        const candidate = { index: boldMatch.index, length: boldMatch[0].length, element: <strong key={`b-${keyIdx}`} className="font-semibold">{boldMatch[1]}</strong>, type: "bold" };
        if (nextMatch === null || candidate.index < nextMatch.index) nextMatch = candidate;
      }
      if (linkMatch && linkMatch.index !== undefined) {
        const candidate = { index: linkMatch.index, length: linkMatch[0].length, element: <a key={`l-${keyIdx}`} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{linkMatch[1]}</a>, type: "link" };
        if (nextMatch === null || candidate.index < nextMatch.index) nextMatch = candidate;
      }

      if (nextMatch) {
        if (nextMatch.index > 0) {
          parts.push(remaining.substring(0, nextMatch.index));
        }
        parts.push(nextMatch.element);
        remaining = remaining.substring(nextMatch.index + nextMatch.length);
        keyIdx++;
      } else {
        parts.push(remaining);
        break;
      }
    }
    return parts;
  };

  const flushTable = () => {
    if (tableHeaders.length > 0 || tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-2 rounded-md border border-white/10">
          <table className="w-full text-xs">
            {tableHeaders.length > 0 && (
              <thead>
                <tr className="bg-white/5">
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="px-2 py-1.5 text-left font-semibold text-white/90 border-b border-white/10">{processInline(h.trim())}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "" : "bg-white/3"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-2 py-1.5 text-white/70 border-b border-white/5">{processInline(cell.trim())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableHeaders = [];
      tableRows = [];
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

      if (cells.every(c => /^[\s\-:]+$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    }

    if (inTable) {
      flushTable();
    }

    if (line.trim() === "") {
      elements.push(<div key={`sp-${i}`} className="h-2" />);
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-1.5 ml-1 my-0.5">
          <span className="text-[hsl(30,85%,52%)] mt-1 flex-shrink-0 text-[8px]">&#9679;</span>
          <span className="text-white/80 text-[13px] leading-relaxed">{processInline(line.substring(2))}</span>
        </div>
      );
      continue;
    }

    const numberMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (numberMatch) {
      elements.push(
        <div key={`ol-${i}`} className="flex items-start gap-2 ml-1 my-0.5">
          <span className="text-[hsl(30,85%,52%)] font-semibold text-xs mt-0.5 flex-shrink-0 min-w-[16px]">{numberMatch[1]}.</span>
          <span className="text-white/80 text-[13px] leading-relaxed">{processInline(numberMatch[2])}</span>
        </div>
      );
      continue;
    }

    elements.push(
      <p key={`p-${i}`} className="text-white/80 text-[13px] leading-relaxed my-0.5">{processInline(line)}</p>
    );
  }

  if (inTable) flushTable();

  return elements;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: WELCOME_TEXT,
      sender: "bot",
      timestamp: new Date(),
      quickReplies: WELCOME_QUICK_REPLIES,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const buildHistory = useCallback((msgs: Message[]) => {
    return msgs
      .filter((m) => m.id !== "welcome")
      .map((m) => ({
        role: m.sender === "user" ? "user" as const : "assistant" as const,
        content: m.content,
      }));
  }, []);

  const sendToApi = useCallback(async (message: string, currentMessages: Message[]) => {
    setIsTyping(true);

    const botMsgId = `bot-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        content: "",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const history = buildHistory(currentMessages);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";
      let quickReplies: string[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          try {
            const data = JSON.parse(line.slice(6));

            if (data.type === "text") {
              fullText += data.content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMsgId ? { ...m, content: fullText } : m
                )
              );
            } else if (data.type === "done") {
              quickReplies = data.quickReplies || [];
            }
          } catch {
            // skip malformed JSON
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, content: fullText, quickReplies }
            : m
        )
      );
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") return;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? {
                ...m,
                content: "Sorry, something went wrong. Please try again or choose a topic below.",
                quickReplies: ["About SNJB", "Courses Offered", "Contact Us"],
              }
            : m
        )
      );
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  }, [buildHistory]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      content: trimmed,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMsg];
      sendToApi(trimmed, updated);
      return updated;
    });
    setInput("");
  }, [input, isTyping, sendToApi]);

  const handleQuickReply = useCallback((reply: string) => {
    if (isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      content: reply,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMsg];
      sendToApi(reply, updated);
      return updated;
    });
  }, [isTyping, sendToApi]);

  const handleReset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([
      {
        id: "welcome",
        content: WELCOME_TEXT,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: WELCOME_QUICK_REPLIES,
      },
    ]);
    setIsTyping(false);
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setShowScrollDown(!isNearBottom);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9999]"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-[hsl(215,80%,28%)] border-2 border-[hsl(215,80%,35%)] text-white flex items-center justify-center shadow-lg shadow-[hsl(215,80%,15%)/0.4] transition-transform duration-200"
              data-testid="button-open-chat"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="absolute bottom-full right-0 mb-3 bg-white dark:bg-[hsl(215,25%,18%)] text-foreground text-sm px-4 py-2.5 rounded-lg shadow-lg whitespace-nowrap border border-border"
            >
              <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white dark:bg-[hsl(215,25%,18%)] border-r border-b border-border rotate-45" />
              Need help? Chat with us!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-48px)] h-[580px] max-h-[calc(100vh-48px)] flex flex-col rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10"
            data-testid="chatbot-panel"
          >
            <div className="bg-gradient-to-r from-[hsl(215,50%,20%)] to-[hsl(215,60%,25%)] px-4 py-3.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm leading-tight" data-testid="text-bot-name">SNJB Bot</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-white/60" data-testid="text-bot-status">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleReset}
                  className="text-white/60 no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-reset-chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-close-chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div
              ref={scrollAreaRef}
              className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(215,35%,14%)] to-[hsl(215,30%,12%)] px-3 py-3 relative"
              onScroll={handleScroll}
            >
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    <div className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.sender === "bot" && (
                        <div className="w-7 h-7 rounded-full bg-[hsl(215,80%,28%)] flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                          msg.sender === "user"
                            ? "bg-[hsl(215,80%,28%)] text-white rounded-br-sm"
                            : "bg-white/8 border border-white/8 text-white/90 rounded-bl-sm"
                        }`}
                        data-testid={`message-${msg.sender}-${msg.id}`}
                      >
                        {msg.sender === "bot" ? (
                          msg.content ? (
                            <div className="space-y-0.5">{formatMarkdown(msg.content)}</div>
                          ) : (
                            <div className="flex gap-1.5 py-1" data-testid="typing-indicator">
                              <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          )
                        ) : (
                          <p className="text-[13px] leading-relaxed">{msg.content}</p>
                        )}
                        {msg.content && (
                          <p className={`text-[9px] mt-1.5 ${msg.sender === "user" ? "text-white/40 text-right" : "text-white/30"}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        )}
                      </div>
                      {msg.sender === "user" && (
                        <div className="w-7 h-7 rounded-full bg-[hsl(30,85%,52%)] flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                        {msg.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            onClick={() => handleQuickReply(qr)}
                            disabled={isTyping}
                            className="px-2.5 py-1 rounded-full bg-white/6 border border-white/12 text-white/70 text-[11px] font-medium transition-all duration-200 disabled:opacity-40"
                            data-testid={`button-quick-${qr.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />

              {showScrollDown && (
                <button
                  onClick={scrollToBottom}
                  className="sticky bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[hsl(215,80%,28%)] text-white flex items-center justify-center shadow-lg z-10"
                  data-testid="button-scroll-down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="bg-[hsl(215,35%,14%)] border-t border-white/8 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about admissions, fees, placements..."
                  className="flex-1 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#ffffff] placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[hsl(215,80%,40%)] transition-colors caret-white"
                  disabled={isTyping}
                  data-testid="input-chat-message"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-[hsl(215,80%,28%)] border-[hsl(215,80%,22%)] text-white flex-shrink-0"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[9px] text-white/25 text-center mt-1.5">SNJB College of Engineering - AI Assistant</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
