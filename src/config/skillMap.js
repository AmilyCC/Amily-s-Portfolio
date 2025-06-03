// 技能類別配置
export const skillCategories = {
  collab: {
    name: "協作與專案管理",
    icon: "🤝",
    color: "var(--skill-collab)",
    colorAlpha: "var(--skill-collab-20)",
    keywords: ["#Git", "#GitHub", "#Notion", "#專案管理", "#團隊協作"],
    description: [
      "熟練 Git 團隊開發流程，能進行 Pull Request 與 Issue 協作",
      "實際參與多人協作開發，熟悉 GitHub 分支與版本控制",
      "使用 Notion 建立文件架構，統整會議紀錄、需求與進度追蹤",
      "熟悉簡易的任務分派與專案流程管理，能協調成員溝通",
      "習慣撰寫與整理技術紀錄、交接資料，提升團隊透明度"
    ],
    level: 8,
    lineBreak: ["協作與", "專案管理"],
    textPosition: { x: 0, textAnchor: "middle" }
  },
  uiux: {
    name: "UI/UX 規劃",
    icon: "🔍",
    color: "var(--skill-uiux)",
    colorAlpha: "var(--skill-uiux-20)",
    keywords: ["#Figma", "#使用者訪談","#UX Design" ,"#UI Flow", "#prototyping", "#MVP"],
    description: [
      "具備基礎 Figma 操作能力，可製作線框圖、設計稿與互動原型",
      "熟悉使用者訪談流程，能蒐集用戶回饋並整理同理心地圖",
      "能獨立規劃 UI Flow、Function Map、資訊架構等流程設計",
      "實務操作過 MVP 概念，快速驗證產品方向與使用者需求",
      "能據用戶行為數據與測試結果提出優化方案，提升 UX 效率與滿意度"
    ],
    level: 8.5,
    lineBreak: ["UI/UX", "規劃"],
    textPosition: { x: 20, textAnchor: "start" }
  },
  ai: {
    name: "DB與AI應用",
    icon: "🤖",
    color: "var(--skill-ai)",
    colorAlpha: "var(--skill-ai-20)",
    keywords: ["#SQL", "#Looker Studio", "#ChatGPT","#Cursor" ,"#n8n", "#Make"],
    description: [
      "使用 SQL 查詢資料，結合 Looker Studio 製作商業儀表板",
      "分析營運數據，協助主管進行決策或提案呈現",
      "實作自動化流程，整合 ChatGPT、n8n、Make、Cursor 等工具",
      "導入 ChatGPT 協作系統、自動化表單與通知流程",
      "優化團隊日常任務流程，減少約 60% 重複性人工作業"
    ],
    level: 7,
    lineBreak: ["DB與AI", "應用"],
    textPosition: { x: 0, textAnchor: "end" }
  },
  dev: {
    name: "前後端開發",
    icon: "💻",
    color: "var(--skill-dev)",
    colorAlpha: "var(--skill-dev-20)",
    keywords: ["#React.js", "#Vue.js", "#Node.js", "#Express", "#Next.js", "#HTML", "#CSS", "#JavaScript", "#Bootstrap","Tailwind CSS", "#jQuery"],
    description: [
      "熟悉 HTML5 / CSS3 / JavaScript，具備堅實前端基礎",
      "實務使用 React.js、Vue.js、Bootstrap、Tailwind CSS 開發多個專案",
      "能獨立建構響應式（RWD）與單頁應用（SPA）網站",
      "使用 Express、Node.js、Next.js 開發後端 API 串接功能",
      "曾開發簡易互動遊戲與動畫功能，熟悉前後端整合流程"
    ],
    level: 8.6,
    lineBreak: ["前後端", "開發"],
    textPosition: { x: 0, textAnchor: "start" }
  },
  ecommerce: {
    name: "電子商務",
    icon: "🛍️",
    color: "var(--skill-ecommerce)",
    colorAlpha: "var(--skill-ecommerce-20)",
    keywords: ["#Shopify", "#SHOPLINE", "#SEO", "Liquid","#Google Ads", "#Facebook Ads","#LiFF","#LINE Messaging API"],
    description: [
      "熟悉 Shopify / SHOPLINE 開站流程與 Liquid 語法編輯",
      "可操作 GA、Meta Pixel 等廣告追蹤碼的安裝與驗證",
      "熟悉 SEO 架構調整、關鍵字優化與站內內容規劃",
      "具LiFF及LINE Messaging API串接經驗，協助社群行銷",
      "具 API 串接與簡易後台整合經驗，可協助建立電商資料流程"
    ],
    level: 9,
    lineBreak: ["電子", "商務"],
    textPosition: { x: 0, textAnchor: "middle" }
  }
};

// 獲取技能顏色的函數
export const getSkillColor = (skill) => {
  // 遍歷所有類別
  for (const category of Object.values(skillCategories)) {
    // 如果技能在該類別的關鍵字中
    if (category.keywords.includes(skill)) {
      return category.color;
    }
  }
  // 如果找不到對應的類別，返回預設顏色
  return "var(--skill-dev)";
};

// 獲取技能數據的函數
export const getSkillsData = () => {
  return Object.values(skillCategories);
};

// 獲取雷達圖數據的函數
export const getRadarData = () => {
  return getSkillsData().map(skill => ({
    subject: skill.name,
    A: skill.level,
    fullMark: 10
  }));
};

// 獲取標籤換行配置的函數
export const getLineBreak = (category) => {
  const skill = Object.values(skillCategories).find(s => s.name === category);
  return skill?.lineBreak || [category];
};

// 獲取標籤位置配置的函數
export const getTextPosition = (category) => {
  const skill = Object.values(skillCategories).find(s => s.name === category);
  return skill?.textPosition || { x: 0, textAnchor: "middle" };
}; 