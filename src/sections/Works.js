import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedBlobs from "../components/AnimatedBlobs";

const projects = [
  {
    title: "Amily的旅日地圖",
    description:
      "使用 chatGPT生成所有圖片，並用前端技術製作，可放大、縮小、平移與點擊呼叫相關區塊的日本地圖",
    liveDemo: "https://amilycc.github.io/JP-map/",
    github: "",
    image: "/images/work4.png",
  },
  {
    title: "心理測驗原型網站",
    description:
      "使用 Node.js、Express、Bootstrap、body-parser、mongoose 和 nodemon 開發，具備資料庫儲存功能，能記錄使用者輸入、計算並產生對應結果，並可分享到社群媒體。",
    liveDemo: "https://pj-chiwawa.onrender.com",
    github: "",
    image: "/images/work1.png",
  },
  {
    title: "前端小型作品集",
    description:
      "收錄多個以 HTML、CSS、JavaScript、Bootstrap 和 jQuery 製作的小型網頁應用，展示各種互動功能與前端技術練習成果。",
    liveDemo: "https://amilycc.github.io/CodeShowcase/",
    github: "",
    image: "/images/work2.png",
  },
  {
    title: "更多作品請見 GitHub",
    description:
      "想看更多過去的專案，可以參考我的 GitHub。代表作品包括：記憶遊戲、LINE LIFF 串接、短網址頁面等。",
    github: "https://github.com/AmilyCC",
    image: "/images/work3.png",
  }  
];

export default function Works() {
  return (
    <section
      className="py-20 flex flex-col justify-center items-center overflow-hidden relative"
      style={{
        background: "linear-gradient(to bottom,#243b52 10% ,#232625 50%, #243b52 80%)",
        color: "#dbd9d9",
      }}
    >
      <AnimatedBlobs />
      <h2 className="text-5xl font-bold mb-16 tracking-wide relative z-10">
        My Works
        {/* 動態漸層下劃線 */}
        <span className="block h-1 w-32 mx-auto mt-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-400 animate-underline" />
        <style>{`
          @keyframes underline {
            0%,100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-underline {
            background-size: 200% 200%;
            animation: underline 3s ease-in-out infinite;
          }
        `}</style>
      </h2>

      {/* 作品區塊 */}
      <div className="w-full max-w-6xl space-y-24 relative z-10">
        {projects.map((project, index) => (
          <WorkItem key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function WorkItem({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -120 : 120 }
      }
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col md:flex-row ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      } items-center justify-between gap-12`}
    >
      {/* 磨砂卡片外層 */}
      <motion.div
        whileHover={{ rotateY: index % 2 === 0 ? 8 : -8, scale: 1.04, boxShadow: "0 0 32px 4px rgba(4,223,216,0.25)" }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="w-11/12 max-w-xs md:max-w-none mx-auto flex flex-col md:flex-row bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative group"
        style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.37), 0 0 0 4px rgba(255,255,255,0.08)'}}
      >
        {/* 影像區塊：手機在最上方，桌機在右/左 */}
        <motion.div
          whileHover={{ scale: 1.09 }}
          transition={{ duration: 0.4 }}
          className="order-1 md:order-none w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 relative"
        >
          <div className="relative w-full h-48 md:h-72 bg-white/10 rounded-2xl overflow-hidden shadow-xl border border-white/10 flex items-center justify-center"
            style={{boxShadow:'0 4px 24px 0 rgba(4,223,216,0.10), 0 0 0 6px rgba(255,255,255,0.10)'}}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain md:object-cover rounded-xl shadow-lg"
              style={{boxShadow:'0 2px 16px 0 rgba(4,223,216,0.12)'}}
            />
            {/* 光線掃過動畫 */}
            <span className="absolute left-0 top-0 w-full h-full pointer-events-none">
              <span className="block absolute left-[-60%] top-0 w-1/2 h-full bg-gradient-to-r from-white/60 via-white/10 to-transparent blur-2xl opacity-60 animate-shine" />
            </span>
            <style>{`
              @keyframes shine {
                0% { left: -60%; }
                60% { left: 110%; }
                100% { left: 110%; }
              }
              .animate-shine {
                animation: shine 2.8s cubic-bezier(.4,0,.2,1) infinite;
              }
            `}</style>
          </div>
        </motion.div>
        {/* 內容區塊（文字） */}
        <div className="w-full md:w-1/2 text-center md:text-left p-6 md:p-12 flex flex-col justify-center">
          <h3 className="text-2xl md:text-4xl font-bold tracking-wider text-white drop-shadow-lg mb-3 md:mb-4">
            {project.title}
          </h3>
          <span className="block h-1 w-20 mt-2 mb-3 md:mb-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-400 animate-underline" />
          <p className="mt-2 text-gray-100/80 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">{project.description}</p>

          {/* 按鈕區 */}
          <div className="mt-2 flex gap-4 justify-center md:justify-start">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 md:px-7 rounded-xl text-sm md:text-base bg-gradient-to-r from-cyan-400/90 to-blue-500/80 text-white font-bold shadow-lg hover:from-cyan-300 hover:to-blue-400 hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20 backdrop-blur-sm"
                style={{boxShadow:'0 2px 12px 0 rgba(4,223,216,0.18)'}}
              >
                Live Demo
              </a>
            )}
            {!!project.github.trim() && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 md:px-7 rounded-xl text-sm md:text-base bg-gradient-to-r from-white/90 to-cyan-100/80 text-gray-800 font-bold shadow-lg hover:from-cyan-400 hover:to-blue-400 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20 backdrop-blur-sm"
                style={{boxShadow:'0 2px 12px 0 rgba(4,223,216,0.10)'}}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
