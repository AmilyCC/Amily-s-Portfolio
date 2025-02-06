import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaMedium, FaGithub } from "react-icons/fa"; // 引入 Icon

export default function Contact() {
  return (
    <section
      id="contact"
      className="h-screen flex flex-col justify-center items-center bg-black text-white px-6"
      data-scroll
      data-scroll-speed="1"
    >
      <motion.h2
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Let's Work Together!
      </motion.h2>
      <motion.p
        className="text-lg text-gray-300 mb-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        如果你有任何合作機會，讓我們一起創造更棒的作品吧！<br />
        コラボの機会があれば、一緒に素敵なものを作りましょう！
      </motion.p>

      {/* 手機版: 直行排列 | 桌面版: 橫向排列 */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
        {/* LinkedIn 按鈕 */}
        <motion.a
          href="https://www.linkedin.com/in/amily-cc/"
          className="px-6 py-3 flex items-center justify-center gap-3 bg-[#005E93] text-white hover:bg-[#004974] transition w-full text-center shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaLinkedin className="text-xl" /> LinkedIn
        </motion.a>

        {/* Medium 按鈕 */}
        <motion.a
          href="https://medium.com/@ccAmily"
          className="px-6 py-3 flex items-center justify-center gap-3 bg-[#1B1B1B] text-white hover:bg-[#0F0F0F] transition w-full text-center shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaMedium className="text-xl" /> Medium
        </motion.a>

        {/* GitHub 按鈕 */}
        <motion.a
          href="https://github.com/AmilyCC"
          className="px-6 py-3 flex items-center justify-center gap-3 bg-[#24292E] text-white hover:bg-[#161B22] transition w-full text-center shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaGithub className="text-xl" /> GitHub
        </motion.a>
      </div>
    </section>
  );
}
