import React, { useRef, useState, useContext, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { getSkillColor } from "../config/skillMap";
import { ModalContext } from "../App";

const projects = [
  {
    title: "Amily的旅日地圖",
    description:
      "使用 chatGPT生成所有圖片，並用前端技術製作，可放大、縮小、平移與點擊呼叫相關區塊的日本地圖",
    liveDemo: "https://amilycc.github.io/JP-map/",
    image: "/images/work3.webp",
    skills: ["#ChatGPT","#Cursor", "#Node.js", "#UX Design","#GitHub","#MVP","#prototyping"],
    link: "https://amilycc.github.io/JP-map/",
    github: "https://github.com/amilycc/JP-map"
  },
  {
    title: "心理測驗原型網站",
    description:
      "使用 Node.js、Express、Bootstrap、body-parser、mongoose 和 nodemon 開發，具備資料庫儲存功能，能記錄使用者輸入、計算並產生對應結果，並可分享到社群媒體。",
    liveDemo: "https://pj-chiwawa.onrender.com",
    image: "/images/work1.webp",
    skills: ["#MVP","#prototyping","#Node.js", "#Express","#Bootstrap","#GitHub","#專案管理", "#團隊協作"],
    link: "https://pj-chiwawa.onrender.com",
    github: "https://github.com/pj-chiwawa/pj-chiwawa"
  },
  {
    title: "前端小型作品集",
    description:
      "收錄多個以 HTML、CSS、JavaScript、Bootstrap 和 jQuery 製作的小型網頁應用，展示各種互動功能與前端技術練習成果。",
    liveDemo: "https://amilycc.github.io/CodeShowcase/",
    image: "/images/work2.webp",
    skills: ["#HTML", "#CSS", "#JavaScript", "#Bootstrap", "#jQuery","#GitHub"],
    link: "https://amilycc.github.io/CodeShowcase/",
    github: "https://github.com/amilycc/CodeShowcase"
  }
];

export default function Works() {
  const { setSelectedWork } = useContext(ModalContext);
  const sectionRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* 格子背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_2rem] [mask-image:radial-gradient(ellipse_80%_60%_at_60%_20%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-6xl mx-auto">
        <AnimatedTitle sectionProgress={sectionProgress} isVisible={isVisible} />

        <div className="space-y-12">
          {projects.map((project, index) => (
            <WorkCard 
              key={project.title} 
              project={project} 
              index={index}
              onReadMore={() => setSelectedWork(project)}
              sectionProgress={sectionProgress}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 標題組件
const AnimatedTitle = ({ sectionProgress, isVisible }) => {
  const titleRef = React.useRef(null);

  const scale = useTransform(
    sectionProgress,
    [0, 0.1, 0.4, 0.6, 0.7, 1],
    [0.3, 0.5, 1, 1, 0.8, 0.3],
    { clamp: false }
  );
  const opacity = useTransform(
    sectionProgress,
    [0, 0.1, 0.4, 0.6, 0.7, 1],
    [0, 0.5, 1, 1, 0.8, 0],
    { clamp: false }
  );
  const y = useTransform(
    sectionProgress,
    [0, 0.1, 0.4, 0.6, 0.7, 1],
    [100, 20, 0, 0, -20, -100],
    { clamp: false }
  );

  return (
    <motion.h2
      ref={titleRef}
      style={{
        scale,
        opacity,
        y,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
      className="text-4xl sm:text-5xl font-bold text-center text-white mb-10"
      initial={false}
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    >
      My Works
    </motion.h2>
  );
};

function WorkCard({ project, index, onReadMore, sectionProgress, isVisible }) {
  const ref = useRef(null);
  const isEven = index % 2 === 0;
  const [isMobile, setIsMobile] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCardVisible(entry.isIntersecting);
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 根據螢幕寬度調整動畫參數
  const getAnimationPoints = () => {
    if (isMobile) {
      return {
        timePoints: [0, 0.05, 0.2, 0.8, 0.9, 1],
        scalePoints: [0.3, 0.5, 1, 1, 0.8, 0.3],
        opacityPoints: [0, 0.5, 1, 1, 0.8, 0],
        xPoints: {
          image: [isEven ? -50 : 50, isEven ? -25 : 25, 0, 0, isEven ? -25 : 25, isEven ? -50 : 50],
          text: [isEven ? 50 : -50, isEven ? 25 : -25, 0, 0, isEven ? 25 : -25, isEven ? 50 : -50]
        }
      };
    }
    return {
      timePoints: [0, 0.1, 0.3, 0.7, 0.8, 1],
      scalePoints: [0.3, 0.5, 1, 1, 0.8, 0.3],
      opacityPoints: [0, 0.5, 1, 1, 0.8, 0],
      xPoints: {
        image: [isEven ? -100 : 100, isEven ? -50 : 50, 0, 0, isEven ? -50 : 50, isEven ? -100 : 100],
        text: [isEven ? 100 : -100, isEven ? 50 : -50, 0, 0, isEven ? 50 : -50, isEven ? 100 : -100]
      }
    };
  };

  const { timePoints, scalePoints, opacityPoints, xPoints } = getAnimationPoints();

  // 圖片動畫
  const imageScale = useTransform(
    sectionProgress,
    timePoints,
    scalePoints,
    { clamp: false }
  );
  const imageOpacity = useTransform(
    sectionProgress,
    timePoints,
    opacityPoints,
    { clamp: false }
  );
  const imageX = useTransform(
    sectionProgress,
    timePoints,
    xPoints.image,
    { clamp: false }
  );

  // 文字動畫
  const textScale = useTransform(
    sectionProgress,
    timePoints,
    scalePoints,
    { clamp: false }
  );
  const textOpacity = useTransform(
    sectionProgress,
    timePoints,
    opacityPoints,
    { clamp: false }
  );
  const textX = useTransform(
    sectionProgress,
    timePoints,
    xPoints.text,
    { clamp: false }
  );

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row gap-5 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} group`}
      initial={false}
      animate={cardVisible ? 'visible' : 'hidden'}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-full md:w-1/2"
        style={{
          scale: imageScale,
          opacity: imageOpacity,
          x: imageX,
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
      >
        <div className="relative overflow-hidden rounded-lg max-w-[400px] mx-auto">
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[3/2] object-cover transform md:group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>

      <motion.div 
        className="w-full md:w-1/2"
        style={{
          scale: textScale,
          opacity: textOpacity,
          x: textX,
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
      >
        <div className="relative p-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-[15px] md:translate-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-1/4 md:w-8 md:group-hover:w-full transition-all duration-500" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white md:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 my-3">
              {project.skills.map((skill, idx) => {
                const skillColor = getSkillColor(skill);
                return (
                  <span
                    key={idx}
                    className="px-1 py-0.5 text-xs rounded-full"
                    style={{
                      backgroundColor: `${skillColor}20`,
                      color: skillColor
                    }}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>

            <button
              onClick={onReadMore}
              className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              Read more
              <span className="ml-1 relative w-8 h-4 overflow-hidden">
                <span className="absolute inset-0 transform md:group-hover:translate-x-[200%] transition-transform duration-500">→</span>
                <span className="absolute inset-0 -translate-x-[200%] md:group-hover:translate-x-0 transition-transform duration-500">→</span>
              </span>
              <style>{`
                @media (max-width: 768px) {
                  button {
                    animation: blink 1.5s infinite;
                  }
                }
                @keyframes blink {
                  0%, 100% { 
                    opacity: 0.6;
                    color: rgba(255, 255, 255, 0.6);
                  }
                  50% { 
                    opacity: 1;
                    color: rgba(255, 255, 255, 1);
                  }
                }
              `}</style>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
