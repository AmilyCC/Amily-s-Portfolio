import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// 氣泡動畫元件
const Bubble = ({ delay, duration, size, left }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white/20 backdrop-blur-sm"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: '-10%',
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: -window.innerHeight - 100,
        opacity: [0, 0.8, 0],
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

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useSpring(1, { stiffness: 100, damping: 30 });

  // 動態背景效果
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', x);
      containerRef.current.style.setProperty('--mouse-y', y);
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen max-h-[1000px] py-20 px-4 sm:px-6 lg:px-8">
      {/* 移除背景漸層 */}
      <div className="relative max-w-6xl mx-auto h-full flex flex-col justify-center">
        
        {/* 氣泡動畫 */}
        {[...Array(8)].map((_, i) => (
          <Bubble
            key={i}
            delay={i * 0.8}
            duration={8 + Math.random() * 4}
            size={15 + Math.random() * 15}
            left={Math.random() * 100}
          />
        ))}

        {/* 主要內容容器 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  PM
                </motion.span>
                <span className="mx-3 text-[#FFE66D]">•</span>
                <motion.span 
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  UX Designer
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
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
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
      </div>
    </section>
  );
}
