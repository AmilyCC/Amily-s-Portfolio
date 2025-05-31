import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ZoomParallax = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 使用 Intersection Observer 控制可見性
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // 檢測裝置類型
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
  const mobileScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  const mobileOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const desktopScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);
  const desktopOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // 使用 useMemo 優化動畫配置
  const animationConfig = useMemo(() => {
    const baseConfig = {
      scale: isMobile ? mobileScale : desktopScale,
      opacity: isMobile ? mobileOpacity : desktopOpacity,
      springConfig: isMobile 
        ? { stiffness: 40, damping: 15, mass: 0.5 }
        : { stiffness: 70, damping: 20, mass: 0.5 }
    };

    return baseConfig;
  }, [isMobile, mobileScale, mobileOpacity, desktopScale, desktopOpacity]);

  const springScale = useSpring(animationConfig.scale, animationConfig.springConfig);
  const springOpacity = useSpring(animationConfig.opacity, animationConfig.springConfig);

  return (
    <div 
      ref={ref} 
      className={`relative h-screen max-h-[1000px] overflow-hidden ${className}`}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitPerspective: 1000
      }}
    >
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
          WebkitPerspective: 1000,
          transform: 'translateZ(0)'
        }}
        className="w-full h-full flex items-center justify-center overflow-hidden"
        initial={false}
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ZoomParallax; 