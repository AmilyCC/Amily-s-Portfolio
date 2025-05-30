import React from "react";
import { motion } from "framer-motion";
import { FaMedium, FaGithub } from "react-icons/fa";
import AnimatedBlobs from "../components/AnimatedBlobs";

export default function Contact() {
  return (
    <section className="relative h-screen max-h-[1000px] py-20 px-4 sm:px-6 lg:px-8">
      {/* 格子背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_2rem] [mask-image:radial-gradient(ellipse_40%_50%_at_50%_80%,#000_80%,transparent_100%)]" />
      
      <div className="absolute inset-0 z-0">
        <AnimatedBlobs />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full h-full">
        <motion.div
          className="relative z-10 w-full max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 tracking-wide text-center text-white relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Let's Work Together!
            <span className="block h-1 w-24 mx-auto mt-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-400 animate-underline" />
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
          </motion.h2>
          <motion.p
            className="text-lg text-gray-200 mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            如果你有任何合作機會，讓我們一起創造更棒的作品吧！<br />
            コラボの機会があれば、一緒に素敵なものを作りましょう！
          </motion.p>

          <div className="flex flex-col md:flex-row gap-6 w-full">
            <motion.a
              href="https://medium.com/@ccAmily"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-700/80 text-white font-bold shadow-lg hover:from-cyan-400 hover:to-blue-400 hover:text-black hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20 backdrop-blur-sm w-full text-center"
              whileHover={{ scale: 1.07 }}
            >
              <FaMedium className="text-xl" /> Medium
            </motion.a>

            <motion.a
              href="https://github.com/AmilyCC"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-600/80 text-white font-bold shadow-lg hover:from-cyan-400 hover:to-blue-400 hover:text-black hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20 backdrop-blur-sm w-full text-center"
              whileHover={{ scale: 1.07 }}
            >
              <FaGithub className="text-xl" /> GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* 版權聲明 */}
      <div className="relative w-full py-6 text-center text-white/60 text-sm">
        <p>© 2025 Amily. All rights reserved.</p>
      </div>
    </section>
  );
}
