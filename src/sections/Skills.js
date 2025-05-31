import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer
} from 'recharts';
import { getSkillsData, getRadarData, getLineBreak, getTextPosition } from "../config/skillMap";
import { FaCode, FaServer, FaTools, FaDatabase } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiGit, SiDocker } from "react-icons/si";

// 雷達圖標籤區塊
const CustomTick = ({ payload, x, y, textAnchor }) => {
  const skillsData = getSkillsData();
  const skill = skillsData.find(s => s.name === payload.value);
  const isMobile = window.innerWidth < 1280;
  
  const lines = getLineBreak(payload.value);
  const position = getTextPosition(payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={position.x}
        y={0}
        dy={8}
        textAnchor={position.textAnchor}
        fill={skill.color}
        fontSize={isMobile ? 10 : 12}
        fontWeight={500}
      >
        {skill.icon}
      </text>
      {lines.map((line, index) => (
        <text
          key={index}
          x={position.x}
          y={0}
          dy={28 + (index * 16)}
          textAnchor={position.textAnchor}
          fill={skill.color}
          fontSize={isMobile ? 10 : 12}
          fontWeight={500}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

// 標題區塊
const AnimatedTitle = ({ sectionProgress, isMobile }) => {
  const titleRef = React.useRef(null);
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"]
  });

  const getAnimationPoints = () => {
    if (isMobile) {
      return {
        timePoints: [0, 0.2, 0.3, 0.7, 0.9, 1],
        scalePoints: [0.8, 0.9, 1, 1, 0.9, 0.8],
        opacityPoints: [0, 0.5, 1, 1, 0.5, 0],
        yPoints: [0, 0, 0, 0, 0, 0]
      };
    }
    return {
      timePoints: [0, 0.1, 0.3, 0.7, 0.8, 1],
      scalePoints: [0, 0.5, 1, 1, 0.8, 0.3],
      opacityPoints: [0, 0.5, 1, 1, 0.8, 0],
      yPoints: [100, 20, 0, 0, -20, -100]
    };
  };

  const { timePoints, scalePoints, opacityPoints, yPoints } = getAnimationPoints();

  const scale = useTransform(
    isMobile ? titleProgress : sectionProgress,
    timePoints,
    scalePoints,
    { clamp: false }
  );
  const opacity = useTransform(
    isMobile ? titleProgress : sectionProgress,
    timePoints,
    opacityPoints,
    { clamp: false }
  );
  const y = useTransform(
    isMobile ? titleProgress : sectionProgress,
    timePoints,
    yPoints,
    { clamp: false }
  );

  return (
    <motion.h2
      ref={titleRef}
      style={{
        scale,
        opacity,
        y
      }}
      className="text-4xl sm:text-5xl font-bold text-center text-white mb-12"
    >
      Skills
    </motion.h2>
  );
};

// 技能卡片區塊
const SkillCard = ({ skill, index, sectionProgress, isMobile }) => {
  const cardRef = React.useRef(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // 計算初始位置（從中心向外）
  let initialX = 0;
  let initialY = 0;

  if (index === 0) {
    initialX = 500;
    initialY = -100;
  } else if (index === 1 || index === 2) {
    initialX = -500;
    initialY = 100;
  } else if (index === 3 || index === 4) {
    initialX = -500;
    initialY = -100;
  }

  const getCardAnimationPoints = () => {
    if (isMobile) {
      return {
        timePoints: [0, 0.2, 0.3, 0.7, 0.9, 1],
        scalePoints: [0.8, 0.9, 1, 1, 0.9, 0.8],
        opacityPoints: [0, 0.5, 1, 1, 0.5, 0],
        xPoints: [0, 0, 0, 0, 0, 0],
        yPoints: [0, 0, 0, 0, 0, 0]
      };
    }
    return {
      timePoints: [0, 0.2, 0.3, 0.7, 0.9, 1],
      scalePoints: [0, 0.5, 1, 1, 1.5, 1.8],
      opacityPoints: [0, 0.5, 1, 1, 0.1, 0],
      xPoints: [initialX * 0.5, initialX * 0.2, 0, 0, -initialX * 0.8, -initialX],
      yPoints: [initialY * 0.5, initialY * 0.2, 0, 0, -initialY * 0.8, -initialY]
    };
  };

  const { timePoints, scalePoints, opacityPoints, xPoints, yPoints } = getCardAnimationPoints();

  const scale = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    scalePoints,
    { clamp: false }
  );
  const opacity = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    opacityPoints,
    { clamp: false }
  );
  const x = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    xPoints,
    { clamp: false }
  );
  const y = useTransform(
    isMobile ? cardProgress : sectionProgress,
    timePoints,
    yPoints,
    { clamp: false }
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        x,
        y,
        borderColor: skill.colorAlpha,
        willChange: 'transform, opacity'
      }}
      className="bg-black/40 backdrop-blur-sm border border-white/20 p-4 h-full flex flex-col rounded-[0.5em]"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{skill.icon}</span>
        <h3 className="text-xl font-bold" style={{ color: skill.color }}>
          {skill.name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {skill.keywords.map((keyword, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-xs"
            style={{ 
              backgroundColor: skill.colorAlpha,
              color: skill.color
            }}
          >
            {keyword}
          </span>
        ))}
      </div>
      <ul className="text-white/80 text-[14px] leading-relaxed space-y-1">
        {skill.description.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 line-clamp-1">
            <span className="text-[8px] mt-1.5" style={{ color: skill.color }}>●</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// 雷達圖區塊
const RadarChartComponent = ({ height, isMobile, sectionProgress }) => {
  const radarRef = React.useRef(null);
  const { scrollYProgress: radarProgress } = useScroll({
    target: radarRef,
    offset: ["start end", "end start"]
  });

  const getRadarAnimationPoints = () => {
    if (isMobile) {
      return {
        timePoints: [0, 0.2, 0.3, 0.7, 0.9, 1],
        scalePoints: [0.8, 0.9, 1, 1, 0.9, 0.8],
        opacityPoints: [0, 0.5, 1, 1, 0.5, 0],
        xPoints: [0, 0, 0, 0, 0, 0],
        yPoints: [0, 0, 0, 0, 0, 0]
      };
    }
    return {
      timePoints: [0, 0.2, 0.3, 0.7, 0.8, 1],
      scalePoints: [0, 0.5, 1, 1, 1.5, 1.8],
      opacityPoints: [0, 0.5, 1, 1, 0.2, 0],
      xPoints: [300, 100, 0, 0, -100, -300],
      yPoints: [50, 25, 0, 0, 25, 50]
    };
  };

  const { timePoints, scalePoints, opacityPoints, xPoints, yPoints } = getRadarAnimationPoints();

  const scale = useTransform(
    isMobile ? radarProgress : sectionProgress,
    timePoints,
    scalePoints,
    { clamp: false }
  );
  const opacity = useTransform(
    isMobile ? radarProgress : sectionProgress,
    timePoints,
    opacityPoints,
    { clamp: false }
  );
  const x = useTransform(
    isMobile ? radarProgress : sectionProgress,
    timePoints,
    xPoints,
    { clamp: false }
  );
  const y = useTransform(
    isMobile ? radarProgress : sectionProgress,
    timePoints,
    yPoints,
    { clamp: false }
  );

  return (
    <motion.div
      ref={radarRef}
      style={{
        scale,
        opacity,
        x,
        y,
        height: isMobile ? 'auto' : `${height}px`,
        willChange: 'transform, opacity'
      }}
      className="bg-black/40 backdrop-blur-sm p-6 border border-white/10 rounded-[0.5em]"
    >
      <h3 className="text-2xl font-bold text-white mb-4">Skills Overview</h3>
      <ResponsiveContainer width="100%" height={isMobile ? 400 : "90%"}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getRadarData()}>
          <PolarGrid stroke="rgba(255,255,255,0.2)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={<CustomTick />}
          />
          <PolarRadiusAxis
            angle={18}
            domain={[0, 10]}
            tick={{ fill: 'white', fontSize: isMobile ? 8 : 10, angle: 15 }}
            tickCount={6}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            orientation="left"
          />
          {getSkillsData().map((skill) => (
            <Radar
              key={skill.name}
              name={skill.name}
              dataKey="A"
              stroke={skill.color}
              fill={skill.color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// 主要區塊
export default function Skills() {
  const [radarHeight, setRadarHeight] = useState(550);
  const [isMobile, setIsMobile] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const skillsData = getSkillsData();
  const sectionRef = React.useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 響應式布局處理
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1280);
      
      const baseCardHeight = {
        default: 'auto',
        md: 250,
        xl: 250
      }[width > 1280 ? 'xl' : width >= 768 ? 'md' : 'default'];
      
      const cardCount = 3;
      const gapSize = 16;
      const radarHeight = width < 768 ? 'auto' : (baseCardHeight * cardCount) + (gapSize * (cardCount - 1));
      
      setRadarHeight(radarHeight);
      setCardHeight(baseCardHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-6xl mx-auto">
        <AnimatedTitle sectionProgress={sectionProgress} isMobile={isMobile} />

        {/* 主要內容區塊 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* 左側區塊 */}
          <div className="space-y-4">
            <RadarChartComponent 
              height={radarHeight} 
              isMobile={isMobile}
              sectionProgress={sectionProgress}
            />
            {/* 左側卡片 */}
            <div style={{ height: isMobile ? 'auto' : `${cardHeight}px` }}>
              <SkillCard 
                key={skillsData[0].name} 
                skill={skillsData[0]} 
                index={0}
                sectionProgress={sectionProgress}
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* 右側卡片區塊 */}
          <div className="grid grid-cols-1 gap-4">
            {skillsData.slice(1).map((skill, index) => (
              <div key={skill.name} style={{ height: isMobile ? 'auto' : `${cardHeight}px` }}>
                <SkillCard 
                  skill={skill} 
                  index={index + 1}
                  sectionProgress={sectionProgress}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
