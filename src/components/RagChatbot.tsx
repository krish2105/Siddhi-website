import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ArrowRight, CornerDownLeft, FileText, HelpCircle } from 'lucide-react';

/* =========================================================================
   AURELLE LUXE RAG KNOWLEDGE BASE
   Authoritative Domain Documents for Retrieval-Augmented Generation
   ========================================================================= */
export interface KnowledgeDoc {
  id: string;
  category: string;
  citation: string;
  keywords: string[];
  title: string;
  content: string;
  action?: {
    label: string;
    actionType: 'cart' | 'vip' | 'product' | 'whatsapp' | 'pincode';
  };
}

export const KNOWLEDGE_BASE: KnowledgeDoc[] = [
  {
    id: 'surface-safety',
    category: 'Surface Engineering',
    citation: 'Technical Bulletin §4.2 (Ceramic Safety)',
    keywords: ['scratch', 'porcelain', 'ceramic', 'toto', 'kohler', 'jaquar', 'duravit', 'vitreous', 'glaze', 'safe', 'enamel', 'toilet'],
    title: 'Glaze & Vitreous China Compatibility',
    content: 'Aurelle cleaning pods are engineered with a proprietary dual-density cellulose micro-weave that contains zero abrasive pumice, sand, or mineral silicates. Independently tested on high-gloss vitreous china finishes from Kohler, TOTO (including CeFiONtect glazes), Jaquar, and Duravit. 100% scratch-free guarantee across 5,000 continuous scrub cycles.',
    action: { label: 'View Hardware Specs', actionType: 'product' },
  },
  {
    id: 'chemistry-pathogens',
    category: 'Chemistry & Hygiene',
    citation: 'NABL Certified Lab Report #AU-8892',
    keywords: ['germs', 'bacteria', 'clean', 'smell', 'fragrance', 'disinfect', 'kill', 'pathogen', 'chemical', 'acid', 'harsh', 'blue water', 'e coli'],
    title: 'Pathogen Elimination & Botanical Scent',
    content: 'Each pod features an active triple-surfactant reservoir activated in 3 seconds by toilet water. Proven to eliminate 99.9% of bathroom pathogens including E. coli, Staphylococcus aureus, and Salmonella enterica. Dissolves hard-water calcium limescale without harsh hydrochloric fumes, releasing a subtle botanical note of French lavender and eucalyptus.',
    action: { label: 'Explore Science Dossier', actionType: 'product' },
  },
  {
    id: 'touchless-ritual',
    category: 'Operational Protocol',
    citation: 'Aurelle Ritual Protocol §2.1',
    keywords: ['touch', 'hands', 'dirty', 'drop', 'eject', 'disposal', 'flush', 'ritual', 'how to use', 'bin', 'trash', 'steps'],
    title: 'Zero-Contact Snap & Ejection Ritual',
    content: 'The Aurelle system guarantees your hands never touch soiled water or used sponges. 1: Snap wand into pod tray (magnetic tactile lock). 2: Swish in water for 3 seconds to foam. 3: Clean bowl. 4: Slide the champagne gold thumb release forward to eject the pod directly into your trash bin. The used pod is completely bio-degradable cellulose.',
    action: { label: 'Watch Video Ritual', actionType: 'product' },
  },
  {
    id: 'logistics-cod',
    category: 'Logistics & Dispatch',
    citation: 'Logistics SLA & Carrier Agreement 2026',
    keywords: ['delivery', 'shipping', 'cod', 'cash on delivery', 'pin', 'pincode', 'bangalore', 'mumbai', 'delhi', 'hyderabad', 'chennai', 'days', 'time', 'courier', 'blue dart'],
    title: 'Pan-India Blue Dart Logistics & COD',
    content: 'We ship across 24,000+ Indian pincodes via Blue Dart Air Express. Delivery takes 2-3 business days to metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) and 3-5 days for other regions. Cash on Delivery (COD) is available with zero surcharge. Prepaid UPI and Cards receive an instant ₹100 dispatch privilege.',
    action: { label: 'Order Starter Kit (₹1,499)', actionType: 'cart' },
  },
  {
    id: 'vip-prive-discounts',
    category: 'Privileges & Subscriptions',
    citation: 'Aurelle Privé Charter v2',
    keywords: ['discount', 'code', 'coupon', 'vip', 'prive', 'offer', 'save', 'cheap', 'price', 'deal', 'promo', 'subscription', 'auto ship', 'refill'],
    title: 'Aurelle Privé VIP Membership & Auto-Ship',
    content: 'Members receive instant access to promo code "AURELLE-PRIVÉ" for ₹200 off their first order. For ongoing refills, our Auto-Ship program delivers 16-pod or 32-pod packs every 30, 60, or 90 days at a perpetual 15% discount with free priority dispatch. Subscriptions can be paused or modified anytime via WhatsApp with 1 tap.',
    action: { label: 'Claim ₹200 VIP Code', actionType: 'vip' },
  },
  {
    id: 'hardware-caddy',
    category: 'Industrial Design',
    citation: 'Aurelle Industrial CAD Manual §1.4',
    keywords: ['wand', 'wall mount', 'drill', 'caddy', 'stand', 'stick', 'tile', 'marble', '3m', 'adhesive', 'rust', 'aluminum', 'gold'],
    title: 'Anodized Aluminum Wand & Magnetic Caddy',
    content: 'The wand is machined from aircraft-grade 6063 anodized aluminum with champagne gold PVD accents. It is 100% rustproof and humidity-resistant. The wall dock mounts onto marble, tiles, or glass using high-bond 3M VHB adhesive with zero drilling required, featuring an invisible drip-catch perimeter and anti-bacterial dry airflow channel.',
    action: { label: 'View 3D Wand Canvas', actionType: 'product' },
  },
  {
    id: 'guarantee-returns',
    category: 'Consumer Protection',
    citation: 'Aurelle 30-Day Hygiene Guarantee',
    keywords: ['return', 'refund', 'money back', 'guarantee', 'broken', 'warranty', 'support', 'contact', 'customer care'],
    title: '30-Day In-Home Guarantee & 2-Year Hardware Warranty',
    content: 'Try Aurelle in your bathroom for 30 days. If it does not completely transform your bathroom aesthetics and hygiene routine, we will issue a 100% hassle-free refund and arrange complimentary courier pickup. Additionally, the aluminum wand and magnetic dock carry a full 2-year replacement warranty.',
    action: { label: 'Contact WhatsApp Concierge', actionType: 'whatsapp' },
  },
];

/* =========================================================================
   LOCAL RAG RETRIEVAL ENGINE
   Evaluates user query relevance, extracts top chunks & synthesizes answer
   ========================================================================= */
export interface RagQueryResult {
  answer: string;
  citations: string[];
  matchedDoc?: KnowledgeDoc;
  confidence: number;
}

export function performRagRetrieval(userQuery: string): RagQueryResult {
  const normalized = userQuery.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = normalized.split(/\s+/).filter((t) => t.length > 2);

  // Score each document
  const scoredDocs = KNOWLEDGE_BASE.map((doc) => {
    let score = 0;
    // Check keyword hits
    for (const kw of doc.keywords) {
      if (normalized.includes(kw)) score += 3;
      for (const token of tokens) {
        if (kw.includes(token)) score += 1.5;
      }
    }
    // Check content token hits
    const contentLower = doc.content.toLowerCase();
    for (const token of tokens) {
      if (contentLower.includes(token)) score += 1;
    }
    return { doc, score };
  });

  scoredDocs.sort((a, b) => b.score - a.score);
  const best = scoredDocs[0];

  if (!best || best.score < 2) {
    // Graceful fallback grounded in general brand truth
    return {
      answer: `Thank you for reaching out to the Aurelle Concierge. The Aurelle Touchless System is an architectural wall-mounted bathroom hygiene set featuring an anodized aluminum wand and single-use self-foaming pods. We deliver across India in 2–3 days with Free COD. For your specific question, you can speak directly with our team on WhatsApp or select a curated topic below.`,
      citations: ['Aurelle Master Specification v2.6', 'Logistics SLA 2026'],
      confidence: 0.5,
    };
  }

  // Synthesize response from retrieved knowledge chunk
  const matched = best.doc;
  const secondary = scoredDocs[1]?.score > 3 ? scoredDocs[1].doc : null;

  let answerText = matched.content;
  if (secondary && secondary.id !== matched.id) {
    answerText += `\n\nAdditionally, regarding ${secondary.title.toLowerCase()}: ${secondary.content.slice(0, 140)}...`;
  }

  const citations = [matched.citation];
  if (secondary && secondary.citation) citations.push(secondary.citation);

  return {
    answer: answerText,
    citations,
    matchedDoc: matched,
    confidence: Math.min(0.98, 0.65 + best.score * 0.05),
  };
}

/* =========================================================================
   EMBEDDED AI SEARCH BAR (Suvaam "Ask Jify" Rival Equivalent)
   Placed directly inside Product Details for immediate customer Q&A
   ========================================================================= */
interface EmbeddedAiSearchBarProps {
  onAskQuestion: (question: string) => void;
  className?: string;
}

export const EmbeddedAiSearchBar: React.FC<EmbeddedAiSearchBarProps> = ({ onAskQuestion }) => {
  const [query, setQuery] = useState('');
  const [activeAnswer, setActiveAnswer] = useState<RagQueryResult | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const sampleQuestions = [
    'Will it scratch my Toto toilet?',
    'Is Cash on Delivery available?',
    'How do refill subscriptions work?',
    'Can I mount it without drilling?',
  ];

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setIsAnswering(true);
    setTimeout(() => {
      const res = performRagRetrieval(q);
      setActiveAnswer(res);
      setIsAnswering(false);
    }, 400);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(200, 167, 90, 0.08) 0%, rgba(245, 245, 248, 0.95) 100%)',
        border: '1px solid rgba(200, 167, 90, 0.35)',
        borderRadius: '16px',
        padding: '18px 20px',
        margin: '24px 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '7px',
              background: 'var(--color-graphite)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-champagne)',
            }}
          >
            <Sparkles size={14} color="#C8A75A" />
          </div>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-graphite)', letterSpacing: '0.02em' }}>
              ASK AURELLE AI CONCIERGE
            </span>
            <span style={{ fontSize: '11px', color: 'var(--color-lilac-deep)', marginLeft: '8px' }}>
              • Grounded in 7 Lab Dossiers
            </span>
          </div>
        </div>
        <span
          style={{
            fontSize: '10px',
            background: 'rgba(47, 125, 107, 0.1)',
            color: '#2F7D6B',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '9999px',
            border: '1px solid rgba(47, 125, 107, 0.25)',
          }}
        >
          RAG ACTIVE
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Ask about surface safety, Toto compatibility, refills, or COD..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              fontSize: '13px',
              background: '#FFFFFF',
              color: 'var(--color-graphite)',
              outline: 'none',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isAnswering}
          style={{
            background: 'var(--color-graphite)',
            color: '#FFFFFF',
            border: '1px solid var(--color-champagne)',
            borderRadius: '10px',
            padding: '0 16px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'var(--transition)',
          }}
        >
          <span>Ask</span>
          <CornerDownLeft size={13} color="#C8A75A" />
        </button>
      </form>

      {/* Suggested Quick Question Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: activeAnswer ? '14px' : '0' }}>
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(q);
              handleSearch(q);
            }}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(28, 28, 38, 0.08)',
              borderRadius: '9999px',
              padding: '4px 10px',
              fontSize: '11px',
              color: 'var(--color-graphite)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'var(--transition)',
            }}
          >
            <HelpCircle size={10} color="#C8A75A" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* RAG Answer Display Box */}
      {isAnswering && (
        <div style={{ padding: '14px', textAlign: 'center', fontSize: '13px', color: 'var(--color-lilac-deep)' }}>
          <Sparkles size={16} color="#C8A75A" className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
          Retrieving verified ceramic & chemistry specifications...
        </div>
      )}

      {activeAnswer && !isAnswering && (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid rgba(200, 167, 90, 0.3)',
            padding: '14px 16px',
            marginTop: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Verified Response • {(activeAnswer.confidence * 100).toFixed(0)}% Confidence
            </span>
            <button
              onClick={() => setActiveAnswer(null)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
            >
              <X size={14} />
            </button>
          </div>

          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-graphite)', margin: '0 0 10px 0' }}>
            {activeAnswer.answer}
          </p>

          {/* Citations */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', paddingTop: '8px', borderTop: '1px solid rgba(28,28,38,0.06)' }}>
            <span style={{ fontSize: '10px', color: 'var(--color-lilac-deep)', fontWeight: 600 }}>Sources:</span>
            {activeAnswer.citations.map((cite, i) => (
              <span
                key={i}
                style={{
                  fontSize: '10px',
                  background: 'rgba(28, 28, 38, 0.04)',
                  color: 'var(--color-graphite)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: '1px solid rgba(28,28,38,0.08)',
                }}
              >
                <FileText size={10} color="#C8A75A" />
                {cite}
              </span>
            ))}
          </div>

          {/* Action Trigger */}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => onAskQuestion(query || 'Product inquiry')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-champagne)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Continue conversation in Concierge Drawer</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   FLOATING RAG AI CONCIERGE CHATBOT
   Drawer with streaming conversation, domain citations, and quick actions
   ========================================================================= */
interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: string[];
  action?: KnowledgeDoc['action'];
  timestamp: string;
}

interface RagChatbotProps {
  onOpenCart?: () => void;
  onExplore3D?: () => void;
  onOpenVip?: () => void;
  onOpenProduct?: () => void;
  initialOpenQuery?: string | null;
  onClearInitialQuery?: () => void;
}

export const RagChatbot: React.FC<RagChatbotProps> = ({
  onOpenCart,
  onExplore3D,
  onOpenVip,
  onOpenProduct,
  initialOpenQuery,
  onClearInitialQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Welcome to Aurelle Privé Concierge. I am your AI hygiene & ceramic specialist, powered by our Retrieval-Augmented Generation (RAG) knowledge engine.\n\nYou can ask me anything regarding porcelain surface safety, Blue Dart COD delivery across 24,000+ PINs, our water-activated chemistry, or membership privileges.`,
      citations: ['Aurelle Master Specification v2.6', 'Ceramic Lab Safety Bulletin'],
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  // Handle external query triggers
  useEffect(() => {
    if (initialOpenQuery) {
      setIsOpen(true);
      handleSend(initialOpenQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialOpenQuery]);

  const handleSend = (text: string) => {
    const userText = text.trim();
    if (!userText) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate RAG Retrieval & Synthesis Pipeline
    setTimeout(() => {
      const ragResult = performRagRetrieval(userText);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: ragResult.answer,
        citations: ragResult.citations,
        action: ragResult.matchedDoc?.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (actionType: string) => {
    if (actionType === 'cart' && onOpenCart) onOpenCart();
    if (actionType === 'vip' && onOpenVip) onOpenVip();
    if (actionType === 'product') {
      if (onOpenProduct) onOpenProduct();
      else if (onExplore3D) onExplore3D();
    }
    if (actionType === 'whatsapp') {
      window.open('https://wa.me/919876543210?text=Hi%20Aurelle%20Concierge,%20I%20have%20a%20question%20regarding%20the%20touchless%20wand', '_blank');
    }
  };

  const quickChips = [
    'Will it scratch Toto / Kohler?',
    'Is COD free across India?',
    'Auto-Ship Refill Program',
    'How do I claim ₹200 VIP discount?',
  ];

  return (
    <>
      {/* Floating Concierge Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`aurelle-rag-launcher-btn ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 990,
          background: 'var(--color-graphite)',
          color: '#FFFFFF',
          border: '1.5px solid var(--color-champagne)',
          borderRadius: '9999px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-label="Open AI Concierge Chatbot"
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C8A75A 0%, #9B7830 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#EF4444',
                border: '2px solid var(--color-graphite)',
              }}
            />
          )}
        </div>
        <div className="aurelle-rag-launcher-text" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.02em', color: '#FFFFFF' }}>
            AURELLE AI
          </span>
          <span style={{ fontSize: '10px', color: 'var(--color-champagne)', fontWeight: 600 }}>
            RAG Concierge
          </span>
        </div>
      </button>

      {/* Slide-Up Chatbot Drawer */}
      {isOpen && (
        <div
          className="aurelle-rag-drawer"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '28px',
            width: 'min(420px, calc(100vw - 32px))',
            height: 'min(580px, calc(100vh - 120px))',
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(200, 167, 90, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'var(--color-graphite)',
              color: '#FFFFFF',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(200, 167, 90, 0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #C8A75A 0%, #9B7830 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(200, 167, 90, 0.3)',
                }}
              >
                <Sparkles size={18} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, letterSpacing: '0.02em', color: '#FFFFFF' }}>
                    Aurelle Concierge
                  </h3>
                  <span
                    style={{
                      fontSize: '9px',
                      background: 'rgba(200, 167, 90, 0.2)',
                      color: 'var(--color-champagne)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 800,
                      border: '1px solid rgba(200, 167, 90, 0.4)',
                    }}
                  >
                    RAG v2.6
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                  Grounded in 7 Technical & Logistics Dossiers
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
              }}
              aria-label="Close Chatbot"
            >
              <X size={16} />
            </button>
          </div>

          {/* Conversation Stream */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: '#F9F9FB',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                }}
              >
                <div
                  style={{
                    background: msg.sender === 'user' ? 'var(--color-graphite)' : '#FFFFFF',
                    color: msg.sender === 'user' ? '#FFFFFF' : 'var(--color-graphite)',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    padding: '12px 14px',
                    fontSize: '13px',
                    lineHeight: 1.55,
                    border: msg.sender === 'user' ? 'none' : '1px solid rgba(28, 28, 38, 0.08)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.text}

                  {/* Grounded Citation Badges */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div
                      style={{
                        marginTop: '10px',
                        paddingTop: '8px',
                        borderTop: '1px solid rgba(28, 28, 38, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>
                        Sources:
                      </span>
                      {msg.citations.map((c, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '10px',
                            color: 'var(--color-champagne)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 700,
                          }}
                        >
                          <FileText size={10} />
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interactive Action CTA */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action!.actionType)}
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        background: 'linear-gradient(135deg, rgba(200, 167, 90, 0.15) 0%, rgba(200, 167, 90, 0.05) 100%)',
                        border: '1px solid var(--color-champagne)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--color-graphite)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                      }}
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight size={13} color="#C8A75A" />
                    </button>
                  )}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#9CA3AF',
                    marginTop: '4px',
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                    padding: '0 4px',
                  }}
                >
                  {msg.timestamp}
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: '#FFFFFF',
                  border: '1px solid rgba(28,28,38,0.08)',
                  borderRadius: '16px 16px 16px 2px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: 'var(--color-lilac-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={13} color="#C8A75A" className="animate-spin" />
                <span>Searching technical corpus & synthesizing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div
            style={{
              padding: '8px 14px',
              background: '#FFFFFF',
              borderTop: '1px solid rgba(28,28,38,0.06)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                style={{
                  whiteSpace: 'nowrap',
                  background: 'rgba(245, 245, 248, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '9999px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  color: 'var(--color-graphite)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Query Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            style={{
              padding: '12px 16px',
              background: '#FFFFFF',
              borderTop: '1px solid rgba(28,28,38,0.06)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about Aurelle touchless system..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                outline: 'none',
                color: 'var(--color-graphite)',
              }}
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              style={{
                background: 'var(--color-graphite)',
                border: 'none',
                borderRadius: '10px',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputVal.trim() ? 'pointer' : 'default',
                opacity: inputVal.trim() ? 1 : 0.4,
                color: '#FFFFFF',
              }}
              aria-label="Send message"
            >
              <Send size={15} color="#C8A75A" />
            </button>
          </form>
        </div>
      )}

      {/* Responsive mobile positioning style */}
      <style>{`
        @media (max-width: 768px) {
          .aurelle-rag-launcher-btn {
            bottom: 20px !important;
            right: 16px !important;
            width: 44px !important;
            height: 44px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            justify-content: center !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
          }
          .aurelle-rag-launcher-btn.scrolled {
            bottom: calc(76px + env(safe-area-inset-bottom, 12px)) !important;
          }
          .aurelle-rag-launcher-text {
            display: none !important;
          }
          .aurelle-rag-drawer {
            bottom: 80px !important;
            right: 12px !important;
            left: 12px !important;
            width: calc(100vw - 24px) !important;
            max-width: none !important;
            height: calc(100vh - 150px) !important;
            max-height: 560px !important;
          }
        }
      `}</style>
    </>
  );
};
