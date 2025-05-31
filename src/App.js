import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import ScrollProgress from "./components/ScrollProgress";
import Bubbles from "./components/Bubbles";
import Modal from "./components/Modal";
import ZoomParallax from "./components/ZoomParallax";

// 創建 Context
export const ModalContext = createContext();

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedWork, setSelectedWork] = useState(null);
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    const throttleDelay = 16; // 約 60fps

    const handleScroll = () => {
      const currentTime = Date.now();
      if (!ticking && (currentTime - lastTime) >= throttleDelay) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          let progress = docHeight > 0 ? scrollTop / docHeight : 0;
          progress = Math.min(Math.max(progress, 0), 1);
          
          // 只在滾動距離超過閾值時更新
          if (Math.abs(scrollTop - lastScrollY) > 5) {
            setScrollProgress(progress);
            setGradientPosition(progress);
            lastScrollY = scrollTop;
          }
          
          lastTime = currentTime;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 計算漸層顏色
  const getGradientColor = (progress) => {
    const colors = [
      '#FF3366', // Hero
      '#FF6B6B', // Skills
      '#4ECDC4', // Works
      '#243b52', // Contact
      '#020e19'  // End
    ];
    
    // 自定義顏色停止點
    const colorStops = [0, 0.05, 0.1, 0.6, 0.85, 1];
    
    // 計算漸層
    const gradientStops = colors.map((color, index) => {
      const stop = colorStops[index] * 100;
      return `${color} ${stop}%`;
    }).join(', ');
    
    return `linear-gradient(175deg, ${gradientStops})`;
  };

  return (
    <ModalContext.Provider value={{ selectedWork, setSelectedWork }}>
      <div 
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: getGradientColor(gradientPosition)
        }}
      >
        {/* 格子背景 */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_2rem] [mask-image:radial-gradient(ellipse_40%_50%_at_50%_80%,#000_80%,transparent_100%)]" />
        
        <Bubbles />
        <ScrollProgress progress={scrollProgress} />
        <div className="font-sans relative overflow-x-hidden">
          {/* <div className="space-y-0"> */}
            <ZoomParallax>
              <Hero />
            </ZoomParallax>
            <div className="mt-[-10vh] lg:mt-[0] xl:mt-[10vh] relative z-10">
              <Skills />
            </div>
            <div className="mt-[0] lg:mt-[-10vh] xl:mt-[-10vh] relative z-20">
              <Works />
            </div>
            <div className="mt-[0]  relative z-30">
              <ZoomParallax>
                <Contact />
              </ZoomParallax>
            </div>
          {/* </div> */}
        </div>
        <Modal />
      </div>
    </ModalContext.Provider>
  );
}

export default App;
