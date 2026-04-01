import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ACCENT_COLORS = ["#00E5FF", "#8A46FF", "#FF4FD8", "#00BFFF"];

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  initials: string;
  color: string;
  review: string;
  rating: number;
}

const hardcodedTestimonials: Testimonial[] = [
  {
    id: "rs",
    name: "Rahul Sharma",
    company: "TechVenture India",
    role: "Founder & CEO",
    initials: "RS",
    color: "#00E5FF",
    review:
      "Digi3D Labs transformed our online presence completely. Our website now gets 3x more leads, and the 3D design blows visitors away. ROI has been incredible!",
    rating: 5,
  },
  {
    id: "pm",
    name: "Priya Mehta",
    company: "StyleCraft Boutique",
    role: "Business Owner",
    initials: "PM",
    color: "#8A46FF",
    review:
      "The Google Ads campaign they ran for us brought ₹40 lakhs in sales in just 3 months. Their funnel design is pure genius. Highly recommend!",
    rating: 5,
  },
  {
    id: "ak",
    name: "Arjun Kapoor",
    company: "RealEstate360",
    role: "Marketing Head",
    initials: "AK",
    color: "#FF4FD8",
    review:
      "We've worked with 5 agencies before. None came close to Digi3D Labs. The 3D website they built for us is a conversion machine. Our cost per lead dropped by 60%.",
    rating: 5,
  },
  {
    id: "sr",
    name: "Sneha Reddy",
    company: "FitLife Wellness",
    role: "Co-Founder",
    initials: "SR",
    color: "#00BFFF",
    review:
      "From SEO to Facebook Ads to an insane 3D landing page — they did it all. Our app downloads went from 500 to 12,000 per month. Worth every rupee!",
    rating: 5,
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// CSS 3D orbiting dot component
function OrbitingDots({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: -20,
        pointerEvents: "none",
        perspective: 500,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            animation: `orbit3d-${i} ${3 + i * 0.8}s linear infinite`,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}60`,
              opacity: 0.8,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes orbit3d-0 {
          0%   { transform: rotateY(0deg)   translateX(200px) rotateY(0deg); }
          100% { transform: rotateY(360deg) translateX(200px) rotateY(-360deg); }
        }
        @keyframes orbit3d-1 {
          0%   { transform: rotateX(60deg) rotateY(0deg)   translateX(180px) rotateY(0deg); }
          100% { transform: rotateX(60deg) rotateY(360deg) translateX(180px) rotateY(-360deg); }
        }
        @keyframes orbit3d-2 {
          0%   { transform: rotateX(-40deg) rotateY(0deg)   translateX(220px) rotateY(0deg); }
          100% { transform: rotateX(-40deg) rotateY(360deg) translateX(220px) rotateY(-360deg); }
        }
      `}</style>
    </div>
  );
}

function StarPicker({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          data-ocid="review.toggle"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            fontSize: "2rem",
            padding: 0,
            color:
              star <= (hovered || rating) ? "#FFD700" : "rgba(255,255,255,0.2)",
            filter:
              star <= (hovered || rating)
                ? "drop-shadow(0 0 8px #FFD70080)"
                : "none",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: star <= (hovered || rating) ? "scale(1.15)" : "scale(1)",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewModal({
  onClose,
  onSuccess,
  actor,
}: {
  onClose: () => void;
  onSuccess: (t: Testimonial) => void;
  actor: import("../backend").backendInterface | null;
}) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (reviewText.trim().length < 10) {
      setError("Review must be at least 10 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await actor?.submitReview(
        name.trim(),
        company.trim(),
        role.trim(),
        BigInt(rating),
        reviewText.trim(),
      );
      const colorIndex = Math.floor(Math.random() * ACCENT_COLORS.length);
      const newTestimonial: Testimonial = {
        id: `u-${Date.now()}`,
        name: name.trim(),
        company: company.trim() || "—",
        role: role.trim() || "Customer",
        initials: getInitials(name.trim()),
        color: ACCENT_COLORS[colorIndex],
        review: reviewText.trim(),
        rating,
      };
      onSuccess(newTestimonial);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,229,255,0.04)",
    border: "1px solid rgba(0,229,255,0.25)",
    borderRadius: 10,
    padding: "0.75rem 1rem",
    color: "#EAF1FF",
    fontSize: "0.95rem",
    outline: "none",
    transition:
      "border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxSizing: "border-box",
  };

  return (
    <div
      data-ocid="review.modal"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 9, 20, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{
          duration: 0.35,
          type: "spring",
          stiffness: 240,
          damping: 24,
        }}
        style={{
          background: "rgba(8, 14, 35, 0.95)",
          border: "1px solid rgba(0,229,255,0.3)",
          borderRadius: 20,
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: 520,
          boxShadow:
            "0 0 60px rgba(0,229,255,0.15), 0 0 0 1px rgba(0,229,255,0.08), 0 30px 80px rgba(0,0,0,0.7)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          data-ocid="review.close_button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,229,255,0.08)",
            border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00E5FF",
            cursor: "none",
            fontSize: "1.1rem",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          ✕
        </button>

        <h3
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#EAF1FF",
            marginBottom: "0.4rem",
          }}
        >
          Share Your Experience
        </h3>
        <p
          style={{
            textAlign: "center",
            color: "rgba(208,220,255,0.6)",
            fontSize: "0.875rem",
            marginBottom: "2rem",
          }}
        >
          Your review helps others discover Digi3D Labs
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          {/* Star rating */}
          <div>
            <p
              style={{
                display: "block",
                color: "rgba(208,220,255,0.7)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
                textAlign: "center",
                margin: "0 0 0.5rem",
              }}
            >
              Your Rating
            </p>
            <StarPicker rating={rating} onChange={setRating} />
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="review-name"
              style={{
                display: "block",
                color: "rgba(208,220,255,0.7)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              Your Name <span style={{ color: "#00E5FF" }}>*</span>
            </label>
            <input
              id="review-name"
              data-ocid="review.input"
              style={inputStyle}
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.7)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(0,229,255,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Company & Role — side by side */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
            }}
          >
            <div>
              <label
                htmlFor="review-company"
                style={{
                  display: "block",
                  color: "rgba(208,220,255,0.7)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Company
              </label>
              <input
                id="review-company"
                data-ocid="review.input"
                style={inputStyle}
                placeholder="e.g. TechVenture"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,229,255,0.7)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(0,229,255,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <div>
              <label
                htmlFor="review-role"
                style={{
                  display: "block",
                  color: "rgba(208,220,255,0.7)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Role
              </label>
              <input
                id="review-role"
                data-ocid="review.input"
                style={inputStyle}
                placeholder="e.g. Founder & CEO"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,229,255,0.7)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(0,229,255,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Review text */}
          <div>
            <label
              htmlFor="review-text"
              style={{
                display: "block",
                color: "rgba(208,220,255,0.7)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              Your Review <span style={{ color: "#00E5FF" }}>*</span>
            </label>
            <textarea
              id="review-text"
              data-ocid="review.textarea"
              style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
              placeholder="Tell us about your experience with Digi3D Labs..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.7)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(0,229,255,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              data-ocid="review.error_state"
              style={{
                background: "rgba(255,79,216,0.1)",
                border: "1px solid rgba(255,79,216,0.3)",
                borderRadius: 8,
                padding: "0.6rem 1rem",
                color: "#FF4FD8",
                fontSize: "0.875rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            data-ocid="review.submit_button"
            disabled={submitting}
            style={{
              padding: "0.9rem 2rem",
              borderRadius: 50,
              background: submitting
                ? "rgba(0,229,255,0.15)"
                : "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(138,70,255,0.15))",
              border: "1px solid rgba(0,229,255,0.5)",
              color: submitting ? "rgba(0,229,255,0.5)" : "#00E5FF",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: submitting ? "default" : "none",
              letterSpacing: "0.05em",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: submitting ? "none" : "0 0 20px rgba(0,229,255,0.25)",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              if (!submitting) {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(0,229,255,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.25)";
            }}
          >
            {submitting ? "Submitting..." : "✍ Submit Review"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function SuccessToast({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      data-ocid="review.success_state"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{
        duration: 0.35,
        type: "spring",
        stiffness: 220,
        damping: 22,
      }}
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        background: "rgba(8, 14, 35, 0.95)",
        border: "1px solid rgba(0,229,255,0.4)",
        borderRadius: 50,
        padding: "0.85rem 2rem",
        color: "#00E5FF",
        fontWeight: 700,
        fontSize: "0.95rem",
        boxShadow: "0 0 40px rgba(0,229,255,0.3), 0 20px 50px rgba(0,0,0,0.5)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      🎉 Thank you for your review!
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const { actor } = useActor();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    hardcodedTestimonials,
  );
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const ref = useScrollReveal();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load backend reviews on mount
  useEffect(() => {
    if (!actor) return;
    actor
      .getReviews()
      .then((reviews) => {
        if (!reviews.length) return;
        const mapped: Testimonial[] = reviews.map((r, i) => ({
          id: `backend-${i}-${Number(r.timestamp)}`,
          name: r.name,
          company: r.company || "—",
          role: r.role || "Customer",
          initials: getInitials(r.name),
          color: ACCENT_COLORS[i % ACCENT_COLORS.length],
          review: r.reviewText,
          rating: Number(r.rating),
        }));
        setTestimonials((prev) => [...prev, ...mapped]);
      })
      .catch(() => {
        /* silently ignore */
      });
  }, [actor]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testimonials.length]);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((p) => (p + 1) % testimonials.length),
      4000,
    );
  };

  const handleReviewSuccess = (newT: Testimonial) => {
    setTestimonials((prev) => [newT, ...prev]);
    setModalOpen(false);
    setActive(0);
    setShowToast(true);
  };

  const t = testimonials[active] ?? testimonials[0];
  const stars = "★".repeat(Math.max(1, Math.min(5, t.rating ?? 5)));

  return (
    <section
      id="testimonials"
      ref={ref}
      className="fade-in-up"
      style={{ padding: "100px 1.5rem" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: 9999,
              padding: "0.3rem 1rem",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#00E5FF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Client Stories
          </div>
          <h2 className="section-title">
            What Our <span className="neon-text-cyan">Clients Say</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          <OrbitingDots color={t.color} />

          {/* Glowing ring */}
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: 28,
              border: `2px solid ${t.color}40`,
              boxShadow: `0 0 30px ${t.color}20, inset 0 0 30px ${t.color}05`,
              pointerEvents: "none",
              animation: "pulseBorder 2s ease-in-out infinite",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, rotateY: -90, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              style={{ perspective: 1000 }}
            >
              <div
                className="glass-card"
                style={{
                  padding: "3rem 2.5rem",
                  textAlign: "center",
                  boxShadow: `0 0 40px ${t.color}20, 0 0 0 1px ${t.color}20, 0 20px 60px rgba(0,0,0,0.5)`,
                  border: `1px solid ${t.color}30`,
                }}
              >
                <div
                  style={{
                    marginBottom: "1.5rem",
                    color: "#FFD700",
                    fontSize: "1.4rem",
                    filter: "drop-shadow(0 0 4px #FFD70060)",
                    letterSpacing: 4,
                  }}
                >
                  {stars}
                </div>
                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.15rem)",
                    color: "#D0DCFF",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    maxWidth: 680,
                    margin: "0 auto 2rem",
                  }}
                >
                  &ldquo;{t.review}&rdquo;
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "#050914",
                      boxShadow: `0 0 16px ${t.color}50`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#EAF1FF",
                        fontSize: "1rem",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        color: t.color,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      {t.role} &middot; {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: "2rem",
          }}
        >
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              data-ocid="testimonials.toggle"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? "#00E5FF" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "none",
                transition: "all 0.35s ease",
                boxShadow:
                  i === active ? "0 0 10px rgba(0,229,255,0.6)" : "none",
              }}
            />
          ))}
        </div>

        {/* Leave a Review CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2.5rem",
          }}
        >
          <button
            type="button"
            data-ocid="review.open_modal_button"
            onClick={() => setModalOpen(true)}
            style={{
              padding: "0.85rem 2.2rem",
              borderRadius: 50,
              background:
                "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(138,70,255,0.1))",
              border: "1px solid rgba(0,229,255,0.45)",
              color: "#00E5FF",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "none",
              letterSpacing: "0.05em",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 0 20px rgba(0,229,255,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(0,229,255,0.45), 0 0 60px rgba(0,229,255,0.15)";
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.2)";
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.45)";
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>✍</span>
            Leave a Review
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ReviewModal
            onClose={() => setModalOpen(false)}
            onSuccess={handleReviewSuccess}
            actor={actor}
          />
        )}
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {showToast && <SuccessToast onDone={() => setShowToast(false)} />}
      </AnimatePresence>

      <style>{`
        @keyframes pulseBorder {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
