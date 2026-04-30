import React, { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const CURSOR_DELAY = 6;
const GSAP_DURATION = 0.1;

const Cursor = React.memo((): React.ReactElement => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;

    const loop = () => {
      if (!hover) {
        cursorPos.x += (mousePos.x - cursorPos.x) / CURSOR_DELAY;
        cursorPos.y += (mousePos.y - cursorPos.y) / CURSOR_DELAY;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: GSAP_DURATION });
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;

      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: GSAP_DURATION });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      });

      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
});

Cursor.displayName = "Cursor";

export { Cursor };
