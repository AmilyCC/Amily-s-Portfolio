import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  {
    name: "Front-end",
    icon: "💻",
    level: 90,
    color: "#4F46E5",
    description: "React.js、Vue.js、API",
  },
  {
    name: "UI/UX",
    icon: "🎨",
    level: 85,
    color: "#7C3AED",
    description: "Figma, Adobe XD, Responsive Design",
  },
  {
    name: "Database",
    icon: "🗄️",
    level: 70,
    color: "#EC4899",
    description: "MongoDB, MySQL, ADH",
  },
  {
    name: "SEO",
    icon: "🔍",
    level: 85,
    color: "#10B981",
    description: "Technical SEO, Analytics, Optimization",
  },
  {
    name: "AI/Automation",
    icon: "🤖",
    level: 70,
    color: "#F59E0B",
    description: "ChatGPT, make, vibe coding",
  },
];

const SkillCard = ({ skill, index }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95, rotateY: 0 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full max-w-sm"
    >
      <motion.div
        className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20"
        style={{ y }}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{skill.icon}</span>
          <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
        </div>
        
        <div className="relative h-2 bg-white/20 rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        
        <p className="text-white/80 text-sm">{skill.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-center text-white mb-16"
        >
          My Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
