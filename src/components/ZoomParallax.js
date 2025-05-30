import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ZoomParallax = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 監聽滾動進度
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      console.log("Scroll Progress:", latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // 使用 spring 動畫使縮放更加順暢
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 2]),
    {
      stiffness: 50,
      damping: 20,
      mass: 1,
      restDelta: 0.001
    }
  );

  // 模糊效果
  const blur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [10, 0, 20]
  );

  // 透明度效果
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
    {
      stiffness: 50,
      damping: 20,
      mass: 1,
      restDelta: 0.001
    }
  );

  // Y軸位移效果 - 從中心向外
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, 0]
  );

  // 旋轉效果 - 減少旋轉
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, 0]
  );

  return (
    <div ref={ref} className={`relative h-screen max-h-[1000px] overflow-hidden ${className}`}>
      <motion.div
        style={{
          scale,
          filter: `blur(${blur}px)`,
          opacity,
          y,
          rotate,
          willChange: 'transform, opacity, filter',
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