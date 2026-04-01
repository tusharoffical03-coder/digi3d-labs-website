import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 200, suffix: "+", label: "Happy Clients", prefix: "" },
  { value: 50, suffix: "+", label: "3D Websites Built", prefix: "" },
  { value: 5, suffix: "Cr+", label: "Revenue Generated", prefix: "\u20b9" },
  { value: 4.9, suffix: "\u2605", label: "Average Rating", prefix: "" },
];

function useCountUp(
  target: number,
  active: boolean,
  duration = 1800,
  decimals = 0,
) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Number.parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration, decimals]);
  return count;
}

function StatCard({
  stat,
  active,
}: { stat: (typeof stats)[0]; active: boolean }) {
  const decimals = stat.value % 1 !== 0 ? 1 : 0;
  const count = useCountUp(stat.value, active, 1800, decimals);
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(0,229,255,0.15)",
        borderRadius: 16,
        padding: "2rem 1.5rem",
        backdropFilter: "blur(12px)",
        textAlign: "center",
        flex: "1 1 180px",
        minWidth: 160,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 0 24px rgba(0,229,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 40px rgba(0,229,255,0.18)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(0,229,255,0.4)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 24px rgba(0,229,255,0.06)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(0,229,255,0.15)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 900,
          background: "linear-gradient(135deg, #00E5FF, #8A46FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: "0.5rem",
          textShadow: "none",
          filter: "drop-shadow(0 0 12px rgba(0,229,255,0.5))",
        }}
      >
        {stat.prefix}
        {decimals ? count.toFixed(1) : Math.floor(count)}
        {stat.suffix}
      </div>
      <div style={{ color: "#9AA8C7", fontSize: "0.9rem", fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="stats"
      style={{
        padding: "5rem 1.5rem",
        background:
          "linear-gradient(180deg, rgba(5,9,20,0) 0%, rgba(138,70,255,0.04) 50%, rgba(5,9,20,0) 100%)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 20,
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              color: "#00E5FF",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            By The Numbers
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#EAF1FF",
              margin: 0,
            }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00E5FF, #FF4FD8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Impact in Numbers
            </span>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
