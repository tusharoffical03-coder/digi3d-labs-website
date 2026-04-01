import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Sender = "user" | "bot";
type Step =
  | "welcome"
  | "service"
  | "budget"
  | "name"
  | "phone"
  | "done"
  | "freeform";

interface Message {
  id: number;
  text: string;
  sender: Sender;
  options?: string[];
}

interface Lead {
  name: string;
  service: string;
  budget: string;
  phone: string;
}

const WHATSAPP_NUMBER = "919XXXXXXXXX"; // Replace with real number

const SERVICE_OPTIONS = [
  "🎨 Website Design",
  "📢 Google/Facebook Ads",
  "🚀 Both Services",
];
const BUDGET_OPTIONS = ["💰 5k–10k", "💎 10k–25k", "🏆 25k+"];

const SMART_REPLIES: { keywords: string[]; reply: string }[] = [
  {
    keywords: [
      "price",
      "cost",
      "kitna",
      "budget",
      "rate",
      "package",
      "paisa",
      "rupee",
      "pricing",
    ],
    reply:
      "Our packages:\n💫 Starter — ₹15,000\n⚡ Professional — ₹35,000\n🚀 Enterprise — ₹75,000\n👑 Premium — ₹1,20,000+\n\nShare your budget and we'll find the perfect fit!",
  },
  {
    keywords: ["time", "duration", "delivery", "deadline", "kab", "kitne din"],
    reply:
      "Delivery is typically in 3–7 days for standard projects. Complex builds may take up to 14 days. Want to discuss your timeline?",
  },
  {
    keywords: [
      "service",
      "3d",
      "website",
      "ar",
      "vr",
      "motion",
      "branding",
      "marketing",
      "design",
      "ads",
    ],
    reply:
      "We offer:\n🎨 Website Design\n📢 Google/Facebook Ads\n🚀 3D Design & AR/VR\n✨ Brand Identity\n📊 Digital Marketing\n\nWhich service interests you most?",
  },
  {
    keywords: ["portfolio", "work", "projects", "kaam", "examples", "sample"],
    reply:
      "We've completed 50+ premium projects for gaming studios, luxury brands & tech startups. Check the Portfolio section for samples!",
  },
  {
    keywords: ["contact", "call", "phone", "email", "reach", "baat", "milna"],
    reply: `You can reach us on WhatsApp: +91-XXXXXXXXXX\nEmail: hello@digi3dlabs.com\n\nOr just share your details here and we'll call you back!`,
  },
  {
    keywords: ["about", "team", "kaun", "who", "company", "aap log"],
    reply:
      "Digi3D Labs is a premium digital agency with 5+ years experience creating cutting-edge 3D & digital experiences. 50+ happy clients and counting! 🚀",
  },
];

function getSmartReply(input: string): string | null {
  const lower = input.toLowerCase();
  for (const { keywords, reply } of SMART_REPLIES) {
    if (keywords.some((kw) => lower.includes(kw))) return reply;
  }
  return null;
}

let _id = 0;
const uid = () => ++_id;

const WELCOME_MSG: Message = {
  id: uid(),
  text: "Hi 👋 Welcome! How can I help you today?",
  sender: "bot",
  options: SERVICE_OPTIONS,
};

function sendLeadToWhatsApp(lead: Lead) {
  const msg = encodeURIComponent(
    `New Lead from Digi3D Labs Website!\n\nName: ${lead.name}\nService: ${lead.service}\nBudget: ${lead.budget}\nWhatsApp: ${lead.phone}`,
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>("service");
  const [lead, setLead] = useState<Partial<Lead>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, typing]);

  function botReply(text: string, options?: string[], nextStep?: Step) {
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: uid(), text, sender: "bot", options },
        ]);
        if (nextStep) setStep(nextStep);
      },
      700 + Math.random() * 300,
    );
  }

  function handleOption(option: string) {
    const userMsg: Message = { id: uid(), text: option, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    if (step === "service") {
      const svc = option.replace(/^[^ ]+ /, "");
      setLead((l) => ({ ...l, service: svc }));
      botReply(
        "Great choice! 💡 What is your budget range?",
        BUDGET_OPTIONS,
        "budget",
      );
    } else if (step === "budget") {
      const bgt = option.replace(/^[^ ]+ /, "");
      setLead((l) => ({ ...l, budget: bgt }));
      botReply("Awesome! 😊 What's your name?", undefined, "name");
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const userMsg: Message = { id: uid(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    if (step === "name") {
      setLead((l) => ({ ...l, name: text }));
      botReply(
        `Nice to meet you, ${text}! 📱 Can you share your WhatsApp number so our team can contact you?`,
        undefined,
        "phone",
      );
      return;
    }

    if (step === "phone") {
      const digits = text.replace(/\D/g, "");
      if (digits.length < 7) {
        botReply("Please enter a valid WhatsApp number (e.g. 9876543210).");
        return;
      }
      const finalLead = { ...lead, phone: text } as Lead;
      setLead(finalLead);
      setStep("done");
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            text: "✅ Thanks! Our team will contact you shortly on WhatsApp. You can also click the button below to reach us directly.",
            sender: "bot",
          },
        ]);
        sendLeadToWhatsApp(finalLead);
      }, 800);
      return;
    }

    // freeform / smart replies
    const smart = getSmartReply(text);
    if (smart) {
      botReply(smart);
      return;
    }

    // guide back to flow if step is pending
    if (step === "service") {
      botReply(
        "Sorry, I didn't get that. Please choose an option or ask your question.",
        SERVICE_OPTIONS,
      );
      return;
    }
    if (step === "budget") {
      botReply(
        "Sorry, I didn't get that. Please choose a budget range.",
        BUDGET_OPTIONS,
      );
      return;
    }

    botReply(
      "Sorry, I didn't get that. Please choose an option or ask your question.",
      step === "done" ? undefined : SERVICE_OPTIONS,
    );
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const whatsappDirectURL = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="fixed bottom-6 right-4 z-[9999] flex flex-col items-end gap-3 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="chatbot.panel"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{
              width: "min(340px, calc(100vw - 32px))",
              maxHeight: "min(560px, calc(100dvh - 100px))",
              background: "rgba(5, 5, 22, 0.94)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,255,255,0.22)",
              borderRadius: "20px",
              boxShadow:
                "0 0 40px rgba(0,255,255,0.14), 0 0 80px rgba(139,92,246,0.1), 0 20px 60px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(139,92,246,0.2))",
                borderBottom: "1px solid rgba(0,255,255,0.18)",
                padding: "13px 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00FFFF, #8B5CF6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 14px rgba(0,255,255,0.55)",
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={17} color="#000" />
                </div>
                <div>
                  <div
                    style={{
                      color: "#00FFFF",
                      fontWeight: 700,
                      fontSize: "13.5px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Digi3D Sales Assistant
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#22c55e",
                        display: "block",
                        boxShadow: "0 0 6px #22c55e",
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "11px",
                      }}
                    >
                      Online • Replies instantly
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                data-ocid="chatbot.close_button"
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "8px",
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0,255,255,0.18) transparent",
              }}
            >
              {messages.map((msg) => (
                <div key={msg.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "84%",
                        padding: "9px 13px",
                        borderRadius:
                          msg.sender === "user"
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px",
                        fontSize: "13px",
                        lineHeight: "1.55",
                        whiteSpace: "pre-line",
                        ...(msg.sender === "user"
                          ? {
                              background:
                                "linear-gradient(135deg, #00FFFF, #0ea5e9)",
                              color: "#000",
                              fontWeight: 500,
                              boxShadow: "0 0 12px rgba(0,255,255,0.28)",
                            }
                          : {
                              background: "rgba(255,255,255,0.07)",
                              color: "rgba(255,255,255,0.9)",
                              border: "1px solid rgba(139,92,246,0.22)",
                              boxShadow: "0 0 10px rgba(139,92,246,0.08)",
                            }),
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>

                  {/* Option buttons */}
                  {msg.options && msg.sender === "bot" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        marginTop: 8,
                        paddingLeft: 4,
                      }}
                    >
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleOption(opt)}
                          disabled={
                            step === "done" ||
                            (step !== "service" && step !== "budget")
                          }
                          style={{
                            background: "rgba(0,255,255,0.08)",
                            border: "1px solid rgba(0,255,255,0.3)",
                            borderRadius: "10px",
                            padding: "7px 12px",
                            color: "#00FFFF",
                            fontSize: "12.5px",
                            cursor: "pointer",
                            textAlign: "left",
                            fontWeight: 500,
                            transition: "all 0.18s",
                            opacity: step === "done" ? 0.4 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (step !== "done") {
                              e.currentTarget.style.background =
                                "rgba(0,255,255,0.18)";
                              e.currentTarget.style.boxShadow =
                                "0 0 10px rgba(0,255,255,0.25)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "rgba(0,255,255,0.08)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    data-ocid="chatbot.loading_state"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: "16px 16px 16px 4px",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(139,92,246,0.22)",
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 0.55,
                            delay: i * 0.14,
                          }}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "#8B5CF6",
                            display: "block",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* WhatsApp CTA after done */}
              {step === "done" && (
                <motion.a
                  href={whatsappDirectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    borderRadius: "12px",
                    padding: "10px",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "13px",
                    boxShadow: "0 0 18px rgba(37,211,102,0.35)",
                    marginTop: 4,
                  }}
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </motion.a>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "10px 12px",
                borderTop: "1px solid rgba(0,255,255,0.1)",
                display: "flex",
                gap: 8,
                background: "rgba(0,0,0,0.35)",
                flexShrink: 0,
              }}
            >
              <input
                data-ocid="chatbot.input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={
                  step === "name"
                    ? "Enter your name..."
                    : step === "phone"
                      ? "Enter WhatsApp number..."
                      : step === "done"
                        ? "Ask anything..."
                        : "Type your question..."
                }
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  borderRadius: "12px",
                  padding: "9px 13px",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  minWidth: 0,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,255,255,0.55)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,255,255,0.2)";
                }}
              />
              <button
                type="button"
                data-ocid="chatbot.submit_button"
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "12px",
                  border: "none",
                  flexShrink: 0,
                  background: input.trim()
                    ? "linear-gradient(135deg, #00FFFF, #8B5CF6)"
                    : "rgba(255,255,255,0.08)",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: input.trim()
                    ? "0 0 14px rgba(0,255,255,0.38)"
                    : "none",
                  transition: "all 0.2s",
                }}
              >
                <Send
                  size={15}
                  color={input.trim() ? "#000" : "rgba(255,255,255,0.28)"}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        type="button"
        data-ocid="chatbot.open_modal_button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #00FFFF, #8B5CF6)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 0 22px rgba(0,255,255,0.5), 0 0 44px rgba(139,92,246,0.28)",
          position: "relative",
        }}
      >
        {!open && (
          <motion.span
            animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid #00FFFF",
              pointerEvents: "none",
            }}
          />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} color="#000" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Bot size={24} color="#000" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
