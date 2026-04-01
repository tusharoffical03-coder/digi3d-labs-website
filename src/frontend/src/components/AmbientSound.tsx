import { useRef, useState } from "react";

export default function AmbientSound() {
  const [active, setActive] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscRefs = useRef<OscillatorNode[]>([]);

  const toggle = () => {
    if (!active) {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      const freqs = [60, 120, 180];
      oscRefs.current = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        const g = ctx.createGain();
        g.gain.value = freq === 60 ? 1 : freq === 120 ? 0.4 : 0.2;
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        return osc;
      });

      setActive(true);
    } else {
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(
          0,
          ctxRef.current.currentTime + 0.8,
        );
        setTimeout(() => {
          for (const o of oscRefs.current) {
            o.stop();
          }
          ctxRef.current?.close();
          ctxRef.current = null;
        }, 900);
      }
      setActive(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={active ? "Mute ambient sound" : "Play ambient sound"}
      aria-label={active ? "Mute ambient sound" : "Play ambient sound"}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 1000,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(10,14,26,0.7)",
        border: `1.5px solid ${active ? "rgba(0,229,255,0.6)" : "rgba(255,255,255,0.15)"}`,
        backdropFilter: "blur(12px)",
        color: active ? "#00E5FF" : "#9AA8C7",
        cursor: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        boxShadow: active ? "0 0 20px rgba(0,229,255,0.3)" : "none",
        animation: active ? "pulse-sound 1.5s ease-in-out infinite" : "none",
      }}
    >
      {active ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <title>Sound on</title>
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <title>Sound off</title>
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
      )}
    </button>
  );
}
