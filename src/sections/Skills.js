import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveScroll from "locomotive-scroll";

// 定義 Skills 陣列（交錯顏色 + 調整線長）
const skills = [
  { name: "#front-end", height: "69vh", color: "#ce5c77" },
  { name: "#UI/UX", height: "63vh", color: "#b5305d" },
  { name: "#DB", height: "70vh", color: "#ce5c77" },
  { name: "#SEO", height: "60vh", color: "#b5305d" },
  { name: "#AI", height: "65vh", color: "#ce5c77" },
];

export default function Skills() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrollTriggered, setScrollTriggered] = useState(false); // 手機版是否觸發動畫
  const [lastScrollTime, setLastScrollTime] = useState(Date.now()); // 記錄最近滑動時間
  const [hoverCounts, setHoverCounts] = useState(new Map()); // 電腦版滑鼠次數
  const scrollRef = useRef(null);

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 初始化 Locomotive Scroll（僅限桌機版）
  useEffect(() => {
    if (!scrollRef.current || isMobile) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => {
      scroll.destroy(); // 清除滾動監聽
    };
  }, [isMobile]);

  // **監測滾動行為，控制動畫**
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    if (!isMobile) return;

    scrollYProgress.onChange((progress) => {
      setLastScrollTime(Date.now()); // 記錄滑動時間
      if (progress > 0.15 && !scrollTriggered) {
        setScrollTriggered(true); // ✅ 當畫面滾動超過 15% 時，啟動動畫
      }
    });

    // **自動檢查是否超過 2 秒未滑動**
    const checkIdleTime = setInterval(() => {
      if (Date.now() - lastScrollTime > 2000) {
        setScrollTriggered(false); // 停止動畫
      }
    }, 1000);

    return () => clearInterval(checkIdleTime);
  }, [isMobile, scrollYProgress, scrollTriggered, lastScrollTime]);

  // **電腦版滑鼠懸停次數記錄**
  const handleMouseEnter = (index) => {
    setHoverCounts((prev) => {
      const newCount = (prev.get(index) || 0) + 1;
      return new Map(prev).set(index, newCount);
    });

    // 🔄 設置動畫自動減少次數
    setTimeout(() => {
      setHoverCounts((prev) => {
        const updated = new Map(prev);
        const newCount = (updated.get(index) || 0) - 1;
        if (newCount > 0) {
          updated.set(index, newCount);
        } else {
          updated.delete(index);
        }
        return updated;
      });
    }, 2500);
  };

  return (
    <div ref={scrollRef} data-scroll-container>
      <motion.section 
        className="relative h-screen flex flex-col justify-end items-center overflow-hidden text-white pb-24"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 背景 - **確保填滿整個區塊** */}
        <div className="absolute inset-0 w-full h-screen flex flex-wrap">
          <div className="w-[30%] h-[95%] bg-[#6a0d79]"></div>
          <div className="w-[20%] h-[98%] bg-[#4f0364]"></div>
          <div className="w-[25%] h-[96%] bg-[#6a0d79]"></div>
          <div className="w-[25%] h-[100%] bg-[#4f0364]"></div>
        </div>

        {/* 吊燈技能標籤區域 */}
        <div className="relative z-10 w-full h-full flex justify-between px-6 sm:px-8 md:px-16">
          {skills.map((skill, index) => {
            const hoverCount = hoverCounts.get(index) || 0;
            const isAnimating = hoverCount > 0 || scrollTriggered;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => !isMobile && handleMouseEnter(index)}
                className="relative flex flex-col items-center"
                style={{
                  width: "20%", 
                  transformOrigin: "top center",
                  perspective: "800px",
                }}
              >
                {/* 吊燈整體 */}
                <motion.div
                  animate={
                    isMobile
                      ? scrollTriggered
                        ? {
                            rotateX: [0, -10, 10, -5, 5, 0], 
                            scale: [1, 1.08, 1],
                          }
                        : {}
                      : hoverCount > 0
                      ? { rotateX: [0, -20, 20, -10, 10, -5, 5, 0] }
                      : { rotateX: 0, scale: 1 } 
                  }
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    delay: isMobile ? index * 0.2 : 0, // ✅ **手機版 0.2s 間隔延遲**
                    repeat: isAnimating ? Infinity : 0,
                  }}
                  className="relative flex flex-col items-center"
                >
                  {/* 吊燈連接線 */}
                  <motion.div
                    className="w-0.5 bg-white"
                    style={{ height: skill.height, transformOrigin: "top center" }}
                  />

                  {/* 燈罩 */}
                  <motion.div
                    className="w-4 h-4 rounded-t-full m-1"
                    style={{ background: skill.color }}
                    animate={{ scale: isAnimating ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* 吊燈標籤 */}
                  <motion.div
                    className="relative px-4 sm:px-6 py-3 text-white shadow-lg text-center text-xs sm:text-lg md:text-2xl rounded-t-full rounded-b-lg"
                    style={{
                      background: skill.color,
                      width: "clamp(88px, 120%, 176px)",
                      minWidth:"70px",
                      maxWidth: "120%",
                      transformOrigin: "top center",
                      boxShadow: isAnimating
                        ? "0px 10px 10px rgba(251, 231, 221, 2)" // **手機版開燈時閃爍**
                        : "0px 0px 0px rgba(251, 231, 221, 0.5)",
                    }}
                  >
                    {skill.name}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* 滾動進場動畫 */}
        <motion.h2 className="relative z-10 text-5xl font-bold text-center w-full pt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          My Skills
        </motion.h2>
      </motion.section>
    </div>
  );
}
