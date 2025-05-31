import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ZoomParallax = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 移動到頂層的 transform
  const mobileScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);
  const mobileOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const desktopScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const desktopOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // 根據裝置類型選擇動畫參數
  const scale = isMobile ? mobileScale : desktopScale;
  const opacity = isMobile ? mobileOpacity : desktopOpacity;
  const springConfig = isMobile 
    ? { stiffness: 50, damping: 20, mass: 0.5 }
    : { stiffness: 100, damping: 30, mass: 0.5 };

  // 使用 spring 動畫使縮放更加順暢
  const springScale = useSpring(scale, springConfig);
  const springOpacity = useSpring(opacity, springConfig);

  return (
    <div ref={ref} className={`relative h-screen max-h-[1000px] overflow-hidden ${className}`}>
      <motion.div
        style={{
          scale: springScale,
          opacity: springOpacity,
          willChange: 'transform, opacity',
          transformOrigin: 'center center',
          position: 'relative',
          zIndex: 1,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitPerspective: 1000
        }}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ZoomParallax; 