export const chapter06Autonomous = {
  id: "chapter-06",

  title: {
    en: "Autonomous Treasury Layer",
    zh: "自主财资层",
    jp: "自律型財務層",
    bm: "Lapisan Treasury Autonomi",
  },

  description: {
    en: "AI-assisted treasury architecture based on G25, covering autonomous readiness, AI observation, AI reasoning, AI recommendation and AI decision support.",
    zh: "基于 G25 的 AI 辅助财资架构，涵盖自主准备度、AI 观察、AI 推理、AI 建议与 AI 决策支持。",
    jp: "G25 に基づく AI 支援型財務アーキテクチャです。自律準備、AI 観察、AI 推論、AI 推奨、AI 意思決定支援を含みます。",
    bm: "Seni bina treasury berbantukan AI berdasarkan G25 yang merangkumi kesediaan autonomi, pemerhatian AI, penaakulan AI, cadangan AI dan sokongan keputusan AI.",
  },

  learningGoal: {
    en: "Understand how Treasury OS evolves from intelligence-driven operation into AI-assisted observation, reasoning, recommendation and decision support.",
    zh: "理解 Treasury OS 如何从智能驱动操作，演进到 AI 辅助观察、推理、建议与决策支持。",
    jp: "Treasury OS がインテリジェンス主導の運用から、AI 支援による観察、推論、推奨、意思決定支援へ進化する方法を理解します。",
    bm: "Memahami bagaimana Treasury OS berkembang daripada operasi berasaskan kecerdasan kepada pemerhatian, penaakulan, cadangan dan sokongan keputusan berbantukan AI.",
  },

  sections: [
    {
      id: "autonomous-readiness",

      title: {
        en: "Autonomous Readiness",
        zh: "自主准备度",
        jp: "自律準備度",
        bm: "Kesediaan Autonomi",
      },

      meaning: {
        en: "Treasury AI readiness assessment layer.",
        zh: "财资 AI 准备度评估层。",
        jp: "財務 AI 準備度を評価する層です。",
        bm: "Lapisan penilaian kesediaan AI treasury.",
      },

      purpose: {
        en: "Measures whether Treasury OS is ready for AI-assisted treasury supervision.",
        zh: "衡量 Treasury OS 是否已经准备好进入 AI 辅助财资监督。",
        jp: "Treasury OS が AI 支援型財務監督に対応できる状態かを測定します。",
        bm: "Mengukur sama ada Treasury OS bersedia untuk penyeliaan treasury berbantukan AI.",
      },

      usage: {
        en: "Review before relying on AI observation or recommendation layers.",
        zh: "在依赖 AI 观察或 AI 建议层之前先查看。",
        jp: "AI 観察や推奨層を利用する前に確認します。",
        bm: "Semak sebelum bergantung kepada lapisan pemerhatian atau cadangan AI.",
      },
    },

    {
      id: "ai-observation",

      title: {
        en: "AI Observation",
        zh: "AI 观察",
        jp: "AI 観察",
        bm: "Pemerhatian AI",
      },

      meaning: {
        en: "Continuous treasury observation layer.",
        zh: "持续财资观察层。",
        jp: "継続的な財務観察層です。",
        bm: "Lapisan pemerhatian treasury berterusan.",
      },

      purpose: {
        en: "Monitors portfolio activity, liquidity movement, governance pressure, runtime health and recovery status.",
        zh: "监控投资组合活动、流动性变化、治理压力、运行健康与恢复状态。",
        jp: "ポートフォリオ活動、流動性の動き、ガバナンス圧力、ランタイム健全性、回復状況を監視します。",
        bm: "Memantau aktiviti portfolio, pergerakan liquidity, tekanan governance, kesihatan runtime dan status recovery.",
      },

      usage: {
        en: "Use it to let Treasury OS continuously watch important operating signals.",
        zh: "使用它让 Treasury OS 持续观察重要运行信号。",
        jp: "Treasury OS が重要な運用シグナルを継続的に監視するために使用します。",
        bm: "Gunakan untuk membolehkan Treasury OS memerhati isyarat operasi penting secara berterusan.",
      },
    },

    {
      id: "ai-reasoning",

      title: {
        en: "AI Reasoning",
        zh: "AI 推理",
        jp: "AI 推論",
        bm: "Penaakulan AI",
      },

      meaning: {
        en: "Treasury intelligence interpretation layer.",
        zh: "财资智能解读层。",
        jp: "財務インテリジェンス解釈層です。",
        bm: "Lapisan tafsiran kecerdasan treasury.",
      },

      purpose: {
        en: "Explains why treasury conditions exist and what factors may be causing them.",
        zh: "解释财资状态为何出现，以及可能由哪些因素造成。",
        jp: "財務状態がなぜ発生しているか、どの要因が影響しているかを説明します。",
        bm: "Menjelaskan mengapa keadaan treasury berlaku dan faktor yang mungkin menyebabkannya.",
      },

      usage: {
        en: "Use it to understand the reasoning behind treasury signals before accepting recommendations.",
        zh: "在接受建议前，先使用它理解财资信号背后的推理。",
        jp: "推奨を受け入れる前に、財務シグナルの背後にある理由を理解するために使用します。",
        bm: "Gunakan untuk memahami penaakulan di sebalik isyarat treasury sebelum menerima cadangan.",
      },
    },

    {
      id: "ai-recommendation",

      title: {
        en: "AI Recommendation",
        zh: "AI 建议",
        jp: "AI 推奨",
        bm: "Cadangan AI",
      },

      meaning: {
        en: "AI-assisted treasury guidance layer.",
        zh: "AI 辅助财资指导层。",
        jp: "AI 支援型財務ガイダンス層です。",
        bm: "Lapisan panduan treasury berbantukan AI.",
      },

      purpose: {
        en: "Converts AI reasoning into treasury suggestions such as reserve protection, deployment delay, governance review or recovery prioritization.",
        zh: "把 AI 推理转换成财资建议，例如保护储备、延迟部署、治理复核或优先处理恢复。",
        jp: "AI 推論を、準備金保護、展開延期、ガバナンス確認、回復優先などの財務提案へ変換します。",
        bm: "Menukar penaakulan AI kepada cadangan treasury seperti perlindungan reserve, penangguhan deployment, semakan governance atau keutamaan recovery.",
      },

      usage: {
        en: "Use it as advisory support before operator approval or governance action.",
        zh: "在操作员批准或治理行动前，把它作为建议辅助。",
        jp: "オペレーター承認やガバナンス対応の前に助言支援として使用します。",
        bm: "Gunakan sebagai sokongan nasihat sebelum kelulusan operator atau tindakan governance.",
      },
    },

    {
      id: "ai-decision-support",

      title: {
        en: "AI Decision Support",
        zh: "AI 决策支持",
        jp: "AI 意思決定支援",
        bm: "Sokongan Keputusan AI",
      },

      meaning: {
        en: "Human-guided AI treasury assistance layer.",
        zh: "人类主导的 AI 财资辅助层。",
        jp: "人間主導の AI 財務支援層です。",
        bm: "Lapisan bantuan treasury AI berpandukan manusia.",
      },

      purpose: {
        en: "Helps the operator make better treasury decisions while preserving human authority and governance control.",
        zh: "帮助操作员做出更好的财资决策，同时保留人工权限与治理控制。",
        jp: "人間の権限とガバナンス管理を維持しながら、より良い財務判断を支援します。",
        bm: "Membantu operator membuat keputusan treasury yang lebih baik sambil mengekalkan kuasa manusia dan kawalan governance.",
      },

      usage: {
        en: "Use AI guidance as decision support, not as automatic authority replacement.",
        zh: "把 AI 指导作为决策辅助，而不是自动取代人工权限。",
        jp: "AI ガイダンスは意思決定支援として使用し、自動的な権限代替として扱いません。",
        bm: "Gunakan panduan AI sebagai sokongan keputusan, bukan sebagai pengganti automatik kepada kuasa manusia.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Autonomous Readiness",
      "AI Observation",
      "AI Reasoning",
      "AI Recommendation",
      "AI Decision Support",
    ],

    zh: [
      "自主准备度",
      "AI 观察",
      "AI 推理",
      "AI 建议",
      "AI 决策支持",
    ],

    jp: [
      "自律準備度",
      "AI 観察",
      "AI 推論",
      "AI 推奨",
      "AI 意思決定支援",
    ],

    bm: [
      "Kesediaan Autonomi",
      "Pemerhatian AI",
      "Penaakulan AI",
      "Cadangan AI",
      "Sokongan Keputusan AI",
    ],
  },

  summary: {
    en: "Autonomous Treasury Layer represents the transition from intelligence-driven treasury operation to AI-assisted treasury supervision. It introduces readiness assessment, continuous observation, structured reasoning, AI recommendations and human-guided decision support while preserving governance authority.",

    zh: "自主财资层代表 Treasury OS 从智能驱动财资操作，进入 AI 辅助财资监督。它引入准备度评估、持续观察、结构化推理、AI 建议与人类主导的决策支持，同时保留治理权限。",

    jp: "Autonomous Treasury Layer は、Treasury OS がインテリジェンス主導の財務運用から AI 支援型財務監督へ移行する段階を示します。準備度評価、継続的観察、構造化推論、AI 推奨、人間主導の意思決定支援を導入しながら、ガバナンス権限を維持します。",

    bm: "Lapisan Treasury Autonomi mewakili peralihan daripada operasi treasury berasaskan kecerdasan kepada penyeliaan treasury berbantukan AI. Ia memperkenalkan penilaian kesediaan, pemerhatian berterusan, penaakulan berstruktur, cadangan AI dan sokongan keputusan berpandukan manusia sambil mengekalkan kuasa governance.",
  },
};