import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section 
      className="h-screen flex flex-col justify-center items-start text-white relative overflow-hidden pl-6 md:items-center"
      style={{
        background: "repeating-linear-gradient(-45deg, #66c0da 0px, #66c0da 80px, transparent 80px, transparent 250px), rgb(250, 204, 21)"
      }}
    >
      {/* H1 主要區塊 */}
      <motion.h1
        className="w-full font-bold uppercase relative flex flex-col md:h-[60vh] md:justify-between"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* 名字 - 手機版靠左，桌機版透過 `mt` 和 `ml` 調整 */}
        <motion.span 
          className="text-6xl md:text-9xl text-[#96519a] mt-0 md:mt-[5vh] md:ml-[15%]"
          style={{ textShadow: "3px 3px 0px #312e81" }}
          whileHover={{ scale: 1.1 }}
        >
          Amily
        </motion.span>

        <motion.span 
          className="text-6xl md:text-9xl text-[#96519a] mt-2 ] md:ml-[20%]"
          style={{ textShadow: "3px 3px 0px #312e81" }}
          whileHover={{ scale: 1.1 }}
        >
          Chang's
        </motion.span>

        {/* Portfolio */}
        <motion.span 
          className="text-5xl md:text-7xl text-white mt-2 ] md:ml-[20%]"
          style={{ textShadow: "4px 4px 0px #312e81" }}
          whileHover={{ scale: 1.1 }}
        >
          Portfolio
        </motion.span>

        {/* 角色說明 - 手機版靠左，桌機版透過 `ml` 和 `mt` 讓位置適當分布 */}
        <motion.span 
          className="text-xl md:text-4xl mt-4 ] md:ml-[35%]"
          style={{ textShadow: "2px 2px 0px #312e81" }}
          whileHover={{ scale: 1.1 }}
        >
          Web Developer, UI/UX & AI Solutions
        </motion.span>
      </motion.h1>

      {/* 副標語 */}
      <motion.div
        className="relative bottom-0 w-95 flex justify-start md:justify-center border-b-8 border-yellow-400 mr-0 ml-auto mt-20 mb-0 pl-10 pr-4 pt-5 pb-4 text-lg md:text-2xl text-[#66c0da] font-bold bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        I don’t just build websites.  
        <br></br> I craft seamless experiences, solve real problems & bring ideas to life.  
      </motion.div>
    </section>
  );
}
