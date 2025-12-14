import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  options?: ChatOption[];
}

interface ChatOption {
  label: string;
  value: string;
  action?: "booking" | "navigate";
}

interface BookingForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_OPTIONS: ChatOption[] = [
  { label: "Learn about our solutions", value: "solutions" },
  { label: "See pricing information", value: "pricing" },
  { label: "Book a consultation", value: "booking", action: "booking" },
  { label: "Talk to a human", value: "human" },
];

const CHATBOT_RESPONSES: Record<string, { content: string; options?: ChatOption[] }> = {
  solutions: {
    content: "We offer comprehensive AI automation for WhatsApp, Facebook, Instagram, Email, and Website chat. Which channel interests you most?",
    options: [
      { label: "WhatsApp Automation", value: "whatsapp" },
      { label: "Email Automation", value: "email" },
      { label: "Multi-channel solution", value: "multichannel" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  pricing: {
    content: "Our pricing is customized based on your scale and requirements. Enterprise solutions typically range based on message volume and integration complexity. Would you like a personalized quote?",
    options: [
      { label: "Get a custom quote", value: "booking", action: "booking" },
      { label: "Learn more about ROI", value: "roi" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  whatsapp: {
    content: "Our WhatsApp automation handles thousands of simultaneous conversations with human-like responses. Average response time drops to under 3 seconds while maintaining 95%+ customer satisfaction.",
    options: [
      { label: "See case studies", value: "cases" },
      { label: "Book a demo", value: "booking", action: "booking" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  email: {
    content: "Our email automation intelligently categorizes, prioritizes, and responds to emails. It learns your tone and handles up to 80% of inquiries without human intervention.",
    options: [
      { label: "Learn about integrations", value: "integrations" },
      { label: "Get started", value: "booking", action: "booking" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  multichannel: {
    content: "Our unified platform integrates all channels into one dashboard. Customers can start on WhatsApp and continue via email seamlessly - the AI maintains full context.",
    options: [
      { label: "Schedule a demo", value: "booking", action: "booking" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  roi: {
    content: "On average, our clients see 70% cost reduction and 85% faster response times. Use our calculator above to estimate your specific savings based on your current volume.",
    options: [
      { label: "Get my custom ROI report", value: "booking", action: "booking" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  cases: {
    content: "Our clients include Fortune 500 companies and fast-growing startups. A recent retail client reduced support costs by $2.3M annually while improving CSAT by 15 points.",
    options: [
      { label: "Start my transformation", value: "booking", action: "booking" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  integrations: {
    content: "We integrate with Gmail, Outlook, Zendesk, Salesforce, HubSpot, and 50+ other platforms. Our API also allows custom integrations.",
    options: [
      { label: "Book integration consultation", value: "booking", action: "booking" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  human: {
    content: "I'll connect you with our team! Please book a consultation and one of our specialists will reach out within 24 hours.",
    options: [
      { label: "Book consultation now", value: "booking", action: "booking" },
      { label: "Back to main menu", value: "main" },
    ],
  },
  main: {
    content: "How can I help you today?",
    options: INITIAL_OPTIONS,
  },
};

const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Mira, your AI Automation Specialist. How can I help you transform your customer operations today?",
      options: INITIAL_OPTIONS,
    },
  ]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showBookingForm]);

  const handleOptionClick = (option: ChatOption) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: option.label,
    };
    setMessages((prev) => [...prev, userMessage]);

    if (option.action === "booking") {
      setShowBookingForm(true);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Great choice! Please fill out the form below and we'll get back to you within 24 hours with available time slots.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    // Get response
    const response = CHATBOT_RESPONSES[option.value];
    if (response) {
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.content,
          options: response.options,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }, 500);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowBookingForm(false);
    setIsSubmitting(false);
    setBookingForm({ name: "", email: "", company: "", message: "" });

    const confirmationMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Thanks, ${bookingForm.name}! We've received your request. Our team will email you at ${bookingForm.email} shortly with available time slots for your consultation.`,
      options: [
        { label: "Ask another question", value: "main" },
      ],
    };
    setMessages((prev) => [...prev, confirmationMessage]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[420px] z-50 bg-card border border-border rounded-2xl shadow-elevated overflow-hidden flex flex-col"
            style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="bg-gradient-gold px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <i className="fas fa-robot text-secondary text-lg" />
                </div>
                <div>
                  <div className="font-semibold text-secondary">Mira</div>
                  <div className="text-xs text-secondary/70">AI Automation Specialist</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <i className="fas fa-times text-secondary" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Options */}
                    {message.options && message.role === "assistant" && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left px-3 py-2 text-sm bg-card hover:bg-accent rounded-lg border border-border transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Booking Form */}
              {showBookingForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted rounded-2xl p-4"
                >
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={bookingForm.company}
                      onChange={(e) => setBookingForm((prev) => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <textarea
                      placeholder="What would you like to discuss?"
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none h-20"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-gold text-secondary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2" />
                          Request Consultation
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border flex-shrink-0">
              <p className="text-xs text-center text-muted-foreground">
                Powered by LawGlitch AI
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;
