import React from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = ({ progress }) => {
  // 計算各種動畫值
  const diverX = progress * (window.innerWidth - 100);
  const waterOpacity = 0.2 + (progress * 0.6);
  const bubblesOpacity = 1 - (progress * 0.7);

  // bar 無邊框
  // 計算背景漸層顏色
  const getGradient = () => {
    // 起始：白→亮藍綠，結束：亮藍綠→深藍
    const startTop = [255, 255, 255, 0.9];
    const startBottom = [4, 223, 216, 0.9];
    const endTop = [4, 223, 216, 0.9];
    const endBottom = [25, 8, 64, 0.9];

    // 根據 progress 插值
    const lerp = (a, b, t) => a + (b - a) * t;
    const colorToStr = (c) => `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
    const top = [
      Math.round(lerp(startTop[0], endTop[0], progress)),
      Math.round(lerp(startTop[1], endTop[1], progress)),
      Math.round(lerp(startTop[2], endTop[2], progress)),
      lerp(startTop[3], endTop[3], progress)
    ];
    const bottom = [
      Math.round(lerp(startBottom[0], endBottom[0], progress)),
      Math.round(lerp(startBottom[1], endBottom[1], progress)),
      Math.round(lerp(startBottom[2], endBottom[2], progress)),
      lerp(startBottom[3], endBottom[3], progress)
    ];
    return `linear-gradient(to bottom, ${colorToStr(top)}, ${colorToStr(bottom)})`;
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-6 z-[9999] pointer-events-none"
      style={{ 
        opacity: 1,
        background: getGradient(),
        border: 0
      }}
    >
      {/* 背景漸變 */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: waterOpacity, border: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" style={{border:0}} />
      </div>

      {/* 潛水員 */}
      <motion.div 
        className="absolute"
        style={{ 
          x: `calc(-10% + ${diverX}px)`,
          bottom: `-38px`,
          transition: { type: "spring", stiffness: 50, damping: 20 }
        }}
      >
         <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="80" height="80" viewBox="0 0 1024.000000 1024.000000"
 preserveAspectRatio="xMidYMid meet">

<defs>
  <filter id="white-glow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="0" stdDeviation="500" flood-color="#FFF" flood-opacity="1"/>
    <feDropShadow dx="0" dy="0" stdDeviation="80" flood-color="#FFF" flood-opacity="0.8"/>
    <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#FFF" flood-opacity="0.3"/>
  </filter>
</defs>

<g filter="url(#white-glow)" transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M1992 7538 c-44 -44 39 -235 186 -431 181 -240 590 -611 836 -758
l54 -33 7 -90 c11 -155 35 -355 61 -506 46 -271 153 -658 215 -782 11 -21 19
-42 19 -47 0 -5 -45 10 -100 34 -287 126 -638 376 -704 502 -19 37 -64 79 -99
92 -44 17 -88 13 -145 -14 -74 -34 -154 -119 -246 -260 -131 -200 -223 -312
-401 -491 -255 -256 -457 -406 -705 -525 -69 -33 -145 -70 -170 -82 -55 -27
-64 -57 -23 -77 16 -8 74 -15 138 -18 304 -11 645 132 1007 422 162 131 384
357 465 475 1 2 58 -49 125 -115 423 -410 924 -722 1404 -873 296 -93 437 -93
954 0 690 124 1235 260 1783 443 l188 63 29 -58 c106 -209 356 -564 454 -643
61 -50 134 -83 243 -111 213 -53 431 -74 833 -82 424 -8 515 7 609 95 58 54
116 169 126 248 11 88 -44 140 -172 163 -79 15 -161 2 -285 -43 l-97 -35 -133
14 c-192 21 -557 74 -595 86 -52 16 -107 90 -181 242 -66 134 -162 379 -162
412 0 14 4 13 38 -1 134 -58 175 -67 297 -68 110 -1 125 1 184 26 82 35 162
96 205 155 34 48 37 73 7 73 -9 0 -21 4 -27 8 -7 4 25 8 70 9 75 3 79 2 56
-12 -22 -12 -22 -14 -6 -15 30 0 120 100 154 171 38 80 72 211 72 278 0 85
-41 159 -104 186 -25 11 -32 24 -51 88 -29 100 -76 177 -158 258 -119 118
-267 179 -435 179 -224 0 -422 -126 -522 -333 -38 -79 -70 -180 -70 -220 0
-14 -4 -17 -17 -12 -10 4 -77 10 -148 12 -158 7 -177 2 -550 -134 -706 -258
-1328 -465 -1587 -528 -188 -45 -570 -105 -671 -105 -41 0 -231 233 -340 417
-139 235 -242 483 -338 818 -35 120 -42 160 -48 280 -11 196 -24 215 -196 305
-329 172 -676 426 -1051 771 -86 79 -170 154 -187 166 -34 25 -76 30 -95 11z
m6171 -1945 c-7 -2 -21 -2 -30 0 -10 3 -4 5 12 5 17 0 24 -2 18 -5z m117 -3
c-30 -3 -66 -4 -80 0 -14 4 10 7 55 7 75 0 77 0 25 -7z m113 -7 c-7 -2 -21 -2
-30 0 -10 3 -4 5 12 5 17 0 24 -2 18 -5z m78 -45 c3 -5 10 -8 15 -6 5 1 22
-20 37 -47 25 -45 27 -57 23 -121 -4 -67 -39 -210 -56 -227 -10 -11 -22 56
-14 79 4 11 4 16 0 13 -10 -9 -26 -70 -17 -64 5 2 11 -8 14 -23 6 -27 -17 -84
-52 -130 l-17 -23 -12 25 c-8 18 -8 25 -1 23 6 -1 13 6 14 16 4 20 -6 22 -25
5 -7 -7 -5 -1 6 13 10 15 23 24 28 21 5 -3 6 -1 3 5 -4 6 2 28 12 49 37 76 54
154 49 226 -3 37 -3 66 1 64 3 -2 4 16 2 40 -2 35 -7 44 -20 42 -9 -1 -27 8
-40 21 l-23 23 33 -7 c19 -4 37 -12 40 -17z m-441 -14 c0 -8 -5 -12 -10 -9 -6
4 -8 11 -5 16 9 14 15 11 15 -7z m385 -5 c-3 -3 9 -19 25 -34 17 -16 30 -32
30 -37 0 -4 -15 9 -34 29 -30 33 -42 38 -93 44 l-58 7 67 -1 c36 -1 65 -4 63
-8z m-165 -20 c-19 -11 -52 -39 -74 -62 -33 -36 -35 -37 -16 -9 23 35 95 92
114 92 6 0 -5 -9 -24 -21z m147 -9 c18 -10 39 -30 47 -43 56 -84 0 -305 -100
-397 -48 -44 -79 -55 -128 -46 -44 8 -102 72 -112 121 -17 93 23 233 89 311
33 38 101 74 142 74 17 0 44 -9 62 -20z m-382 0 c3 -5 1 -10 -5 -10 -11 0 -24
-11 -48 -41 -7 -9 -17 -42 -23 -73 -8 -45 -7 -61 3 -74 10 -12 10 -14 1 -8
-10 5 -13 -12 -14 -76 -1 -66 -3 -77 -10 -53 -25 80 1 251 48 313 25 33 37 39
48 22z m103 -147 c-6 -16 -16 -50 -23 -78 l-13 -50 2 56 c0 32 4 53 7 47 4 -5
11 4 17 21 6 17 13 31 16 31 3 0 0 -12 -6 -27z m-41 -165 c-3 -7 -5 -2 -5 12
0 14 2 19 5 13 2 -7 2 -19 0 -25z m10 -60 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13
3 -3 4 -12 1 -19z m-123 -28 c10 -13 9 -13 -6 -1 -10 7 -18 21 -17 30 0 13 1
14 6 1 3 -8 11 -22 17 -30z m140 -6 c3 -8 2 -12 -4 -9 -6 3 -10 10 -10 16 0
14 7 11 14 -7z m80 -93 c-3 -3 -15 6 -27 18 l-22 24 27 -19 c14 -10 24 -21 22
-23z m161 29 c-3 -5 -16 -15 -28 -21 -19 -9 -19 -8 3 10 28 23 34 26 25 11z
m-224 -25 c19 -8 29 -14 23 -15 -7 0 -27 7 -45 15 -19 8 -29 14 -23 15 7 0 27
-7 45 -15z"/>
<path d="M8494 5490 c0 -13 4 -16 10 -10 7 7 7 13 0 20 -6 6 -10 3 -10 -10z"/>
<path d="M8491 5384 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"/>
<path d="M8492 5305 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z"/>
<path d="M8272 4934 c9 -9 21 -15 27 -13 6 2 -2 10 -17 17 -25 11 -25 11 -10
-4z"/>
</g>
</svg>
        <motion.div 
          className="absolute"
          style={{
            left: 65,
            top: 18,
            opacity: bubblesOpacity,
            transition: { type: "spring", stiffness: 50, damping: 20 }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <motion.circle 
              cx="10" 
              cy="10" 
              r="2" 
              fill="white"
              animate={{
                y: [0, -10, -20],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.circle 
              cx="15" 
              cy="8" 
              r="1.5" 
              fill="white"
              animate={{
                y: [0, -8, -16],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2
              }}
            />
            <motion.circle 
              cx="5" 
              cy="12" 
              r="1" 
              fill="white"
              animate={{
                y: [0, -6, -12],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollProgress; 