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
    image: "/images/work3.png",
    skills: ["#ChatGPT","#Cursor", "#Node.js", "#UX Design","#GitHub","#MVP","#prototyping"],
    link: "https://amilycc.github.io/JP-map/",
    github: "https://github.com/amilycc/JP-map"
  },
  {
    title: "心理測驗原型網站",
    description:
      "使用 Node.js、Express、Bootstrap、body-parser、mongoose 和 nodemon 開發，具備資料庫儲存功能，能記錄使用者輸入、計算並產生對應結果，並可分享到社群媒體。",
    liveDemo: "https://pj-chiwawa.onrender.com",
    image: "/images/work1.png",
    skills: ["#MVP","#prototyping","#Node.js", "#Express","#Bootstrap","#GitHub","#專案管理", "#團隊協作"],
    link: "https://pj-chiwawa.onrender.com",
    github: "https://github.com/pj-chiwawa/pj-chiwawa"
  },
  {
    title: "前端小型作品集",
    description:
      "收錄多個以 HTML、CSS、JavaScript、Bootstrap 和 jQuery 製作的小型網頁應用，展示各種互動功能與前端技術練習成果。",
    liveDemo: "https://amilycc.github.io/CodeShowcase/",
    image: "/images/work2.png",
    skills: ["#HTML", "#CSS", "#JavaScript", "#Bootstrap", "#jQuery","#GitHub"],
    link: "https://amilycc.github.io/CodeShowcase/",
    github: "https://github.com/amilycc/CodeShowcase"
  }
];

export default function Works() {
  const { setSelectedWork } = useContext(ModalContext);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = React.useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      {/* 格子背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_2rem] [mask-image:radial-gradient(ellipse_80%_60%_at_60%_20%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto">
        <AnimatedTitle sectionProgress={sectionProgress} isMobile={isMobile} />

        <div className="space-y-32 mt-20">
          {projects.map((project, index) => (
            <WorkCard 
              key={project.title} 
              project={project} 
              index={index}
              onReadMore={() => setSelectedWork(project)}
              sectionProgress={sectionProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 標題組件
const AnimatedTitle = ({ sectionProgress, isMobile }) => {
  const titleRef = React.useRef(null);
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(
    isMobile ? titleProgress : sectionProgress,
    [0, 0.1, 0.4, 0.6, 0.9, 1],
    [0.3, 0.5, 1, 1, 0.8, 0.3],
    { clamp: false }
  );
  const opacity = useTransform(
    isMobile ? titleProgress : sectionProgress,
    [0, 0.1, 0.4, 0.6, 0.9, 1],
    [0, 0.5, 1, 1, 0.8, 0],
    { clamp: false }
  );
  const y = useTransform(
    isMobile ? titleProgress : sectionProgress,
    [0, 0.1, 0.4, 0.6, 0.9, 1],
    [100, 20, 0, 0, -20, -100],
    { clamp: false }
  );

  return (
    <motion.div
      ref={titleRef}
      className="text-center"
    >
      <motion.h2
        style={{
          scale,
          opacity,
          y
        }}
        className="text-5xl sm:text-6xl font-bold text-white mb-4"
      >
        My Works
      </motion.h2>
      <motion.div 
        className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500"
        style={{
          scale,
          opacity
        }}
      />
    </motion.div>
  );
};

function WorkCard({ project, index, onReadMore, sectionProgress, isMobile }) {
  const ref = useRef(null);
  const isEven = index % 2 === 0;
  const { scrollYProgress: cardProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 根據螢幕寬度調整動畫參數
  const getAnimationPoints = () => {
    if (isMobile) {
      return {
        timePoints: [0, 0.2, 0.3, 0.7, 0.9, 1],
        scalePoints: [0.8, 0.9, 1, 1, 0.9, 0.8],
        opacityPoints: [0, 0.5, 1, 1, 0.5, 0],
        xPoints: {
          image: [0, 0, 0, 0, 0, 0],
          text: [0, 0, 0, 0, 0, 0]
        }
      };
    }
    return {
      timePoints: [0, 0.2, 0.3, 0.7, 0.9, 1],
      scalePoints: [0, 0.2, 1, 1, 1.5, 1.8],
      opacityPoints: [0, 0.5, 1, 1, 0.1, 0],
      xPoints: {
        image: [isEven ? 500 : -500, isEven ? 200 : -200, 0, 0, isEven ? -200 : 200, isEven ? -500 : 500],
        text: [isEven ? -500 : 500, isEven ? -200 : 200, 0, 0, isEven ? 200 : -200, isEven ? 500 : -500]
      }
    };
  };

  const { timePoints, scalePoints, opacityPoints, xPoints } = getAnimationPoints();

  // 圖片動畫
  const imageScale = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    scalePoints,
    { clamp: false }
  );
  const imageOpacity = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    opacityPoints,
    { clamp: false }
  );
  const imageX = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    xPoints.image,
    { clamp: false }
  );

  // 文字動畫
  const textScale = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    scalePoints,
    { clamp: false }
  );
  const textOpacity = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    opacityPoints,
    { clamp: false }
  );
  const textX = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    xPoints.text,
    { clamp: false }
  );

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row gap-12 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} group`}
    >
      <motion.div 
        className="w-full md:w-1/2"
        style={{
          scale: imageScale,
          opacity: imageOpacity,
          x: imageX
        }}
      >
        <div className="relative overflow-hidden rounded-xl max-w-[600px] mx-auto aspect-[4/3]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>

      <motion.div 
        className="w-full md:w-1/2"
        style={{
          scale: textScale,
          opacity: textOpacity,
          x: textX
        }}
      >
        <div className="relative p-10 max-w-[600px] mx-auto bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 aspect-[4/3] flex flex-col">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-full md:w-8 md:group-hover:w-full transition-all duration-500" />
          <div className="space-y-8 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white md:group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                {project.skills.map((skill, idx) => {
                  const skillColor = getSkillColor(skill);
                  return (
                    <span
                      key={idx}
                      className="px-4 py-1.5 text-sm rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
                      style={{
                        backgroundColor: `${skillColor}20`,
                        color: skillColor,
                        borderColor: `${skillColor}40`
                      }}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>

              <button
                onClick={onReadMore}
                className="inline-flex items-center text-white/80 hover:text-white text-lg font-medium tracking-wide transition-colors duration-200"
              >
                Read more
                <span className="ml-3 relative w-8 h-4 overflow-hidden">
                  <span className="absolute inset-0 transform md:group-hover:translate-x-[200%] transition-transform duration-500">→</span>
                  <span className="absolute inset-0 -translate-x-[200%] md:group-hover:translate-x-0 transition-transform duration-500">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
