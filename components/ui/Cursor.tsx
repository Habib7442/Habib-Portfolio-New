"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorSize = isHovered ? 48 : 12;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - cursorSize / 2);
      mouseY.set(e.clientY - cursorSize / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, cursorSize]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    const addCursorNone = () => {
      const interactables = document.querySelectorAll("a, button");
      interactables.forEach((el) => {
        (el as HTMLElement).style.cursor = "none";
      });
    };
    addCursorNone();
    const observer = new MutationObserver(addCursorNone);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      document.body.style.cursor = "auto";
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        width: cursorSize,
        height: cursorSize,
      }}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-screen transition-colors duration-300 ease-out border ${
        isHovered
          ? "border-[#06B6D4] bg-[#06B6D4]/10 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          : "bg-[#7C3AED] border-transparent shadow-[0_0_15px_rgba(124,58,237,0.8)]"
      }`}
    />
  );
}
