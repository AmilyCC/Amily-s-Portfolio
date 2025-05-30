import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaExternalLinkAlt, 
  FaUserTie, 
  FaCode, 
  FaLightbulb, 
  FaChartLine
} from "react-icons/fa";
import { getSkillColor } from "../config/skillMap";
import { ModalContext } from "../App";

// 專案內容配置
const projectContents = {
  "Amily的旅日地圖": {
    overview: {
      icon: FaCode,
      iconColor: "teal",
      title: "專案概述",
      content: "利用 ChatGPT 生成所有圖像素材，結合前端互動技術，打造可放大、縮小、平移與點擊觸發資訊的互動式日本旅遊地圖，呈現我在日本打工度假期間的足跡與回憶。",
      url: "https://amilycc.github.io/JP-map/"
    },
    role: {
      icon: FaUserTie,
      iconColor: "purple",
      title: "我的角色",
      content: "個人 side project，從構想到設計、開發與部署皆由我獨立完成，結合 AI 圖像與互動地圖，作為創意實驗與生活紀錄。"
    },
    process: {
      icon: FaChartLine,
      iconColor: "emerald",
      title: "專案流程簡述",
      steps: [
        "使用 ChatGPT 生成地圖角色與地點圖片",
        "與 AI 共構討論功能結構，開發 MVP 原型",
        "實作互動式地圖，支援點擊、平移、縮放與彈窗",
        "調整使用者操作邏輯與畫面比例配置",
        "圖片轉換 webp 與 lazy loading 優化載入速度",
        "最終部署至 GitHub 並作為互動作品展示"
      ]
    },
    challenges: {
      icon: FaLightbulb,
      iconColor: "amber",
      title: "UX 決策與挑戰",
      items: [
        {
          title: "圖釘點擊行為與探索機制設計",
          problem: "圖釘點擊後彈窗位置不穩，缺乏明確回饋與探索動機。",
          thought: "使用者需能辨識目前點選內容並具備明確回饋機制。",
          solution: "設計固定定位與動畫回饋，並加入已探索樣式與探索進度條。"
        },
        {
          title: "新手使用指引設計",
          problem: "早期試用者不清楚操作方式，導致探索意願低。",
          thought: "需提供使用前引導說明，降低進入障礙。",
          solution: "新增進入頁面，簡要說明互動方式與使用流程。"
        },
        {
          title: "行動裝置互動體驗優化",
          problem: "手機畫面空間有限，圖釘重疊造成操作困難。",
          thought: "需導入縮放與拖曳功能，提升使用彈性與可點擊性。",
          solution: "加入地圖放大與拖曳機制，確保每個圖釘可順利點擊與觀看。"
        },
        {
          title: "圖片載入效能優化",
          problem: "地圖圖像素材數量大，影響初次載入速度。",
          thought: "圖片需控制檔案大小並避免一次性全載。",
          solution: "轉為 webp 格式並導入 lazy loading，提升效能表現。"
        }
      ]
    },
    reflection: {
      icon: FaLightbulb,
      iconColor: "blue",
      title: "收穫與反思",
      content: "這是我首次將 AI 圖像與 UX 流程完整結合的互動作品，從 prompt 調教到地圖體驗優化，過程中不斷測試、微調與修正，讓我更理解視覺呈現、操作邏輯與效能之間的平衡，並強化了我從 0 到 1 推動產品的能力。"
    }
  },
  "心理測驗原型網站": {
    overview: {
      icon: FaCode,
      iconColor: "teal",
      title: "專案概述",
      content: "使用 Node.js、Express、Bootstrap、body-parser、mongoose 和 nodemon 開發，具備資料庫儲存與運算功能，使用者可作答心理測驗、即時獲得結果並分享至社群。",
      url: ""
    },
    role: {
      icon: FaUserTie,
      iconColor: "purple",
      title: "我的角色",
      content: "擔任技術負責人，主導使用者流程設計與原型規劃，從前端切版、後端資料設計到雲端部署均有參與，並協調設計、企劃與開發需求整合。"
    },
    process: {
      icon: FaChartLine,
      iconColor: "emerald",
      title: "專案流程簡述",
      steps: [
        "功能需求釐清與規格轉換",
        "使用測試素材快速完成 MVP 原型試作",
        "前後端分工開發，整合測驗邏輯與結果運算",
        "使用 mongoose 建立資料模型並串接",
        "後期部署至 Google Cloud Console",
        "GitHub 管理版本與多人協作流程"
      ]
    },
    challenges: {
      icon: FaLightbulb,
      iconColor: "amber",
      title: "UX 決策與挑戰",
      items: [
        {
          title: "選項設計簡化",
          problem: "原始企劃設定多選項題目，增加作答難度與製作成本。",
          thought: "使用者面對過多選項可能造成認知疲勞，導致中途放棄。",
          solution: "建議改為統一 A/B 題型，簡化操作流程與出題成本。"
        },
        {
          title: "使用者資料填寫優化",
          problem: "測驗前要求填寫大量個資，降低使用意願。",
          thought: "在無信任基礎下先填資料，跳出率高。",
          solution: "建議非必要資料改為選填，保留轉換率與數據收集彈性。"
        },
        {
          title: "手機版視覺與效能取捨",
          problem: "原設計在手機版上動畫與圖片過重，影響效能。",
          thought: "行動裝置應優先考慮效能與操作流程清晰。",
          solution: "建議精簡視覺內容並刪減部分 JS 效果，提升載入速度。"
        },
        {
          title: "進度提示設計",
          problem: "使用者填答過程無法掌握進度，易半途放棄。",
          thought: "缺乏預期感會提升焦慮，降低完成率。",
          solution: "加入無文字式進度條，不干擾畫面的前提下提升體驗完成度。"
        }
      ]
    },
    reflection: {
      icon: FaLightbulb,
      iconColor: "blue",
      title: "收穫與反思",
      content: "這次專案讓我更深刻理解 UX 決策在實務開發中的重要性。面對多方角色與意見差異，我學會如何以使用者體驗為出發點，提出具體、可落地的建議，並透過快速原型試作與簡化流程設計，有效推動整體產品進展。"
    }
  },
  "前端小型作品集": {
  overview: {
    icon: FaCode,
    iconColor: "gray",
    title: "專案概述",
    content: "收錄多個以 HTML、CSS、JavaScript、Bootstrap 和 jQuery 製作的小型互動網頁，涵蓋動畫、表單、模擬 UI 等實作範例，是我在學習前端過程中的階段性成果展示。",
    url: "https://amilycc.github.io/CodeShowcase/"
  },
  role: {
    icon: FaUserTie,
    iconColor: "purple",
    title: "我的角色",
    content: "所有作品皆由我獨立完成，涵蓋排版設計、動態效果、元件操作與互動邏輯，藉由實作各種場景累積開發經驗與程式邏輯能力。"
  },
  process: {
    icon: FaChartLine,
    iconColor: "emerald",
    title: "專案流程簡述",
    steps: [
      "根據主題挑選互動元件或特效作為挑戰目標",
      "使用 HTML、CSS 建立版面與動畫邏輯",
      "結合 JavaScript / jQuery 撰寫互動邏輯",
      "部分使用 Bootstrap 加速響應式設計開發",
      "成果整合於 GitHub Pages 作為展示平台"
    ]
  },
  challenges: {
    icon: FaLightbulb,
    iconColor: "amber",
    title: "開發的學習與觀察",
    items: [
      {
        title: "MVC 架構練習",
        problem: "早期作品將結構與邏輯混寫，導致維護與除錯困難。",
        thought: "良好的前端專案結構有助於後續擴充與邏輯拆分。",
        solution: "開始將資料、畫面與控制邏輯分層，練習用 MVC 思維規劃前端結構。"
      },
      {
        title: "jQuery 與 Bootstrap 實作應用",
        problem: "初期對第三方套件操作不熟，常語法重複或誤用元件。",
        thought: "靈活運用現成套件是提升開發效率的關鍵能力之一。",
        solution: "實作常見 UI 元件與互動邏輯，掌握 jQuery 操作與 Bootstrap 元件應用與限制。"
      },
      {
        title: "非同步 async 操作練習",
        problem: "初期對非同步流程掌握不佳，導致資料順序錯誤或畫面異常。",
        thought: "理解 async/await 與 Promise 流程是處理資料載入的核心技能。",
        solution: "練習串接公開 API，使用 async 寫法優化資料處理流程與錯誤捕捉邏輯。"
      },
      {
        title: "響應式練習",
        problem: "早期作品在手機上常出現跑版或內容溢出。",
        thought: "穩定的版面排版需依裝置斷點規劃不同顯示邏輯。",
        solution: "初期優先考量以RWD設計邏輯為基礎，輔以 Bootstrap Grid 與 相對定位等實作跨裝置調整。"
      }
    ]
  },
  reflection: {
    icon: FaLightbulb,
    iconColor: "blue",
    title: "收穫與反思",
    content: "透過這些小型作品，我從語法學習轉向結構設計與互動體驗實作，逐步建立了前端邏輯、模組化思維與版面敏感度，也更熟悉各類常用元件與非同步資料處理方式。這些專案是我技術成長的重要里程碑。"
  }
}

};

export default function Modal() {
  const { selectedWork, setSelectedWork } = useContext(ModalContext);

  // 監聽滾動事件，任何滾動都會關閉 Modal
  useEffect(() => {
    if (!selectedWork) return;

    // 使用 requestAnimationFrame 來優化滾動處理
    let ticking = false;
    const handleScroll = (e) => {
      // 檢查滾動是否發生在 Modal 內部
      const modalContent = document.querySelector('.modal-content');
      if (modalContent && modalContent.contains(e.target)) {
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setSelectedWork(null);
          ticking = false;
        });
        ticking = true;
      }
    };

    // 添加滾動監聽
    window.addEventListener('scroll', handleScroll, { passive: true });
    // 添加 wheel 事件監聽
    window.addEventListener('wheel', handleScroll, { passive: true });
    // 添加 touchmove 事件監聽（用於移動設備）
    window.addEventListener('touchmove', handleScroll, { passive: true });

    // 添加點擊監聽
    const handleClickOutside = (e) => {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(e.target)) {
        setSelectedWork(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedWork, setSelectedWork]);

  const renderContent = (work) => {
    const content = projectContents[work.title];
    if (!content) return null;

    return (
      <div className="space-y-6">
        {/* 專案概述 */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-5 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center backdrop-blur-sm">
              <content.overview.icon className="text-xl" style={{ stroke: '#2DD4BF', fill: '#2DD4BF', strokeWidth: '1.5' }} />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white">{content.overview.title}</h4>
          </div>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{content.overview.content}</p>
        </div>

        {/* 我的角色 */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-5 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center backdrop-blur-sm">
              <content.role.icon className="text-xl" style={{ stroke: '#C084FC', fill: '#C084FC', strokeWidth: '1.5' }} />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white">{content.role.title}</h4>
          </div>
          <p className="text-zinc-300 text-sm md:text-base">{content.role.content}</p>
        </div>

        {/* 專案流程簡述 */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-5 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center backdrop-blur-sm">
              <content.process.icon className="text-xl" style={{ stroke: '#34D399', fill: '#34D399', strokeWidth: '1.5' }} />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white">{content.process.title}</h4>
          </div>
          <ul className="space-y-2 text-zinc-300 text-sm md:text-base">
            {content.process.steps.map((step, index) => (
              <li key={index} className="flex items-center gap-2 group">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center text-xs text-emerald-300 group-hover:scale-110 transition-transform">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* UX 決策與挑戰 */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-5 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center backdrop-blur-sm">
              <content.challenges.icon className="text-xl" style={{ stroke: '#FBBF24', fill: '#FBBF24', strokeWidth: '1.5' }} />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white">{content.challenges.title}</h4>
          </div>
          <div className="space-y-4">
            {content.challenges.items.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 rounded-lg p-4 border border-zinc-700/20 hover:border-zinc-600/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="text-sm md:text-base font-semibold text-white">{item.title}</h5>
                </div>
                <div className="space-y-1.5 text-zinc-300 text-xs md:text-sm">
                  <p className="flex items-start gap-2">
                    <span className="text-rose-300 font-medium whitespace-nowrap text-sm md:text-base">問題：</span>
                    <span className="text-sm md:text-base">{item.problem}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-300 font-medium whitespace-nowrap text-sm md:text-base">思考：</span>
                    <span className="text-sm md:text-base">{item.thought}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-300 font-medium whitespace-nowrap text-sm md:text-base">實作：</span>
                    <span className="text-sm md:text-base">{item.solution}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 收穫與反思 */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-5 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center backdrop-blur-sm">
              <content.reflection.icon className="text-xl" style={{ stroke: '#60A5FA', fill: '#60A5FA', strokeWidth: '1.5' }} />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white">{content.reflection.title}</h4>
          </div>
          <p className="text-zinc-300 text-sm md:text-base">{content.reflection.content}</p>
        </div>

        {/* 技能標籤 */}
        <div className="flex flex-wrap gap-1.5">
          {work.skills.map((skill, index) => {
            const skillColor = getSkillColor(skill);
            return (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: `${skillColor}15`,
                  color: skillColor,
                  boxShadow: `0 0 20px ${skillColor}15`
                }}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {selectedWork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-end pointer-events-none"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300
            }}
            className="modal-content fixed top-[10] right-0 -translate-y-1/2 bg-gradient-to-br from-zinc-900/95 to-zinc-800/95 backdrop-blur-xl rounded-l-3xl w-full md:w-[55%] h-auto max-h-[90vh] border-l border-zinc-700/50 shadow-2xl overflow-hidden pointer-events-auto"
          >
            {/* 固定的標題區域 */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-zinc-900/95 to-zinc-900/80 backdrop-blur-xl border-b border-zinc-700/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    {selectedWork.title}
                  </h3>
                  {projectContents[selectedWork.title]?.overview?.url && (
                    <a
                      href={projectContents[selectedWork.title].overview.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-xs md:text-sm"
                      title="在新視窗開啟"
                    >
                      <span>前往網站</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors text-lg"
                >
                  ×
                </button>
              </div>
            </div>

            {/* 可滾動的內容區域 */}
            <div className="overflow-y-auto h-[calc(90vh-72px)] px-6 py-4 scrollbar-thin scrollbar-thumb-zinc-600/50 scrollbar-track-zinc-800/30 hover:scrollbar-thumb-zinc-500/50"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(82, 82, 91, 0.5) rgba(39, 39, 42, 0.3)',
              }}
            >
              <style jsx global>{`
                .modal-content::-webkit-scrollbar {
                  width: 6px;
                }
                
                .modal-content::-webkit-scrollbar-track {
                  background: rgba(39, 39, 42, 0.3);
                  border-radius: 3px;
                }
                
                .modal-content::-webkit-scrollbar-thumb {
                  background: rgba(82, 82, 91, 0.5);
                  border-radius: 3px;
                  transition: background 0.2s ease;
                }
                
                .modal-content::-webkit-scrollbar-thumb:hover {
                  background: rgba(113, 113, 122, 0.5);
                }
                
                .modal-content {
                  scroll-behavior: smooth;
                }
              `}</style>
              
              {renderContent(selectedWork)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 