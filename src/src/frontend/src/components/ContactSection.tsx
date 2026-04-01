import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { memo, useRef, useState } from "react";
import type * as THREE from "three";
import { useScrollReveal } from "../hooks/useScrollReveal";

const services = [
  "Website Design (3D+AI)",
  "Google Ads Management",
  "Facebook Ads",
  "Funnel Design",
  "SEO Optimization",
  "Full Growth Package",
];

const contactItems = [
  {
    icon: "📧",
    label: "Email Us",
    value: "hello@digi3dlabs.com",
    color: "#00E5FF",
  },
  { icon: "📞", label: "Call Us", value: "+91 99999 99999", color: "#8A46FF" },
  {
    icon: "📍",
    label: "Location",
    value: "Mumbai, Maharashtra, India",
    color: "#FF4FD8",
  },
];

function PortalVortex() {
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const speed = 0.3 + i * 0.15;
      const dir = i % 2 === 0 ? 1 : -1;
      ring.rotation.z = t * speed * dir;
      ring.rotation.x = Math.sin(t * 0.2 + i * 0.5) * 0.3;
      const scale = 1 + Math.sin(t * 0.5 + i * 0.8) * 0.03;
      ring.scale.setScalar(scale);
    });
  });

  const colors = [
    "#00E5FF",
    "#8A46FF",
    "#FF4FD8",
    "#00BFFF",
    "#8A46FF",
    "#00E5FF",
  ];

  return (
    <group>
      {colors.map((color, i) => (
        <mesh
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          key={i}
          ref={(el) => {
            rings.current[i] = el;
          }}
          rotation={[Math.PI / 2 + i * 0.1, 0, 0]}
        >
          <torusGeometry args={[0.6 + i * 0.35, 0.04, 6, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.7 - i * 0.08}
          />
        </mesh>
      ))}
      {/* Center glow sphere */}
      <mesh>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

const PortalCanvas = memo(function PortalCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 1]}
      frameloop="always"
      style={{ width: "100%", height: "100%" }}
    >
      <PortalVortex />
    </Canvas>
  );
});

export default function ContactSection() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "0.75rem 1rem",
    color: "#EAF1FF",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="fade-in-up"
      style={{ padding: "100px 1.5rem" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
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
            Get In Touch
          </div>
          <h2 className="section-title">
            Start Your <span className="neon-text-cyan">3D Journey</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem" }}>
            Book a free strategy call. No pressure, just results-focused
            planning.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "stretch",
          }}
          className="contact-grid"
        >
          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="glass-card"
              style={{
                padding: "2.5rem",
                height: "100%",
              }}
            >
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "3rem 1rem" }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    🚀
                  </div>
                  <h3
                    style={{
                      color: "#00E5FF",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "#9AA8C7" }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <h3
                    style={{
                      color: "#EAF1FF",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Tell Us About Your Project
                  </h3>
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    data-ocid="contact.input"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                  <input
                    name="phone"
                    placeholder="WhatsApp Number"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "none" }}
                    data-ocid="contact.select"
                  >
                    <option value="" style={{ background: "#0a0e1a" }}>
                      Select a Service
                    </option>
                    {services.map((s) => (
                      <option
                        key={s}
                        value={s}
                        style={{ background: "#0a0e1a" }}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    placeholder="Tell us about your goals..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                    data-ocid="contact.textarea"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    data-ocid="contact.submit_button"
                    style={{
                      padding: "0.875rem",
                      background: submitting
                        ? "rgba(0,229,255,0.2)"
                        : "linear-gradient(135deg, #00E5FF, #8A46FF)",
                      border: "none",
                      borderRadius: 9999,
                      color: submitting ? "#9AA8C7" : "#050914",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: submitting ? "wait" : "none",
                      transition: "all 0.3s ease",
                      boxShadow: submitting
                        ? "none"
                        : "0 0 25px rgba(0,229,255,0.35)",
                    }}
                  >
                    {submitting ? "Sending..." : "Send Message 🚀"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Portal + Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ position: "relative", minHeight: 400 }}
          >
            {/* 3D Portal Background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                overflow: "hidden",
                zIndex: 0,
              }}
            >
              <PortalCanvas />
            </div>

            {/* Contact Info floating above */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <h3
                style={{
                  color: "#EAF1FF",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  marginBottom: "0.5rem",
                  textShadow: "0 0 20px rgba(0,229,255,0.3)",
                }}
              >
                Ready to Enter the Multiverse?
              </h3>
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="glass-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "1rem 1.25rem",
                    background: "rgba(5,9,20,0.7)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: item.color,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        color: "#EAF1FF",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.primary_button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  padding: "1rem 1.5rem",
                  borderRadius: 9999,
                  background: "linear-gradient(135deg, #25D366, #1EB954)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 0 25px rgba(37,211,102,0.35)",
                  transition: "all 0.3s ease",
                  cursor: "none",
                  marginTop: 8,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden="true"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
