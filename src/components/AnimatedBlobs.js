import React from "react";

export default function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {/* 藍色光斑 */}
      <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-cyan-400 opacity-30 rounded-full blur-3xl animate-blob1" />
      {/* 紫色光斑 */}
      <div className="absolute right-1/4 top-1/3 w-[350px] h-[350px] bg-purple-400 opacity-30 rounded-full blur-3xl animate-blob2" />
      {/* 綠色光斑 */}
      <div className="absolute left-1/3 bottom-0 w-[300px] h-[300px] bg-teal-400 opacity-20 rounded-full blur-3xl animate-blob3" />
      <style>{`
        @keyframes blob1 {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-40px) scale(1.1); }
        }
        @keyframes blob2 {
          0%,100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(60px) scale(1.08); }
        }
        @keyframes blob3 {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(40px) scale(1.12); }
        }
        .animate-blob1 { animation: blob1 8s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 10s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
} 