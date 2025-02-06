import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Works from "./sections/Works";
import Contact from "./sections/Contact";

function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,  // 啟用平滑滾動
      lerp: 0.1,  // 減速效果
    });
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container className="font-sans">
      <Hero />
      <Skills />
      <Works />
      <Contact />
    </div>
  );
}

export default App;
