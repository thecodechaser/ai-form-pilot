'use client';

import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

type Message = {
  role: 'user' | 'ai';
  content: string;
};

interface FormData {
  name: string;
  email: string;
  linkedinProfile: string;
  idea: string;
}

export default function Copilot({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content:
        "Hi! I'm here to help you submit your AI agent idea. Let's start with the basics - what's your name?",
    },
  ]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `
Help me fill a form with the following fields: name, email, LinkedIn profile, and AI idea one by one.

For each user response:
- Reply naturally and conversationally.
- Acknowledge fields that are filled, using a different, relevant emoji.

Also, include a JSON block at the end of each response inside triple backticks like this:
\`\`\`json
{ "name": "...", "email": "...", "linkedinProfile": "...", "idea": "..." }
\`\`\`

Ensure:
- Name is capitalized properly (e.g., "Ranjeet Singh")
- Email is in lowercase
- LinkedIn is a URL starting with "https://www.linkedin.com/in/"
- Idea is sentence-cased (capitalize first letter, rest lowercase)

This JSON should include all fields every time, even if they’re not filled yet (use null).
`;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const initChat = async () => {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chatSession = await model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          {
            role: 'model',
            parts: [
              {
                text: "Sure! Let's fill the form step by step. First, what's your full name?",
              },
            ],
          },
        ],
      });
      setChat(chatSession);
    };

    initChat();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chat) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const result = await chat.sendMessage(input);
      const raw = await result.response.text();

      const jsonMatch = raw.match(/```json([\s\S]*?)```/);
      let parsed: Partial<FormData> | null = null;

      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[1].trim());
        } catch (e) {
          console.warn('JSON parse error:', e);
        }
      }

      const cleaned = raw.replace(/```json[\s\S]*?```/, '').trim();
      setMessages((prev) => [...prev, { role: 'ai', content: cleaned }]);

      if (parsed) {
        const updated: Partial<FormData> = {};
        if (!formData.name && parsed.name) updated.name = parsed.name;
        if (!formData.email && parsed.email) updated.email = parsed.email;
        if (!formData.linkedinProfile && parsed.linkedinProfile)
          updated.linkedinProfile = parsed.linkedinProfile;
        if (!formData.idea && parsed.idea) updated.idea = parsed.idea;

        if (Object.keys(updated).length > 0) {
          setFormData((prev) => ({ ...prev, ...updated }));
        }
      }
    } catch (err) {
      console.error('Gemini chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: 'Oops! Something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <div className="flex-1 pb-4 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm ${
              msg.role === 'ai'
                ? 'text-left text-blue-800'
                : 'text-right text-gray-800'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                msg.role === 'ai' ? 'bg-blue-50' : 'bg-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 text-black placeholder-gray-500 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your response..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`px-4 py-2 text-white rounded-r-lg transition ${
            loading
              ? 'bg-blue-400 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
