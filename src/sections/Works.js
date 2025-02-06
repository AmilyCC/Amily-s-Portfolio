import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "Prototype Psychological Test Website",
    description:
      "Developed using Node.js, Express, Bootstrap, body-parser, mongoose, and nodemon, this project features database storage, records user inputs, calculates and generates corresponding results, and allows users to share results on social media.",
    liveDemo: "https://pj-chiwawa.onrender.com",
    github: "",
    image: "/images/work1.png", // ✅ 直接設定圖片路徑
  },
  {
    title: "Frontend Mini Projects Collection",
    description:
      "A collection of simple frontend web applications built with HTML, CSS, JavaScript, Bootstrap, and jQuery, showcasing various interactive web functionalities.",
    liveDemo: "https://amilycc.github.io/CodeShowcase/",
    github: "",
    image: "/images/work2.png", // ✅ 直接設定圖片路徑
  },
  {
    title: "More Projects on GitHub",
    description:
      "For more past projects, please refer to my GitHub. Notable works include: Memory Game, LINE LIFF Integration, URL Shortener Page.",
    github: "https://github.com/AmilyCC",
    image: "/images/work3.png", // ✅ 直接設定圖片路徑
  },
];

export default function Works() {
  return (
    <section
      className="py-20 flex flex-col justify-center items-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom,#243b52 10% ,#232625 50%, #243b52 80%)",
        color: "#dbd9d9",
      }}
    >
      <h2 className="text-5xl font-bold mb-16 tracking-wide">My Works</h2>

      {/* 作品區塊 */}
      <div className="w-full max-w-6xl space-y-24">
        {projects.map((project, index) => (
          <WorkItem key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function WorkItem({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" }); // 進入畫面時才觸發

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
      {/* 內容區塊（文字） */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-3xl font-semibold tracking-wide">
          {project.title}
        </h3>
        <p className="mt-3 text-gray-400">{project.description}</p>

        {/* 按鈕區 */}
        <div className="mt-5 flex gap-4 justify-center md:justify-start">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#c44330] text-[#dbd9d9] hover:bg-[#dbd9d9] hover:text-[#c44330] transition"
            >
              Live Demo
            </a>
          )}
          {!!project.github.trim() && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#dbd9d9] text-[#292e2c] hover:bg-[#c44330] hover:text-[#dbd9d9] transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* 影像區塊 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="w-full md:w-1/2"
      >
        <div className="relative w-full h-64 bg-[#292e2c] overflow-hidden shadow-lg">
          <img
            src={project.image} // ✅ 直接從物件取得圖片
            alt={project.title}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
