import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { streamGroqChat } from '../services/apiService';
import { ChatMessage, ScreeningResult } from '../types';

interface GroqAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeResult?: ScreeningResult | null;
  initialQuestion?: string;
}

export const GroqAssistantModal: React.FC<GroqAssistantModalProps> = ({
  isOpen,
  onClose,
  activeResult,
  initialQuestion
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Initial greeting and setup
  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        const welcomeText = activeResult
          ? `Hello! I'm your Clinical Decision Support Assistant powered by **Groq** using the **openai/gpt-oss-120b** model.\n\nI see you have an active **${activeResult.screening_type.toUpperCase()} screening** with the preliminary finding:\n> **"${activeResult.finding}"** (Urgency: *${activeResult.urgency_level}*)\n\nHow can I help you understand this finding or prepare for your doctor visit?`
          : `Hello! I'm your Clinical Decision Support Assistant powered by **Groq** using the **openai/gpt-oss-120b** model.\n\nI can help you understand medical terms, triage general health concerns, explain clinical patterns, and prepare questions for your healthcare provider.\n\nWhat health question or symptom would you like to explore today?`;

        setMessages([
          {
            id: 'msg_welcome',
            role: 'assistant',
            content: welcomeText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }

      if (initialQuestion && messages.length <= 1) {
        handleSendMessage(initialQuestion);
      }
    }
  }, [isOpen, activeResult, initialQuestion]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isStreaming) return;

    setErrorMsg(null);
    setInput('');

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);

    // Placeholder assistant message for streaming
    const assistantMsgId = `ast_${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...newHistory, assistantMsg]);
    setIsStreaming(true);

    try {
      const apiMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content
      }));

      await streamGroqChat(
        apiMessages,
        activeResult
          ? {
              screening_type: activeResult.screening_type,
              finding: activeResult.finding,
              urgency: activeResult.urgency_level,
              specialist: activeResult.specialist,
              confidence: activeResult.confidence,
              evidence: activeResult.evidence,
              limitations: activeResult.limitations
            }
          : undefined,
        (delta) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId ? { ...msg, content: msg.content + delta } : msg
            )
          );
        }
      );
    } catch (err: any) {
      console.error('Groq chat error:', err);
      setErrorMsg(err.message || 'Groq connection failed. Please try again.');
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId && !msg.content
            ? {
                ...msg,
                content:
                  'I apologize, but I encountered an error communicating with the Groq inference service. Please check your network and try again.'
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
    setErrorMsg(null);
  };

  if (!isOpen) return null;

  const quickPrompts = activeResult
    ? [
        'What questions should I ask my doctor about this?',
        'Explain this clinical finding in simple terms',
        'What red flags mean I should seek emergency care?',
        'What follow-up tests might a specialist perform?'
      ]
    : [
        'How should I prepare for a dermatology checkup?',
        'What is the difference between an eye exam and retinal scan?',
        'How do dentists check for cavities between teeth?',
        'What causes sudden voice hoarseness?'
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col h-[88vh] max-h-[760px] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Groq Clinical AI Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono border border-teal-500/30 flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> openai/gpt-oss-120b
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Ultra-low latency inference via Groq LPU · Clinical Decision Support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Safety Boundary Banner */}
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-950 text-[11px] flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <p className="truncate">
            <strong>Educational Decision Support:</strong> Does not diagnose or prescribe. Consult a licensed doctor for medical care.
          </p>
        </div>

        {/* Messages Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id || idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative group max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {/* Markdown rendering simulation / lines */}
                  <div className="space-y-2 whitespace-pre-wrap">
                    {msg.content ? (
                      msg.content
                    ) : isStreaming && idx === messages.length - 1 ? (
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                        <span>Groq is reasoning...</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Message Footer / Copy */}
                  {!isUser && msg.content && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-teal-600" />
                        <span>Groq openai/gpt-oss-120b</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.content, idx)}
                        className="hover:text-slate-700 flex items-center gap-1 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
          <span className="text-slate-400 font-medium whitespace-nowrap text-[10px] uppercase tracking-wider pl-1">
            Suggestions:
          </span>
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(q)}
              disabled={isStreaming}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 whitespace-nowrap border border-slate-200 transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Groq about clinical terms, symptoms, or doctor questions..."
              disabled={isStreaming}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-teal-600 text-slate-800 bg-slate-50 focus:bg-white disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              {isStreaming ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
