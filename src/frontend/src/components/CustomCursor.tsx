import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotScaleRef = useRef(1);

  useEffect(() => {
    if ("ontouchstart" in window) {
      document.body.classList.add("touch-device");
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) scale(${dotScaleRef.current})`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ringRef.current) {
        const scale = dotScaleRef.current > 1 ? 1.5 : 1;
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(${scale})`;
      }
      animId = requestAnimationFrame(animate);
    };

    const onInteractEnter = () => {
      dotScaleRef.current = 2;
      if (dotRef.current) {
        dotRef.current.style.boxShadow =
          "0 0 16px 4px rgba(0,229,255,1), 0 0 32px rgba(0,229,255,0.5)";
      }
    };

    const onInteractLeave = () => {
      dotScaleRef.current = 1;
      if (dotRef.current) {
        dotRef.current.style.boxShadow = "0 0 12px 3px rgba(0,229,255,0.8)";
      }
    };

    const attachListeners = () => {
      const interactives = document.querySelectorAll<HTMLElement>(
        "button, a, [role=button], input, textarea, select",
      );
      for (const el of interactives) {
        el.addEventListener("mouseenter", onInteractEnter);
        el.addEventListener("mouseleave", onInteractLeave);
      }
    };

    // Attach initially and on DOM mutations
    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#00E5FF",
          boxShadow: "0 0 12px 3px rgba(0,229,255,0.8)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "box-shadow 0.2s ease",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,229,255,0.5)",
          boxShadow: "0 0 10px rgba(0,229,255,0.2)",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </>
  );
}
