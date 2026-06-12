import { useState } from "react";
import TreasuryDemoBanner from "../components/demo/TreasuryDemoBanner";
import useWorkspaceMode from "../hooks/useWorkspaceMode";

const MANUAL = {
  en: {
    title: "Treasury Console Architecture & Operating Manual",
    subtitle:
      "A simple, institutional guide to understand Treasury Console, governance, recovery workflow, Decision Brain, and treasury crisis testing.",
    quick: [
      ["Treasury Console", "Controls liquidity, recovery, governance, restriction, and treasury risk."],
      ["Governance", "Prevents unsafe capital deployment before liquidity becomes dangerous."],
      ["Recovery Queue", "Tracks treasury incidents from OPEN to REVIEW, READY, and RESOLVED."],
      ["Decision Brain", "Classifies treasury condition as NORMAL, WARNING, RESTRICTED, or LOCKDOWN."],
    ],
    architectureMapLabel: "Architecture Map",
    architectureMapTitle: "How Treasury Console Thinks",
    architectureMap: [
      "Portfolio Records",
      "Risk Intelligence",
      "Decision Brain",
      "Recovery Queue",
      "Governance Action",
      "Audit / Timeline",
    ],
    sections: [
      ["1. Treasury Console Purpose", "Treasury Console is the command center of FD Wealth Engine. It helps users understand whether capital is safe, deployable, restricted, or under treasury stress."],
      ["2. Treasury Operating Philosophy", "A treasury system should not only chase return. It must protect liquidity, preserve reserve, prevent over-deployment, and explain every decision through audit logic."],
      ["3. Recovery Queue Engine", "The Recovery Queue collects treasury incidents. OPEN means a case is detected. REVIEW means it needs checking. READY means action can be prepared. RESOLVED means the risk has been handled."],
      ["4. Routing Engine", "The Routing Engine sends treasury cases to the correct desk: Review Desk, Approval Desk, Recovery Execution Desk, or Treasury Escalation Desk."],
      ["5. Decision Brain", "The Decision Brain studies deployable funds, reserve pressure, liquidity buffer, policy breach, recovery status, and stress level before generating an institutional recommendation."],
      ["6. Governance / Restriction / Lockdown", "Governance gives warning. Restriction limits unsafe action. Lockdown means the system considers the treasury condition too risky for normal deployment."],
      ["7. Treasury Crisis Simulation", "To test a crisis, create a very large FD record that uses most deployable cash. Then return to Treasury Console and observe liquidity stress, restriction, warning, or lockdown signals."],
      ["8. Institutional Banking Logic", "Banks use reserve protection, liquidity control, approval layers, escalation workflow, and audit records because capital safety is as important as return."],
      ["9. Future Treasury Roadmap", "Future layers may include auto execution restriction, live deployment blocking, reserve threshold engine, AI Treasury Decision Layer, stress simulation, liquidity shock model, and institutional audit replay."],
    ],
    statusLabel: "Decision Brain Status Model",
    statusTitle: "NORMAL → WARNING → RESTRICTED → LOCKDOWN",
    statusBody:
      "This model helps users understand whether the treasury system is healthy, under observation, restricted, or in critical protection mode.",
    workflowLabel: "Treasury Workflow Lifecycle",
    workflowTitle: "Institutional Recovery Flow",
    workflow: [
      ["OPEN", "Treasury incident detected."],
      ["REVIEW", "Risk and governance validation."],
      ["READY", "Recovery action prepared."],
      ["EXECUTED", "Treasury recovery performed."],
      ["RESOLVED", "Liquidity stability restored."],
    ],
    architectureLabel: "Architecture Diagram",
    architectureTitle: "Treasury Intelligence Architecture",
    architecture: [
      "Portfolio Records Engine",
      "Risk Intelligence Layer",
      "Treasury Decision Brain",
      "Governance & Restriction Layer",
      "Recovery Queue Engine",
      "Routing & Escalation Engine",
      "Audit Timeline & Treasury History",
    ],
    simulatorLabel: "Treasury Crisis Simulator",
    simulatorTitle: "Institutional Treasury Testing Handbook",
    simulator: [
      ["Liquidity Exhaustion Test", "Create a very large FD placement until deployable cash becomes critically low."],
      ["Restriction Trigger Test", "Force reserve pressure to observe treasury restriction behavior."],
      ["LOCKDOWN Simulation", "Push treasury risk to extreme levels and observe lockdown activation."],
      ["Recovery Queue Escalation", "Advance lifecycle stages and observe routing and escalation behavior."],
    ],
    brainLabel: "Treasury Decision Intelligence",
    brainTitle: "Decision Brain Classification Model",
    statusCards: [
    ["MANUAL STATUS", "READY FOR USER TRAINING", "Designed for onboarding, treasury education, crisis testing, and institutional workflow understanding."],
    ["LANGUAGE SYSTEM", "MULTI-LANGUAGE ENABLED", "English, 中文, 日本語, and Bahasa Melayu are supported across the manual."],
    ["TREASURY EDUCATION", "INSTITUTIONAL LOGIC", "Explains governance, restriction, recovery queue, decision brain, and treasury roadmap."],
    ],
    learningLabel: "HOW TO USE THIS MANUAL",
    learningTitle: "Choose Your Learning Path",
    learning: [
    ["BEGINNER", "Start with Overview", "Best for new users who want to understand what Treasury Console is."],
    ["BANKER", "Study Architecture", "Best for understanding governance, restriction, queue, and decision logic."],
    ["TESTER", "Use Crisis Testing", "Best for testing liquidity stress, restriction, lockdown, and recovery flow."],
    ],
    navLabel: "TREASURY MANUAL NAVIGATION",
    navTitle: "Start Learning Treasury Console",
    nav: [
    ["01", "Overview", "Understand Treasury Console purpose and philosophy.", "#overview"],
    ["02", "Architecture", "Learn how Treasury Intelligence flows internally.", "#architecture"],
    ["03", "Workflow", "Understand recovery lifecycle and escalation flow.", "#workflow"],
    ["04", "Crisis Testing", "Simulate treasury crisis and restriction scenarios.", "#testing"],
    ["05", "Decision Brain", "Learn NORMAL, WARNING, RESTRICTED and LOCKDOWN.", "#brain"],
    ["06", "Roadmap", "Explore future Treasury Intelligence layers.", "#future"],
    ],
    brain: [
      ["NORMAL", "Healthy liquidity and reserve condition."],
      ["WARNING", "Liquidity stress or concentration risk detected."],
      ["RESTRICTED", "Deployment should be limited and monitored."],
      ["LOCKDOWN", "Treasury protection mode activated."],
    ],

    roadmapLabel: "Future Treasury Roadmap",
    roadmapTitle: "Next Institutional Treasury Layers",
    roadmap: [
    ["01", "Auto Execution Restriction", "System automatically blocks unsafe deployment actions."],
    ["02", "Live Deployment Blocking", "Real-time treasury protection before execution happens."],
    ["03", "Reserve Threshold Engine", "Protects minimum reserve level before capital deployment."],
    ["04", "AI Treasury Decision Layer", "Future AI layer for smarter treasury recommendations."],
    ],
  },

  zh: {
    title: "Treasury Console 架构与操作说明书",
    subtitle:
      "用简单又专业的方式，解释 Treasury Console、Governance、Recovery Workflow、Decision Brain 与 Treasury Crisis 测试。",
    quick: [
      ["Treasury Console", "控制 liquidity、recovery、governance、restriction 与 treasury risk。"],
      ["Governance", "在资金危险前，阻止不安全部署。"],
      ["Recovery Queue", "追踪 treasury incident，从 OPEN 到 REVIEW、READY、RESOLVED。"],
      ["Decision Brain", "判断 treasury 状态：NORMAL、WARNING、RESTRICTED、LOCKDOWN。"],
    ],
    architectureMapLabel: "系统架构地图",
    architectureMapTitle: "Treasury Console 如何思考",
    architectureMap: [
      "Portfolio Records",
      "Risk Intelligence",
      "Decision Brain",
      "Recovery Queue",
      "Governance Action",
      "Audit / Timeline",
    ],
    sections: [
      ["1. Treasury Console 是什么", "Treasury Console 是 FD Wealth Engine 的资金控制中心。它帮助用户判断资金是否安全、是否可以部署、是否被 restriction、或是否进入 treasury stress。"],
      ["2. Treasury Operating Philosophy", "真正的 treasury system 不只是追求利息。它必须保护 liquidity、维持 reserve、防止过度部署，并让每个决定都有 audit logic 可以解释。"],
      ["3. Recovery Queue Engine", "Recovery Queue 用来收集 treasury incident。OPEN 代表风险已发现，REVIEW 代表需要检查，READY 代表可以准备行动，RESOLVED 代表风险已处理。"],
      ["4. Routing Engine", "Routing Engine 会把 treasury case 派去正确的 desk，例如 Review Desk、Approval Desk、Recovery Execution Desk 或 Treasury Escalation Desk。"],
      ["5. Decision Brain", "Decision Brain 会读取 deployable funds、reserve pressure、liquidity buffer、policy breach、recovery status 与 stress level，然后给出机构级建议。"],
      ["6. Governance / Restriction / Lockdown", "Governance 是提醒，Restriction 是限制不安全动作，Lockdown 代表系统认为 treasury condition 太危险，不适合继续普通部署。"],
      ["7. Treasury Crisis Simulation", "要测试 crisis，可以新增一笔很大的 FD，让 deployable cash 几乎用完。然后回到 Treasury Console，观察 liquidity stress、restriction、warning 或 lockdown signal。"],
      ["8. Institutional Banking Logic", "银行需要 reserve protection、liquidity control、approval layer、escalation workflow 与 audit records，因为资金安全和收益一样重要。"],
      ["9. Future Treasury Roadmap", "未来可加入 auto execution restriction、live deployment blocking、reserve threshold engine、AI Treasury Decision Layer、stress simulation、liquidity shock model 与 institutional audit replay。"],
    ],
    statusLabel: "Decision Brain 状态模型",
    statusTitle: "NORMAL → WARNING → RESTRICTED → LOCKDOWN",
    statusBody:
      "这个模型帮助用户理解 treasury system 是健康、观察中、受限制，还是进入 critical protection mode。",
    workflowLabel: "Treasury Workflow 生命周期",
    workflowTitle: "机构级 Recovery Flow",
    workflow: [
      ["OPEN", "Treasury incident 已发现。"],
      ["REVIEW", "进行风险与 governance 审核。"],
      ["READY", "Recovery action 已准备。"],
      ["EXECUTED", "Treasury recovery 已执行。"],
      ["RESOLVED", "Liquidity stability 已恢复。"],
    ],
    architectureLabel: "系统架构图",
    architectureTitle: "Treasury Intelligence 架构",
    architecture: [
      "Portfolio Records Engine",
      "Risk Intelligence Layer",
      "Treasury Decision Brain",
      "Governance & Restriction Layer",
      "Recovery Queue Engine",
      "Routing & Escalation Engine",
      "Audit Timeline & Treasury History",
    ],
    simulatorLabel: "Treasury Crisis Simulator",
    simulatorTitle: "机构级 Treasury 测试手册",
    simulator: [
      ["Liquidity Exhaustion Test", "新增一笔超大 FD，直到 deployable cash 几乎耗尽。"],
      ["Restriction Trigger Test", "制造 reserve pressure 来观察 restriction 行为。"],
      ["LOCKDOWN Simulation", "把 treasury risk 推到极限并观察 lockdown activation。"],
      ["Recovery Queue Escalation", "推进 lifecycle stages 并观察 routing 与 escalation。"],
    ],
    brainLabel: "Treasury Decision Intelligence",
    brainTitle: "Decision Brain 分类模型",
    statusCards: [
    ["MANUAL 状态", "已准备给用户学习", "用于 onboarding、treasury education、危机测试与机构级 workflow 理解。"],
    ["语言系统", "已启用多语言", "English、中文、日本語 与 Bahasa Melayu 已支持。"],
    ["Treasury 教育", "机构级逻辑", "解释 governance、restriction、recovery queue、decision brain 与 treasury roadmap。"],
    ],
    learningLabel: "如何使用这份说明书",
    learningTitle: "选择你的学习路线",
    learning: [
    ["新手", "从总览开始", "适合第一次使用 Treasury Console 的用户。"],
    ["银行视角", "学习系统架构", "适合理解 governance、restriction、queue 与 decision logic。"],
    ["测试者", "使用危机测试", "适合测试 liquidity stress、restriction、lockdown 与 recovery flow。"],
    ],
    navLabel: "TREASURY MANUAL 导航",
    navTitle: "开始学习 Treasury Console",
    nav: [
    ["01", "总览", "理解 Treasury Console 的用途与资金管理哲学。", "#overview"],
    ["02", "架构", "了解 Treasury Intelligence 在系统内部如何流动。", "#architecture"],
    ["03", "工作流程", "理解 recovery lifecycle 与 escalation flow。", "#workflow"],
    ["04", "危机测试", "模拟 treasury crisis 与 restriction 情境。", "#testing"],
    ["05", "Decision Brain", "理解 NORMAL、WARNING、RESTRICTED 与 LOCKDOWN。", "#brain"],
    ["06", "未来路线图", "了解未来 Treasury Intelligence 层。", "#future"],
    ],
    brain: [
      ["NORMAL", "Liquidity 与 reserve condition 健康。"],
      ["WARNING", "检测到 liquidity stress 或 concentration risk。"],
      ["RESTRICTED", "Deployment 应该被限制与监控。"],
      ["LOCKDOWN", "Treasury protection mode 已启动。"],
    ],

    roadmapLabel: "未来 Treasury 路线图",
    roadmapTitle: "下一阶段机构级 Treasury Layer",
    roadmap: [
    ["01", "自动执行限制", "系统自动阻止不安全的资金部署。"],
    ["02", "实时部署阻挡", "在执行前进行实时 treasury protection。"],
    ["03", "Reserve Threshold Engine", "在资金部署前保护最低 reserve 水平。"],
    ["04", "AI Treasury Decision Layer", "未来 AI 层提供更智能的 treasury 建议。"],
    ],
  },

  jp: {
  title: "Treasury Console アーキテクチャ & 操作マニュアル",
  subtitle:
    "Treasury Console、Governance、Recovery Workflow、Decision Brain、Treasury Crisis テストをわかりやすく説明します。",
  quick: [
    ["Treasury Console", "liquidity、recovery、governance、restriction、treasury risk を管理します。"],
    ["Governance", "危険な資金配備を防止します。"],
    ["Recovery Queue", "OPEN、REVIEW、READY、RESOLVED の treasury incident を追跡します。"],
    ["Decision Brain", "NORMAL、WARNING、RESTRICTED、LOCKDOWN を判定します。"],
  ],
  architectureMapLabel: "システム構造",
  architectureMapTitle: "Treasury Console の思考",
  architectureMap: [
    "Portfolio Records",
    "Risk Intelligence",
    "Decision Brain",
    "Recovery Queue",
    "Governance Action",
    "Audit / Timeline",
  ],
  sections: [
    ["1. Treasury Console とは", "Treasury Console は FD Wealth Engine の資本管理センターです。"],
    ["2. Treasury Philosophy", "Treasury system は利益だけでなく liquidity と reserve を守る必要があります。"],
    ["3. Recovery Queue", "Recovery Queue は treasury incident を管理します。"],
    ["4. Routing Engine", "ケースを適切な desk に送ります。"],
    ["5. Decision Brain", "liquidity、reserve、stress level を分析します。"],
    ["6. Governance / Restriction / Lockdown", "危険時には restriction や lockdown を発動します。"],
    ["7. Treasury Crisis Simulation", "大きな FD を追加して crisis を再現します。"],
    ["8. Institutional Banking Logic", "銀行は reserve protection と liquidity control を重視します。"],
    ["9. Future Treasury Roadmap", "将来は AI Treasury Decision Layer などを追加予定です。"],
  ],
  statusLabel: "Decision Brain ステータス",
  statusTitle: "NORMAL → WARNING → RESTRICTED → LOCKDOWN",
  statusBody:
    "Treasury system の健康状態を表示します。",
  workflowLabel: "Treasury Workflow",
  workflowTitle: "機関レベル Recovery Flow",
  workflow: [
    ["OPEN", "Treasury incident 検出。"],
    ["REVIEW", "Risk と governance 確認。"],
    ["READY", "Recovery action 準備。"],
    ["EXECUTED", "Recovery 実行。"],
    ["RESOLVED", "Liquidity 安定回復。"],
  ],
  architectureLabel: "アーキテクチャ図",
  architectureTitle: "Treasury Intelligence 構造",
  architecture: [
    "Portfolio Records Engine",
    "Risk Intelligence Layer",
    "Treasury Decision Brain",
    "Governance & Restriction Layer",
    "Recovery Queue Engine",
    "Routing & Escalation Engine",
    "Audit Timeline & Treasury History",
  ],
  simulatorLabel: "Treasury Crisis Simulator",
  simulatorTitle: "Treasury テストガイド",
  simulator: [
  ["流動性枯渇テスト", "大きな FD を追加し、配置可能な資金が非常に少なくなる状態を確認します。"],
  ["制限発動テスト", "準備金への圧力を発生させ、資金配備の制限がどのように表示されるか確認します。"],
  ["ロックダウン・シミュレーション", "Treasury リスクを極端な状態にして、保護モードが発動するか確認します。"],
  ["Recovery Queue エスカレーション", "ライフサイクルを進め、ルーティングとエスカレーションの動作を確認します。"],
],
  brainLabel: "Treasury Decision Intelligence",
  brainTitle: "Decision Brain モデル",
  statusCards: [
  ["Manual 状態", "ユーザー研修に対応", "onboarding、treasury education、危機テスト、機関レベル workflow の理解に使えます。"],
  ["言語システム", "多言語対応", "English、中文、日本語、Bahasa Melayu に対応しています。"],
  ["Treasury 教育", "機関レベルロジック", "governance、restriction、recovery queue、decision brain、treasury roadmap を説明します。"],
],
  learningLabel: "このマニュアルの使い方",
    learningTitle: "学習ルートを選択",
    learning: [
    ["初心者", "概要から始める", "Treasury Console を初めて理解するユーザー向けです。"],
    ["銀行視点", "アーキテクチャを学ぶ", "governance、restriction、queue、decision logic を理解するためのルートです。"],
    ["テスター", "危機テストを使う", "liquidity stress、restriction、lockdown、recovery flow を確認するためのルートです。"],
    ],
  navLabel: "Treasury Manual ナビゲーション",
    navTitle: "Treasury Console を学ぶ",
    nav: [
    ["01", "概要", "Treasury Console の目的と運用思想を理解します。", "#overview"],
    ["02", "アーキテクチャ", "Treasury Intelligence の内部フローを学びます。", "#architecture"],
    ["03", "ワークフロー", "Recovery lifecycle と escalation flow を理解します。", "#workflow"],
    ["04", "危機テスト", "Treasury crisis と restriction scenario をシミュレーションします。", "#testing"],
    ["05", "Decision Brain", "NORMAL、WARNING、RESTRICTED、LOCKDOWN を理解します。", "#brain"],
    ["06", "ロードマップ", "将来の Treasury Intelligence layer を確認します。", "#future"],
    ],
  brain: [
  ["NORMAL", "流動性と準備金の状態が健全です。"],
  ["WARNING", "流動性ストレス、または集中リスクが検出されています。"],
  ["RESTRICTED", "資金配備を制限し、慎重に監視する必要があります。"],
  ["LOCKDOWN", "Treasury 保護モードが有効になっています。"],
],

    roadmapLabel: "将来の Treasury ロードマップ",
    roadmapTitle: "次の機関レベル Treasury Layer",
    roadmap: [
    ["01", "自動実行制限", "危険な資金配備を自動的にブロックします。"],
    ["02", "リアルタイム配備ブロック", "実行前に treasury protection を行います。"],
    ["03", "Reserve Threshold Engine", "資金配備前に最低 reserve 水準を保護します。"],
    ["04", "AI Treasury Decision Layer", "将来の AI 層がより賢い treasury recommendation を提供します。"],
],  
},

   bm: {
  title: "Manual Operasi & Seni Bina Treasury Console",
  subtitle:
    "Panduan profesional untuk memahami Treasury Console, Governance, Recovery Workflow, Decision Brain dan simulasi Treasury Crisis.",
  quick: [
    ["Treasury Console", "Mengawal liquidity, recovery, governance dan treasury risk."],
    ["Governance", "Menghalang deployment yang tidak selamat."],
    ["Recovery Queue", "Menjejak treasury incident dari OPEN hingga RESOLVED."],
    ["Decision Brain", "Menentukan NORMAL, WARNING, RESTRICTED atau LOCKDOWN."],
  ],
  architectureMapLabel: "Struktur Sistem",
  architectureMapTitle: "Cara Treasury Console Berfikir",
  architectureMap: [
    "Portfolio Records",
    "Risk Intelligence",
    "Decision Brain",
    "Recovery Queue",
    "Governance Action",
    "Audit / Timeline",
  ],
  sections: [
    ["1. Treasury Console", "Pusat kawalan modal FD Wealth Engine."],
    ["2. Treasury Philosophy", "Treasury system mesti melindungi liquidity dan reserve."],
    ["3. Recovery Queue", "Mengurus treasury incident dan recovery workflow."],
    ["4. Routing Engine", "Menghantar kes ke desk yang betul."],
    ["5. Decision Brain", "Menganalisis liquidity dan stress level."],
    ["6. Governance / Restriction / Lockdown", "Mengawal deployment ketika risiko tinggi."],
    ["7. Treasury Crisis Simulation", "Cipta crisis menggunakan FD besar."],
    ["8. Institutional Banking Logic", "Bank melindungi reserve dan liquidity."],
    ["9. Future Treasury Roadmap", "AI Treasury Decision Layer akan datang."],
  ],
  statusLabel: "Status Decision Brain",
  statusTitle: "NORMAL → WARNING → RESTRICTED → LOCKDOWN",
  statusBody:
    "Model ini menunjukkan tahap kesihatan treasury system.",
  workflowLabel: "Treasury Workflow",
  workflowTitle: "Institutional Recovery Flow",
  workflow: [
    ["OPEN", "Treasury incident dikesan."],
    ["REVIEW", "Pengesahan governance."],
    ["READY", "Recovery action disediakan."],
    ["EXECUTED", "Recovery dilakukan."],
    ["RESOLVED", "Liquidity kembali stabil."],
  ],
  architectureLabel: "Rajah Sistem",
  architectureTitle: "Seni Bina Treasury Intelligence",
  architecture: [
    "Portfolio Records Engine",
    "Risk Intelligence Layer",
    "Treasury Decision Brain",
    "Governance & Restriction Layer",
    "Recovery Queue Engine",
    "Routing & Escalation Engine",
    "Audit Timeline & Treasury History",
  ],
  simulatorLabel: "Treasury Crisis Simulator",
  simulatorTitle: "Panduan Ujian Treasury",
  simulator: [
    ["Liquidity Exhaustion Test", "Kurangkan deployable cash sehingga kritikal."],
    ["Restriction Trigger Test", "Cipta reserve pressure."],
    ["LOCKDOWN Simulation", "Aktifkan treasury lockdown."],
    ["Recovery Queue Escalation", "Uji routing dan escalation."],
  ],
  brainLabel: "Treasury Decision Intelligence",
  brainTitle: "Model Decision Brain",
  statusCards: [
  ["Status Manual", "Sedia Untuk Latihan Pengguna", "Direka untuk onboarding, treasury education, crisis testing dan pemahaman workflow institusi."],
  ["Sistem Bahasa", "Multi-Bahasa Diaktifkan", "English, 中文, 日本語 dan Bahasa Melayu disokong dalam manual."],
  ["Pendidikan Treasury", "Logik Institusi", "Menerangkan governance, restriction, recovery queue, decision brain dan treasury roadmap."],
],
  learningLabel: "Cara Menggunakan Manual Ini",
    learningTitle: "Pilih Laluan Pembelajaran",
    learning: [
    ["PEMULA", "Mula Dengan Overview", "Sesuai untuk pengguna baru yang ingin memahami Treasury Console."],
    ["BANKER", "Belajar Architecture", "Sesuai untuk memahami governance, restriction, queue dan decision logic."],
    ["TESTER", "Guna Crisis Testing", "Sesuai untuk menguji liquidity stress, restriction, lockdown dan recovery flow."],
    ],
  navLabel: "Navigasi Manual Treasury",
    navTitle: "Mula Belajar Treasury Console",
    nav: [
    ["01", "Overview", "Fahami tujuan Treasury Console dan falsafah operasinya.", "#overview"],
    ["02", "Architecture", "Pelajari bagaimana Treasury Intelligence bergerak dalam sistem.", "#architecture"],
    ["03", "Workflow", "Fahami recovery lifecycle dan escalation flow.", "#workflow"],
    ["04", "Crisis Testing", "Simulasi treasury crisis dan restriction scenario.", "#testing"],
    ["05", "Decision Brain", "Fahami NORMAL, WARNING, RESTRICTED dan LOCKDOWN.", "#brain"],
    ["06", "Roadmap", "Lihat lapisan Treasury Intelligence masa depan.", "#future"],
    ],
  brain: [
    ["NORMAL", "Liquidity sihat."],
    ["WARNING", "Liquidity stress dikesan."],
    ["RESTRICTED", "Deployment perlu dihadkan."],
    ["LOCKDOWN", "Treasury protection mode aktif."],
  ],

    roadmapLabel: "Roadmap Treasury Masa Depan",
    roadmapTitle: "Lapisan Treasury Institusi Seterusnya",
    roadmap: [
    ["01", "Sekatan Auto Execution", "Sistem menyekat deployment yang tidak selamat secara automatik."],
    ["02", "Live Deployment Blocking", "Treasury protection secara real-time sebelum execution berlaku."],
    ["03", "Reserve Threshold Engine", "Melindungi tahap reserve minimum sebelum capital deployment."],
    ["04", "AI Treasury Decision Layer", "Lapisan AI masa depan untuk cadangan treasury yang lebih pintar."],
    ],
}, 
};

export default function TreasuryManualPage() {
  const { workspaceMode } = useWorkspaceMode();
  const isDemoMode = workspaceMode === "DEMO";

  const [lang, setLang] = useState("en");
  const content = MANUAL[lang];

  const languages = {
    en: "English",
    zh: "中文",
    jp: "日本語",
    bm: "Bahasa Melayu",
  };

  return (
    <div className="treasury-manual-page">
      {isDemoMode && <TreasuryDemoBanner compact />}
      <section className="manual-hero">
        <div className="manual-logo-wrap">
          <div className="manual-logo">FD</div>
          <div>
            <div className="manual-kicker">
             V33.2-F9J TREASURY OPERATING MANUAL SYSTEM
            </div>
            <h1>{content.title}</h1>
            <p>{content.subtitle}</p>
          </div>
        </div>

        <div className="manual-language-card">
          <span>Manual Language</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {Object.entries(languages).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </section>

        <section className="manual-status-summary-panel">
            {content.statusCards.map(([label, title, body]) => (
                <div className="manual-status-summary-card" key={label}>
                <span>{label}</span>
                <strong>{title}</strong>
                <p>{body}</p>
                </div>
            ))}
            </section>

        <section className="manual-learning-path-panel">
            <div className="manual-section-header">
                <p>{content.learningLabel}</p>
                <h2>{content.learningTitle}</h2>
            </div>

            <div className="manual-learning-grid">
                {content.learning.map(([label, title, body]) => (
                <div className="learning-path-card" key={label}>
                    <span>{label}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                </div>
                ))}
            </div>
            </section>    
        <section className="manual-navigation-panel">
            <div className="manual-section-header">
                <p>{content.navLabel}</p>
                <h2>{content.navTitle}</h2>
            </div>

            <div className="manual-nav-grid">
                {content.nav.map(([number, title, body, link]) => (
                <a href={link} className="manual-nav-card" key={number}>
                    <span>{number}</span>
                    <strong>{title}</strong>
                    <p>{body}</p>
                </a>
                ))}
            </div>
            </section>    

        <section id="overview" className="manual-quick-grid">       
        {content.quick.map(([title, body]) => (
          <div className="manual-quick-card" key={title}>
            <span className="manual-dot" />
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </section>

        <section id="architecture" className="manual-architecture-panel">
        <div className="manual-section-header">
          <p>{content.architectureMapLabel}</p>
          <h2>{content.architectureMapTitle}</h2>
        </div>

        <div className="manual-flow">
          {content.architectureMap.map((item, index) => (
            <div className="manual-flow-item" key={item}>
              <div className="manual-flow-number">{index + 1}</div>
              <strong>{item}</strong>
              {index < content.architectureMap.length - 1 && (
                <span className="manual-arrow">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

        <section id="details" className="manual-content-grid">  
        {content.sections.map(([title, body]) => (
          <article className="manual-info-card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="manual-status-panel">
        <div>
          <p className="manual-kicker dark">{content.statusLabel}</p>
          <h2>{content.statusTitle}</h2>
          <p>{content.statusBody}</p>
        </div>

        <div className="manual-status-grid">
          <div className="manual-status normal">NORMAL</div>
          <div className="manual-status warning">WARNING</div>
          <div className="manual-status restricted">RESTRICTED</div>
          <div className="manual-status lockdown">LOCKDOWN</div>
        </div>
      </section>

     <section id="workflow" className="manual-training-panel">
        <div className="manual-section-header">
          <p>{content.workflowLabel}</p>
          <h2>{content.workflowTitle}</h2>
        </div>

        <div className="workflow-timeline">
          {content.workflow.map(([title, body], index) => {
            const stepClass = ["open", "review", "ready", "execute", "resolved"][index];

            return (
              <div className={`workflow-step ${stepClass}`} key={title}>
                <span>{index + 1}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            );
          })}
        </div>
      </section>

     <section id="architecture-deep" className="manual-architecture-deep">
        <div className="manual-section-header">
          <p>{content.architectureLabel}</p>
          <h2>{content.architectureTitle}</h2>
        </div>

        <div className="architecture-stack">
          {content.architecture.map((item, index) => (
            <div key={item}>
              <div className="architecture-node">{item}</div>
              {index < content.architecture.length - 1 && (
                <div className="architecture-arrow">↓</div>
              )}
            </div>
          ))}
        </div>
      </section>

   <section id="testing" className="manual-simulator-panel">
        <div className="manual-section-header">
          <p>{content.simulatorLabel}</p>
          <h2>{content.simulatorTitle}</h2>
        </div>

        <div className="simulator-grid">
          {content.simulator.map(([title, body]) => (
            <div className="sim-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

    <section id="brain" className="decision-brain-panel">
        <div className="manual-section-header">
          <p>{content.brainLabel}</p>
          <h2>{content.brainTitle}</h2>
        </div>

        <div className="brain-grid">
          {content.brain.map(([title, body]) => (
            <div className={`brain-card ${title.toLowerCase()}`} key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
        <section id="future" className="manual-roadmap-panel">
            <div className="manual-section-header">
                <p>{content.roadmapLabel}</p>
                <h2>{content.roadmapTitle}</h2>
            </div>

            <div className="manual-roadmap-grid">
                {content.roadmap.map(([number, title, body]) => (
                <div className="roadmap-card" key={number}>
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                </div>
                ))}
            </div>
            </section>  
    </div>
  );
}