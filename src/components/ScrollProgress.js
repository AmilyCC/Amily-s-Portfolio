import React from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = ({ progress }) => {
  // 計算各種動畫值
  const diverX = progress * (window.innerWidth - 100);
  const waterOpacity = 0.2 + (progress * 0.6);
  const bubblesOpacity = 1 - (progress * 0.7);

  // bar 無邊框
  // 計算背景漸層顏色
  const getGradient = () => {
    // 起始：白→亮藍綠，結束：亮藍綠→深藍
    const startTop = [255, 255, 255, 0.9];
    const startBottom = [4, 223, 216, 0.9];
    const endTop = [4, 223, 216, 0.9];
    const endBottom = [25, 8, 64, 0.9];

    // 根據 progress 插值
    const lerp = (a, b, t) => a + (b - a) * t;
    const colorToStr = (c) => `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
    const top = [
      Math.round(lerp(startTop[0], endTop[0], progress)),
      Math.round(lerp(startTop[1], endTop[1], progress)),
      Math.round(lerp(startTop[2], endTop[2], progress)),
      lerp(startTop[3], endTop[3], progress)
    ];
    const bottom = [
      Math.round(lerp(startBottom[0], endBottom[0], progress)),
      Math.round(lerp(startBottom[1], endBottom[1], progress)),
      Math.round(lerp(startBottom[2], endBottom[2], progress)),
      lerp(startBottom[3], endBottom[3], progress)
    ];
    return `linear-gradient(to bottom, ${colorToStr(top)}, ${colorToStr(bottom)})`;
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-6 z-[9999] pointer-events-none"
      style={{ 
        opacity: 1,
        background: getGradient(),
        border: 0
      }}
    >
      {/* 背景漸變 */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: waterOpacity, border: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" style={{border:0}} />
      </div>

      {/* 潛水員 */}
      <motion.div 
        className="absolute"
        style={{ 
          x: `calc(-50% + ${diverX}px)`,
          bottom: `-28px`,
          transition: { type: "spring", stiffness: 50, damping: 20 }
        }}
      >
        <img 
          src="images/diver.svg" 
          alt="diver" 
          width="60" 
          height="80" 
          className="diver-glow-ios"
          style={{ display: 'block', filter: 'drop-shadow(0 0 0 white) drop-shadow(0 0 4px white) drop-shadow(0 0 8px white)' }}
        />
        <motion.div 
          className="absolute"
          style={{
            left: 65,
            top: 18,
            opacity: bubblesOpacity,
            transition: { type: "spring", stiffness: 50, damping: 20 }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <motion.circle 
              cx="10" 
              cy="10" 
              r="2" 
              fill="white"
              animate={{
                y: [0, -10, -20],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.circle 
              cx="15" 
              cy="8" 
              r="1.5" 
              fill="white"
              animate={{
                y: [0, -8, -16],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2
              }}
            />
            <motion.circle 
              cx="5" 
              cy="12" 
              r="1" 
              fill="white"
              animate={{
                y: [0, -6, -12],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollProgress; 