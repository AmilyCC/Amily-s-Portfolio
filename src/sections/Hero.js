import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useSpring(1, { stiffness: 100, damping: 30 });

  // 動態背景效果
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', x);
      containerRef.current.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FF3366] via-[#FF6B6B] to-[#4ECDC4]"
      style={{
        '--mouse-x': 0.5,
        '--mouse-y': 0.5,
      }}
    >
      {/* 動態背景網格 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* 動態光暈效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/30 via-[#FF6B6B]/30 to-[#4ECDC4]/30 opacity-50 mix-blend-overlay" />
      
      {/* 主要內容容器 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 名字動畫 */}
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => scale.set(1.1)}
            onHoverEnd={() => scale.set(1)}
          >
            <motion.h1
              className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FFE66D] to-[#4ECDC4]"
              style={{ y }}
            >
              Amily Chang
            </motion.h1>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#FF3366] to-[#4ECDC4] rounded-lg blur opacity-25"
              style={{ scale }}
            />
          </motion.div>

          {/* 職稱 */}
          <motion.div
            className="mt-6 text-2xl md:text-4xl font-light text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Web Developer
              </motion.span>
              <span className="mx-3 text-[#FFE66D]">•</span>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                UI/UX Designer
              </motion.span>
              <span className="mx-3 text-[#FFE66D]">•</span>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                AI Solutions
              </motion.span>
            </span>
          </motion.div>

          {/* 描述文字 */}
          <motion.p
            className="mt-8 text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            打造兼具美感與實用性的數位體驗，
            <br />
            將每個想法化為流暢而有影響力的解決方案。
          </motion.p>
        </motion.div>
      </div>

      {/* 滾動提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span 
            className="text-white/60 text-sm font-light"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll
          </motion.span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center relative">
            <motion.div
              className="w-1.5 h-3 bg-white rounded-full mt-2"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
