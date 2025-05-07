import React, { useEffect, useRef, useState } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import ScrollProgress from "./components/ScrollProgress";

function App() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 判斷是否為手機裝置
    const isMobile = window.innerWidth <= 768;
    let scroll;
    let handleScroll;

    if (isMobile) {
      // 手機：用原生 scroll 事件
      handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        let progress = docHeight > 0 ? scrollTop / docHeight : 0;
        progress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(progress);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // 初始化
    } else {
      // 桌機：用 LocomotiveScroll
      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.1,
        multiplier: 1,
        class: "is-revealed",
        smartphone: {
          smooth: true
        },
        tablet: {
          smooth: true
        }
      });
      scroll.on('scroll', (args) => {
        let progress = args.scroll.y / args.limit.y;
        progress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(progress);
      });
      // 強制 update，確保高度正確
      setTimeout(() => {
        if (scroll && typeof scroll.update === 'function') scroll.update();
      }, 100);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      } else if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <ParallaxProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-[#FF3366] via-[#FF6B6B] to-[#4ECDC4]">
        <ScrollProgress progress={scrollProgress} />
        <div 
          ref={scrollRef} 
          data-scroll-container 
          className="font-sans min-h-[200vh]"
        >
          <Parallax speed={-5}>
            <Hero />
          </Parallax>
          <Parallax speed={-2}>
            <Skills />
          </Parallax>
          <Parallax speed={-3}>
            <Works />
          </Parallax>
          <Parallax speed={-1}>
            <Contact />
          </Parallax>
        </div>
      </div>
    </ParallaxProvider>
  );
}

export default App;
