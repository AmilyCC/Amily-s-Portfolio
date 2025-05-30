import React from "react";
import { motion } from "framer-motion";

const Bubble = ({ delay, duration, size, left }) => {
  return (
    <motion.div
      className="fixed rounded-full bg-white/30 backdrop-blur-sm pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: '-10%',
        zIndex: 10,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: -window.innerHeight - 100,
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default function Bubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
      {[...Array(20)].map((_, i) => (
        <Bubble
          key={i}
          delay={i * 0.3}
          duration={4 + Math.random() * 4}
          size={8 + Math.random() * 16}
          left={Math.random() * 100}
        />
      ))}
    </div>
  );
} 