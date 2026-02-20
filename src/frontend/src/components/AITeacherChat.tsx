import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AITeacherChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'नमस्ते! मैं आपका AI Teacher हूँ। आप मुझसे Geography, UPSC, Polity, Economy, History, Science और Current Affairs के बारे में कुछ भी पूछ सकते हैं। How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Geography responses
    if (lowerQuestion.includes('geography') || lowerQuestion.includes('भूगोल')) {
      return `Geography is the study of Earth's physical features, climate, and human populations. Key topics include:\n\n📍 Physical Geography: Landforms, climate, vegetation\n🌍 Human Geography: Population, migration, urbanization\n🗺️ Economic Geography: Resources, industries, trade\n\nFor competitive exams, focus on:\n• Indian Geography (rivers, mountains, climate zones)\n• World Geography (continents, countries, capitals)\n• Map reading and location-based questions\n\nWould you like detailed notes on any specific geography topic?`;
    }

    // UPSC preparation
    if (lowerQuestion.includes('upsc') || lowerQuestion.includes('यूपीएससी')) {
      return `UPSC (Union Public Service Commission) तैयारी के लिए महत्वपूर्ण बिंदु:\n\n📚 Syllabus Coverage:\n• Prelims: GS Paper I & II (CSAT)\n• Mains: Essay + 4 GS Papers + Optional\n• Interview: Personality Test\n\n⏰ Study Strategy:\n• NCERT books (Class 6-12) - Foundation\n• Standard reference books\n• Current Affairs - Daily reading\n• Answer writing practice\n• Mock tests regularly\n\n🎯 Time Management:\n• Prelims: 6-8 months preparation\n• Mains: 4-6 months focused writing\n• Consistent daily study: 8-10 hours\n\nWould you like a detailed study plan for any specific subject?`;
    }

    // Polity
    if (lowerQuestion.includes('polity') || lowerQuestion.includes('राजनीति') || lowerQuestion.includes('संविधान')) {
      return `Indian Polity और Constitution के महत्वपूर्ण topics:\n\n📜 Constitution Basics:\n• Preamble - Objectives and philosophy\n• Fundamental Rights (Articles 12-35)\n• Fundamental Duties (Article 51A)\n• Directive Principles (Articles 36-51)\n\n🏛️ Government Structure:\n• Union Government: President, PM, Parliament\n• State Government: Governor, CM, Legislature\n• Judiciary: Supreme Court, High Courts\n\n⚖️ Important Amendments:\n• 42nd Amendment - Mini Constitution\n• 44th Amendment - Right to Property\n• 73rd & 74th - Panchayati Raj\n\nRecommended Book: M. Laxmikanth - Indian Polity\n\nKya aapko kisi specific article ke baare mein detail chahiye?`;
    }

    // SSC preparation
    if (lowerQuestion.includes('ssc')) {
      return `SSC Exam Preparation Strategy:\n\n📝 Exam Pattern:\n• SSC CGL: Tier I, II, III, IV\n• SSC CHSL: Tier I, II, III\n• SSC MTS: Paper I & II\n\n📚 Important Subjects:\n• Quantitative Aptitude\n• English Language\n• General Intelligence & Reasoning\n• General Awareness\n\n⏱️ Preparation Tips:\n• Practice previous year questions\n• Speed and accuracy are crucial\n• Daily current affairs\n• Mock tests weekly\n\n🎯 Time Required: 4-6 months dedicated preparation\n\nWould you like topic-wise study material?`;
    }

    // Economy
    if (lowerQuestion.includes('economy') || lowerQuestion.includes('अर्थव्यवस्था')) {
      return `Indian Economy - Key Concepts:\n\n💰 Basic Concepts:\n• GDP, GNP, National Income\n• Inflation, Deflation, Stagflation\n• Fiscal Policy vs Monetary Policy\n• Budget and its components\n\n🏦 Important Topics:\n• Banking System (RBI, Commercial Banks)\n• Five Year Plans\n• Economic Reforms (1991)\n• GST and Tax Structure\n\n📊 Current Focus Areas:\n• Digital Economy\n• Make in India\n• Startup India\n• Economic Survey highlights\n\nRecommended: Ramesh Singh - Indian Economy\n\nKisi specific economic concept ki detail chahiye?`;
    }

    // History
    if (lowerQuestion.includes('history') || lowerQuestion.includes('इतिहास')) {
      return `Indian History - Comprehensive Coverage:\n\n🏛️ Ancient India:\n• Indus Valley Civilization\n• Vedic Period\n• Mauryan & Gupta Empire\n• Art, Culture, Literature\n\n⚔️ Medieval India:\n• Delhi Sultanate\n• Mughal Empire\n• Bhakti & Sufi Movements\n• Regional Kingdoms\n\n🇮🇳 Modern India:\n• British Rule & Policies\n• Freedom Struggle (1857-1947)\n• National Movement Leaders\n• Post-Independence India\n\n📚 Study Approach:\n• Timeline-based learning\n• Connect events causally\n• Focus on personalities\n• Art & Culture integration\n\nWould you like detailed notes on any period?`;
    }

    // Science
    if (lowerQuestion.includes('science') || lowerQuestion.includes('विज्ञान')) {
      return `General Science for Competitive Exams:\n\n🔬 Physics:\n• Motion, Force, Energy\n• Light, Sound, Electricity\n• Modern Physics basics\n\n🧪 Chemistry:\n• Periodic Table\n• Acids, Bases, Salts\n• Chemical Reactions\n• Everyday Chemistry\n\n🧬 Biology:\n• Cell Structure\n• Human Body Systems\n• Diseases & Immunity\n• Genetics basics\n\n🌍 Environmental Science:\n• Ecology & Ecosystem\n• Climate Change\n• Pollution & Conservation\n\nFocus on NCERT (Class 6-10) for strong foundation!\n\nKisi specific topic ki detail chahiye?`;
    }

    // Current Affairs
    if (lowerQuestion.includes('current affairs') || lowerQuestion.includes('करंट अफेयर्स')) {
      return `Current Affairs Preparation Strategy:\n\n📰 Daily Sources:\n• The Hindu / Indian Express\n• PIB (Press Information Bureau)\n• Yojana & Kurukshetra magazines\n• Rajya Sabha TV discussions\n\n🎯 Important Areas:\n• National & International Events\n• Government Schemes & Policies\n• Awards & Honors\n• Sports & Personalities\n• Science & Technology\n• Economic Developments\n\n📝 Preparation Tips:\n• Daily 1-hour reading\n• Make monthly compilations\n• Link with static GK\n• Practice MCQs regularly\n\nWould you like today's important current affairs?`;
    }

    // Default response
    return `Great question! I can help you with:\n\n📚 Subject-wise guidance:\n• Geography (भूगोल)\n• History (इतिहास)\n• Polity (राजनीति)\n• Economy (अर्थव्यवस्था)\n• Science (विज्ञान)\n• Current Affairs\n\n🎯 Exam-specific preparation:\n• UPSC\n• SSC\n• Railway\n• Banking\n• State PSC\n\nPlease ask me a specific question about any topic, and I'll provide detailed information with study tips!\n\nExample questions:\n• "UPSC की तैयारी कैसे करें?"\n• "Indian Polity के important topics?"\n• "Geography notes chahiye"`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything... (English या हिंदी में पूछें)"
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
