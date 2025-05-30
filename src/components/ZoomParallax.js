import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ZoomParallax = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 使用 spring 動畫使縮放更加順暢
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]),
    {
      stiffness: 100,
      damping: 30,
      mass: 0.5
    }
  );

  // 透明度效果
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
    {
      stiffness: 100,
      damping: 30,
      mass: 0.5
    }
  );

  return (
    <div ref={ref} className={`relative h-screen max-h-[1000px] overflow-hidden ${className}`}>
      <motion.div
        style={{
          scale,
          opacity,
          willChange: 'transform, opacity',
          transformOrigin: 'center center',
          position: 'relative',
          zIndex: 1
        }}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ZoomParallax; 