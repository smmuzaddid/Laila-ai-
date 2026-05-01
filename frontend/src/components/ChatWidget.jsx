import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const QUICK_OPTIONS = ['🇦🇪 UAE Company', '🏅 Golden Visa', '🇺🇸 USA LLC', '🇸🇦 Saudi Arabia'];

const WELCOME_MESSAGE = `Welcome to AI Assistance! 👋

I'm Laila, your business consultant.

I help entrepreneurs set up companies and get residency in:
🇦🇪 UAE (Freezone & Mainland)
🇸🇦 Saudi Arabia
🇺🇸 USA
🌍 Europe

What brings you here today? Are you looking to set up a company, get a visa, or explore citizenship options?`;

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = (text || input).trim();
    if (!userMessage || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, sessionId })
      });

      const data = await response.json();

      if (data.sessionId) setSessionId(data.sessionId);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error. Please try again.'
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, I am temporarily unavailable. Please try again in a moment.'
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">L</div>
          <div>
            <h2 className="font-bold text-lg">Laila — AI Assistance</h2>
            <p className="text-blue-200 text-sm">UAE · KSA · USA · Europe &nbsp;|&nbsp; Available 24/7</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-300">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold mr-2 mt-1 flex-shrink-0">
                L
              </div>
            )}
            <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-blue-700 text-white rounded-br-none whitespace-pre-wrap'
                : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100'
            }`}>
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <span className="font-semibold">{children}</span>,
                    em: ({ children }) => <span className="italic">{children}</span>,
                    ul: ({ children }) => <ul className="mt-1 mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="mt-1 mb-2 space-y-1 list-decimal list-inside">{children}</ol>,
                    li: ({ children }) => <li className="flex gap-1">{children}</li>,
                    h1: ({ children }) => <p className="font-bold text-base mb-1">{children}</p>,
                    h2: ({ children }) => <p className="font-bold mb-1">{children}</p>,
                    h3: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
                    code: ({ children }) => <code className="bg-gray-100 px-1 rounded text-xs">{children}</code>,
                    pre: ({ children }) => <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto my-1 whitespace-pre-wrap">{children}</pre>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold mr-2 flex-shrink-0">L</div>
            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                {[0, 150, 300].map(delay => (
                  <div
                    key={delay}
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Options */}
      <div className="px-4 py-2 bg-gray-50 border-t flex gap-2 overflow-x-auto">
        {QUICK_OPTIONS.map(opt => (
          <button
            key={opt}
            onClick={() => sendMessage(opt)}
            className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-blue-100 transition-colors flex-shrink-0"
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-3 items-center">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about company setup, visas, pricing..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
          disabled={loading}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-800 disabled:opacity-40 transition-colors flex-shrink-0"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-0.5">
            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
