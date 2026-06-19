import { useState } from "react";


const LANGUAGE_OPTIONS = [
  { key: "en", label: "English" },
  { key: "zh", label: "中文" },
  { key: "ja", label: "日本語" },
  { key: "bm", label: "BM" },
];

const copy = {
  en: {
    heroKicker: "V33.2-RP4 · TREASURY OS ONBOARDING",
    heroTitle: "User Onboarding Guide",
    heroSubtitle:
      "Learn the Treasury OS workflow, understand each workspace and become operational in minutes.",

    welcomeKicker: "WELCOME TO TREASURY OS",
    welcomeTitle: "Treasury Operating System",
    welcomeText:
      "Treasury OS combines portfolio visibility, treasury operations, governance coordination and autonomous monitoring into one institutional workspace.",

    capabilitiesTitle: "Core Operating Capabilities",
    capabilitiesSub: "Understand the three primary operating layers.",

    journeyTitle: "Treasury OS Journey",
    journeySub: "Follow the recommended operating flow.",

    gettingTitle: "Getting Started",
    gettingSub: "Begin with six core workspaces.",

    guideTitle: "Treasury OS Operating Guide",
    guideSub: "Know what to open, what to review and what result to expect.",

   attentionTitle: "Treasury Attention Levels",
   attentionSub: "Understand when Treasury OS needs your attention.",

    decisionTitle: "Treasury Decision Logic",
    decisionSub: "Understand when Treasury OS changes status.",

    readinessTitle: "Executive Readiness",
    readinessSub: "Treasury OS operating layers are available.",

    finalKicker: "INSTITUTIONAL TREASURY ENVIRONMENT",
    finalTitle: "Institutional Treasury Environment Ready",
    finalText:
      "Portfolio visibility, treasury operations, governance runtime and autonomous monitoring are active.",
    systemStatus: "SYSTEM STATUS",
    ready: "READY",
    operational: "OPERATIONAL",

    labels: {
      purpose: "Purpose",
      review: "Review",
      result: "Expected Outcome",
    },
  },

  zh: {
    heroKicker: "V33.2-RP4 · TREASURY OS 用户入门",
    heroTitle: "用户入门指南",
    heroSubtitle:
      "了解 Treasury OS 的工作流程、各个工作空间，并在几分钟内开始使用。",

    welcomeKicker: "欢迎使用 TREASURY OS",
    welcomeTitle: "财资操作系统",
    welcomeText:
      "Treasury OS 将资产可视化、财资运营、治理协调与自主监控整合到一个机构级工作空间。",

    capabilitiesTitle: "核心操作能力",
    capabilitiesSub: "了解三个主要操作层。",

    journeyTitle: "Treasury OS 使用路径",
    journeySub: "按照推荐的操作流程开始使用。",

    gettingTitle: "开始使用",
    gettingSub: "从六个核心工作空间开始。",

    guideTitle: "Treasury OS 操作指南",
    guideSub: "了解应该打开哪里、查看什么，以及获得什么结果。",

    attentionTitle: "Treasury 关注等级",
    attentionSub: "了解什么时候 Treasury OS 需要你的关注。",

    decisionTitle: "财资决策逻辑",
    decisionSub: "了解 Treasury OS 何时改变状态。",

    readinessTitle: "执行准备状态",
    readinessSub: "Treasury OS 各操作层已准备就绪。",

    finalKicker: "机构级财资环境",
    finalTitle: "机构级财资环境已准备就绪",
    finalText: "资产可视化、财资运营、治理运行与自主监控已启动。",
    systemStatus: "系统状态",
    ready: "READY",
    operational: "OPERATIONAL",

    labels: {
      purpose: "用途",
      review: "查看内容",
      result: "预期结果",
    },
  },

  ja: {
    heroKicker: "V33.2-RP4 · TREASURY OS オンボーディング",
    heroTitle: "ユーザーオンボーディングガイド",
    heroSubtitle:
      "Treasury OS の操作フロー、各ワークスペース、運用開始までの流れを理解します。",

    welcomeKicker: "TREASURY OS へようこそ",
    welcomeTitle: "財務オペレーティングシステム",
    welcomeText:
      "Treasury OS は、ポートフォリオ可視化、財務運用、ガバナンス調整、自律監視を1つの機関向けワークスペースに統合します。",

    capabilitiesTitle: "主要操作機能",
    capabilitiesSub: "3つの主要な操作レイヤーを理解します。",

    journeyTitle: "Treasury OS ジャーニー",
    journeySub: "推奨される操作フローに従います。",

    gettingTitle: "はじめに",
    gettingSub: "6つの主要ワークスペースから開始します。",

    guideTitle: "Treasury OS 操作ガイド",
    guideSub: "何を開き、何を確認し、どの結果を期待するかを理解します。",

    attentionTitle: "Treasury 注意レベル",
    attentionSub: "Treasury OS がいつ注意を必要とするかを理解します。",

    decisionTitle: "財務意思決定ロジック",
    decisionSub: "Treasury OS がいつ状態を変更するかを理解します。",

    readinessTitle: "実行準備状況",
    readinessSub: "Treasury OS の操作レイヤーは利用可能です。",

    finalKicker: "機関向け財務環境",
    finalTitle: "機関向け財務環境の準備完了",
    finalText:
      "ポートフォリオ可視化、財務運用、ガバナンス、自律監視が有効です。",
    systemStatus: "システム状態",
    ready: "READY",
    operational: "OPERATIONAL",

    labels: {
      purpose: "目的",
      review: "確認項目",
      result: "期待される結果",
    },
  },

  bm: {
    heroKicker: "V33.2-RP4 · ONBOARDING TREASURY OS",
    heroTitle: "Panduan Permulaan Pengguna",
    heroSubtitle:
      "Fahami aliran Treasury OS, setiap ruang kerja dan mula beroperasi dalam beberapa minit.",

    welcomeKicker: "SELAMAT DATANG KE TREASURY OS",
    welcomeTitle: "Sistem Operasi Perbendaharaan",
    welcomeText:
      "Treasury OS menggabungkan keterlihatan portfolio, operasi perbendaharaan, tadbir urus dan pemantauan autonomi dalam satu ruang kerja institusi.",

    capabilitiesTitle: "Keupayaan Operasi Teras",
    capabilitiesSub: "Fahami tiga lapisan operasi utama.",

    journeyTitle: "Perjalanan Treasury OS",
    journeySub: "Ikuti aliran operasi yang disyorkan.",

    gettingTitle: "Mula Menggunakan",
    gettingSub: "Mulakan dengan enam ruang kerja utama.",

    guideTitle: "Panduan Operasi Treasury OS",
    guideSub: "Ketahui apa yang perlu dibuka, disemak dan hasil yang dijangka.",

    attentionTitle: "Tahap Perhatian Treasury",
    attentionSub: "Fahami bila Treasury OS memerlukan perhatian anda.",

    decisionTitle: "Logik Keputusan Treasury",
    decisionSub: "Fahami bila Treasury OS menukar status.",

    readinessTitle: "Kesediaan Eksekutif",
    readinessSub: "Lapisan operasi Treasury OS tersedia.",

    finalKicker: "PERSEKITARAN PERBENDAHARAAN INSTITUSI",
    finalTitle: "Persekitaran Perbendaharaan Institusi Sedia",
    finalText:
      "Keterlihatan portfolio, operasi perbendaharaan, tadbir urus dan pemantauan autonomi aktif.",
    systemStatus: "STATUS SISTEM",
    ready: "READY",
    operational: "OPERATIONAL",

    labels: {
      purpose: "Tujuan",
      review: "Semak",
      result: "Hasil Dijangka",
    },
  },
};

const workspaces = {
  en: [
    ["01", "Records", "Asset Setup", "Open Records"],
    ["02", "Settings", "Policy Setup", "Open Settings"],
    ["03", "Dashboard", "Portfolio Visibility", "Open Dashboard"],
    ["04", "Treasury", "Operations Control", "Open Treasury"],
    ["05", "Governance", "Authority Review", "Open Governance"],
    ["06", "Autonomous", "AI Monitoring", "Open Autonomous"],
  ],
  zh: [
    ["01", "Records", "资产设置", "打开 Records"],
    ["02", "Settings", "政策设置", "打开 Settings"],
    ["03", "Dashboard", "资产可视化", "打开 Dashboard"],
    ["04", "Treasury", "财资运营", "打开 Treasury"],
    ["05", "Governance", "治理审查", "打开 Governance"],
    ["06", "Autonomous", "自主监控", "打开 Autonomous"],
  ],
  ja: [
    ["01", "Records", "資産設定", "Records を開く"],
    ["02", "Settings", "ポリシー設定", "Settings を開く"],
    ["03", "Dashboard", "ポートフォリオ可視化", "Dashboard を開く"],
    ["04", "Treasury", "財務運用", "Treasury を開く"],
    ["05", "Governance", "権限確認", "Governance を開く"],
    ["06", "Autonomous", "AI 監視", "Autonomous を開く"],
  ],
  bm: [
    ["01", "Records", "Tetapan Aset", "Buka Records"],
    ["02", "Settings", "Tetapan Polisi", "Buka Settings"],
    ["03", "Dashboard", "Keterlihatan Portfolio", "Buka Dashboard"],
    ["04", "Treasury", "Kawalan Operasi", "Buka Treasury"],
    ["05", "Governance", "Semakan Autoriti", "Buka Governance"],
    ["06", "Autonomous", "Pemantauan AI", "Buka Autonomous"],
  ],
};

const guideContent = {
  en: [
    {
      title: "Records",
      purpose: "Register treasury assets.",
      review: ["Fixed Deposits", "Savings Accounts", "Parking Cash"],
      result: "Treasury OS can begin portfolio visibility monitoring.",
      action: "Open Records",
    },
    {
      title: "Dashboard",
      purpose: "Monitor portfolio health.",
      review: ["Capital Allocation", "Liquidity", "Maturity Schedule", "Risk Monitor"],
      result: "Portfolio visibility and risk awareness are established.",
      action: "Open Dashboard",
    },
    {
      title: "Treasury",
      purpose: "Manage treasury operations.",
      review: ["Recovery Queue", "Runtime Activity", "Routing Intelligence", "Treasury Signals"],
      result: "Operational awareness and response readiness are established.",
      action: "Open Treasury",
    },
    {
      title: "Governance",
      purpose: "Review authority coordination.",
      review: ["Governance Mesh", "Consensus Status", "Decision Routing", "Authority Health"],
      result: "Governance visibility and approval control are established.",
      action: "Open Governance",
    },
    {
      title: "Autonomous",
      purpose: "Observe AI readiness.",
      review: ["Runtime Signals", "AI Observation", "Decision Support", "Readiness Status"],
      result: "Autonomous monitoring and operating intelligence are active.",
      action: "Open Autonomous",
    },
  ],

  zh: [
    {
      title: "Records",
      purpose: "登记所有财资资产。",
      review: ["定期存款", "储蓄账户", "Parking Cash"],
      result: "Treasury OS 可以开始进行资产可视化监控。",
      action: "打开 Records",
    },
    {
      title: "Dashboard",
      purpose: "监控整体资产健康状态。",
      review: ["资本配置", "流动性", "到期排程", "风险监控"],
      result: "资产可视化与风险意识已建立。",
      action: "打开 Dashboard",
    },
    {
      title: "Treasury",
      purpose: "管理财资运营流程。",
      review: ["Recovery Queue", "运行活动", "路由智能", "财资信号"],
      result: "运营可视化与响应准备状态已建立。",
      action: "打开 Treasury",
    },
    {
      title: "Governance",
      purpose: "审查权限协调与治理状态。",
      review: ["治理网格", "共识状态", "决策路由", "权限健康"],
      result: "治理可视化与审批控制已建立。",
      action: "打开 Governance",
    },
    {
      title: "Autonomous",
      purpose: "观察 AI 运行准备状态。",
      review: ["运行信号", "AI 观察", "决策支持", "准备状态"],
      result: "自主监控与运行智能已启动。",
      action: "打开 Autonomous",
    },
  ],

  ja: [
    {
      title: "Records",
      purpose: "すべての財務資産を登録します。",
      review: ["定期預金", "普通預金口座", "Parking Cash"],
      result: "Treasury OS はポートフォリオ可視化の監視を開始できます。",
      action: "Records を開く",
    },
    {
      title: "Dashboard",
      purpose: "ポートフォリオ全体の健全性を確認します。",
      review: ["資本配分", "流動性", "満期スケジュール", "リスクモニター"],
      result: "ポートフォリオ可視化とリスク認識が確立されます。",
      action: "Dashboard を開く",
    },
    {
      title: "Treasury",
      purpose: "財務運用フローを管理します。",
      review: ["Recovery Queue", "ランタイム活動", "ルーティング情報", "財務シグナル"],
      result: "運用状況の可視化と対応準備が確立されます。",
      action: "Treasury を開く",
    },
    {
      title: "Governance",
      purpose: "権限調整とガバナンス状態を確認します。",
      review: ["ガバナンスメッシュ", "合意状態", "意思決定ルーティング", "権限健全性"],
      result: "ガバナンス可視化と承認管理が確立されます。",
      action: "Governance を開く",
    },
    {
      title: "Autonomous",
      purpose: "AI の運用準備状態を確認します。",
      review: ["ランタイムシグナル", "AI 観察", "意思決定支援", "準備状態"],
      result: "自律監視と運用インテリジェンスが有効になります。",
      action: "Autonomous を開く",
    },
  ],

  bm: [
    {
      title: "Records",
      purpose: "Daftarkan semua aset treasury.",
      review: ["Deposit Tetap", "Akaun Simpanan", "Parking Cash"],
      result: "Treasury OS boleh mula memantau keterlihatan portfolio.",
      action: "Buka Records",
    },
    {
      title: "Dashboard",
      purpose: "Pantau kesihatan portfolio secara keseluruhan.",
      review: ["Peruntukan Modal", "Kecairan", "Jadual Kematangan", "Pemantau Risiko"],
      result: "Keterlihatan portfolio dan kesedaran risiko diwujudkan.",
      action: "Buka Dashboard",
    },
    {
      title: "Treasury",
      purpose: "Urus aliran operasi treasury.",
      review: ["Recovery Queue", "Aktiviti Runtime", "Risikan Routing", "Isyarat Treasury"],
      result: "Kesedaran operasi dan kesiapsiagaan tindak balas diwujudkan.",
      action: "Buka Treasury",
    },
    {
      title: "Governance",
      purpose: "Semak koordinasi autoriti dan status tadbir urus.",
      review: ["Governance Mesh", "Status Konsensus", "Routing Keputusan", "Kesihatan Autoriti"],
      result: "Keterlihatan governance dan kawalan kelulusan diwujudkan.",
      action: "Buka Governance",
    },
    {
      title: "Autonomous",
      purpose: "Pantau kesediaan operasi AI.",
      review: ["Isyarat Runtime", "Pemerhatian AI", "Sokongan Keputusan", "Status Kesediaan"],
      result: "Pemantauan autonomi dan kecerdasan operasi aktif.",
      action: "Buka Autonomous",
    },
  ],
};

const attentionLevels = {
  en: [
    ["🟢", "NORMAL", "Normal Operations", "No immediate treasury action required.", "Treasury operations are stable."],
    ["🟡", "REVIEW", "Review Recommended", "Upcoming maturity, liquidity movement or treasury signal detected.", "Open Treasury to review the signal."],
    ["🟠", "ACTION REQUIRED", "Action Required", "Treasury attention is required.", "Review recommendation and decide next action."],
    ["🔴", "CRITICAL", "Governance Escalation", "Critical treasury condition detected.", "Governance review or intervention may be required."],
  ],
  zh: [
    ["🟢", "NORMAL", "正常运行", "当前没有需要立即处理的财资事项。", "财资运行稳定。"],
    ["🟡", "REVIEW", "建议审查", "发现即将到期、流动性变化或财资信号。", "建议进入 Treasury 查看。"],
    ["🟠", "ACTION REQUIRED", "需要行动", "需要财资关注与进一步评估。", "查看建议并决定下一步行动。"],
    ["🔴", "CRITICAL", "治理升级", "发现关键财资事件。", "可能需要 Governance 审查或介入。"],
  ],
  ja: [
    ["🟢", "NORMAL", "通常運用", "すぐに対応する必要はありません。", "財務運用は安定しています。"],
    ["🟡", "REVIEW", "確認推奨", "満期、流動性変化、または財務シグナルが検出されました。", "Treasury を開いて確認します。"],
    ["🟠", "ACTION REQUIRED", "対応が必要", "Treasury の確認が必要です。", "推奨内容を確認し、次の対応を決定します。"],
    ["🔴", "CRITICAL", "ガバナンスエスカレーション", "重要な財務状態が検出されました。", "Governance の確認または介入が必要な場合があります。"],
  ],
  bm: [
    ["🟢", "NORMAL", "Operasi Normal", "Tiada tindakan treasury segera diperlukan.", "Operasi treasury stabil."],
    ["🟡", "REVIEW", "Semakan Disyorkan", "Kematangan, pergerakan kecairan atau isyarat treasury dikesan.", "Buka Treasury untuk semakan."],
    ["🟠", "ACTION REQUIRED", "Tindakan Diperlukan", "Perhatian treasury diperlukan.", "Semak cadangan dan tentukan tindakan seterusnya."],
    ["🔴", "CRITICAL", "Eskalasi Governance", "Keadaan treasury kritikal dikesan.", "Semakan atau intervensi Governance mungkin diperlukan."],
  ],
};

const readinessRows = {
  en: [
    ["Portfolio Layer", "Capital visibility active"],
    ["Treasury Layer", "Operations monitoring active"],
    ["Governance Layer", "Authority coordination active"],
    ["Autonomous Layer", "AI observation active"],
    ["Documentation Layer", "User guidance available"],
  ],
  zh: [
    ["资产可视化层", "资产可视化已启动"],
    ["财资运营层", "运营监控已启动"],
    ["治理层", "权限协调已启动"],
    ["自主层", "AI 观察已启动"],
    ["文档层", "用户指南可用"],
  ],
  ja: [
    ["ポートフォリオ層", "資本可視化が有効です"],
    ["Treasury 層", "運用監視が有効です"],
    ["Governance 層", "権限調整が有効です"],
    ["Autonomous 層", "AI 監視が有効です"],
    ["Documentation 層", "ユーザーガイドが利用可能です"],
  ],
  bm: [
    ["Lapisan Portfolio", "Keterlihatan modal aktif"],
    ["Lapisan Treasury", "Pemantauan operasi aktif"],
    ["Lapisan Governance", "Koordinasi autoriti aktif"],
    ["Lapisan Autonomous", "Pemerhatian AI aktif"],
    ["Lapisan Dokumentasi", "Panduan pengguna tersedia"],
  ],
};

export default function UserOnboardingPage({ onTabChange, tabs }) {
  const [language, setLanguage] = 
  useState(
    localStorage.getItem(
      "treasury_onboarding_language"
    ) || "en"
  );
  const t = copy[language] || copy.en;

  const dualText = (key) => {
    if (language === "en") return copy.en[key];

    return (
      <>
        <span>{copy.en[key]}</span>
        <strong>{t[key]}</strong>
      </>
    );
  };

  const targets = [
  tabs?.RECORDS,
  tabs?.SETTINGS,
  tabs?.HOME,
  "TREASURY",
  "GOVERNANCE",
  "AUTONOMOUS",
];

const workspaceIcons = ["FD", "SET", "DASH", "TRSY", "GOV", "AI"];

  const openWorkspace = (target) => {
    if (!target || !onTabChange) return;

    onTabChange(target);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);
  };

  return (
    <div className="page-container">
      <section className="treasury-demo-compact-banner">
        <div className="demo-banner-left">
          <span className="demo-status-dot"></span>
          <span className="demo-banner-label">DEMO ENVIRONMENT</span>
          <span className="demo-banner-divider">SIMULATED DATA</span>
        </div>
      </section>

      <section className="onboarding-manual-hero">
        <div className="onboarding-manual-logo">FD</div>

        <div className="onboarding-manual-content">
          <p>{dualText("heroKicker")}</p>
          <h1>{dualText("heroTitle")}</h1>
          <div className="onboarding-hero-description">
            {dualText("heroSubtitle")}
          </div>
        </div>

        <div className="onboarding-manual-language">
          <span>MANUAL LANGUAGE</span>
          <select
            value={language}
          onChange={(e) => {
            setLanguage(e.target.value);

            localStorage.setItem(
                "treasury_onboarding_language",
                e.target.value
            );
            }}

          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="dashboard-section onboarding-welcome-panel">
        <p className="onboarding-section-label">{dualText("welcomeKicker")}</p>
        <h2>{dualText("welcomeTitle")}</h2>
        <p>{dualText("welcomeText")}</p>

        <div className="onboarding-os-strip">
          <span>Portfolio Visibility</span>
          <span>Treasury Operations</span>
          <span>Governance Intelligence</span>
          <span>Autonomous Monitoring</span>
        </div>
      </section>

     <section className="dashboard-section">
  <div className="manual-section-header">
    <h2>{dualText("capabilitiesTitle")}</h2>
    <p>{dualText("capabilitiesSub")}</p>
  </div>

  <div className="capability-grid">

    <div className="capability-card">

  <div className="capability-header">

    <div className="capability-number">
      01
    </div>

    <div>

      <h3>
        {language === "zh"
          ? "资产可视化"
          : language === "ja"
          ? "ポートフォリオ可視化"
          : language === "bm"
          ? "Keterlihatan Portfolio"
          : "Portfolio Visibility"}
      </h3>

      <small>
        Portfolio Visibility
      </small>

    </div>

  </div>

      {language === "zh" && (
        <>
          <p>资本监控</p>
          <p>流动性智能</p>
          <p>风险评估</p>
          <div className="capability-footer">基础层</div>
        </>
      )}

      {language === "ja" && (
        <>
          <p>資本監視</p>
          <p>流動性分析</p>
          <p>リスク評価</p>
          <div className="capability-footer">基盤層</div>
        </>
      )}

      {language === "bm" && (
        <>
          <p>Pemantauan Modal</p>
          <p>Kecerdasan Kecairan</p>
          <p>Penilaian Risiko</p>
          <div className="capability-footer">Lapisan Asas</div>
        </>
      )}

      {language === "en" && (
        <>
          <p>Capital Monitoring</p>
          <p>Liquidity Intelligence</p>
          <p>Risk Assessment</p>
          <div className="capability-footer">FOUNDATION</div>
        </>
      )}
    </div>
        <div className="capability-card">

        <div className="capability-header">

            <div className="capability-number">
            02
            </div>

            <div>

            <h3>
                {language === "zh"
                ? "财资运营"
                : language === "ja"
                ? "財務運営"
                : language === "bm"
                ? "Operasi Perbendaharaan"
                : "Treasury Operations"}
            </h3>

            <small>
                Treasury Operations
            </small>

        </div>

  </div>
        
      {language === "zh" && (
        <>
          <p>恢复控制</p>
          <p>运行活动</p>
          <p>执行准备</p>
          <div className="capability-footer">运营层</div>
        </>
      )}

      {language === "ja" && (
        <>
          <p>回復管理</p>
          <p>ランタイム監視</p>
          <p>実行準備</p>
          <div className="capability-footer">運営層</div>
        </>
      )}

      {language === "bm" && (
        <>
          <p>Kawalan Pemulihan</p>
          <p>Aktiviti Runtime</p>
          <p>Kesediaan Pelaksanaan</p>
          <div className="capability-footer">Lapisan Operasi</div>
        </>
      )}

      {language === "en" && (
        <>
          <p>Recovery Control</p>
          <p>Runtime Activity</p>
          <p>Execution Readiness</p>
          <div className="capability-footer">OPERATIONS</div>
        </>
      )}
    </div>

        <div className="capability-card">

        <div className="capability-header">

            <div className="capability-number">
            03
            </div>

            <div>

            <h3>
                {language === "zh"
                ? "治理智能"
                : language === "ja"
                ? "ガバナンス知能"
                : language === "bm"
                ? "Kecerdasan Tadbir Urus"
                : "Governance Intelligence"}
            </h3>

            <small>
                Governance Intelligence
            </small>

            </div>

        </div>

      {language === "zh" && (
        <>
          <p>权限网络</p>
          <p>共识引擎</p>
          <p>决策协调</p>
          <div className="capability-footer">治理层</div>
        </>
      )}

      {language === "ja" && (
        <>
          <p>権限メッシュ</p>
          <p>コンセンサスエンジン</p>
          <p>意思決定調整</p>
          <div className="capability-footer">ガバナンス層</div>
        </>
      )}

      {language === "bm" && (
        <>
          <p>Mesh Kuasa</p>
          <p>Enjin Konsensus</p>
          <p>Penyelarasan Keputusan</p>
          <div className="capability-footer">Lapisan Tadbir Urus</div>
        </>
      )}

      {language === "en" && (
        <>
          <p>Authority Mesh</p>
          <p>Consensus Engine</p>
          <p>Decision Coordination</p>
          <div className="capability-footer">GOVERNANCE</div>
        </>
      )}
    </div>

  </div>
</section>

      <section className="dashboard-section">
        <div className="manual-section-header">
          <h2>{dualText("journeyTitle")}</h2>
          <p>{dualText("journeySub")}</p>
        </div>

        <div className="journey-flow">
          {["Records", "Dashboard", "Treasury", "Governance", "Autonomous"].map(
            (item, index) => (
              <div className="journey-flow-group" key={item}>
                <div
                  className={`journey-node ${
                    item === "Treasury" ? "journey-treasury" : ""
                  }`}
                >
                  <span>{item}</span>
                </div>
                {index < 4 && <div className="journey-arrow">→</div>}
              </div>
            )
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="manual-section-header">
          <h2>{dualText("gettingTitle")}</h2>
          <p>{dualText("gettingSub")}</p>
        </div>

        <div className="setup-grid">
          {(workspaces[language] || workspaces.en).map(
            ([no, title, desc, action], index) => (
              <div className="setup-card compact-setup-card" key={no}>
                <div className="setup-header">

                    <div className="setup-number">
                        {no}
                    </div>

                    <div className="setup-icon">
                        {workspaceIcons[index]}
                    </div>

                    </div>
                <h3>{title}</h3>
                <p>{desc}</p>

                <button
                  type="button"
                  className="setup-action-button"
                  onClick={() => openWorkspace(targets[index])}
                >
                  {action}
                </button>
              </div>
            )
          )}
        </div>
      </section>

      <section className="dashboard-section premium-operating-guide">
        <div className="manual-section-header">
          <h2>{dualText("guideTitle")}</h2>
          <p>{dualText("guideSub")}</p>
        </div>

        <div className="operating-guide-grid">
          {(guideContent[language] || guideContent.en).map((item, index) => (
            <div className="operating-guide-card" key={item.title}>
              <div className="operating-guide-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
              </div>

              <div className="operating-purpose">
                <small>{t.labels.purpose}</small>
                <p>{item.purpose}</p>
              </div>

              <div className="operating-review">
                <small>{t.labels.review}</small>
                {item.review.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>

              <div className="operating-result">
                <small>{t.labels.result}</small>
                <p>{item.result}</p>
              </div>

              <button
                type="button"
                className="operating-action-button"
                onClick={() =>
                  openWorkspace(
                    targets[
                      index === 0
                        ? 0
                        : index === 1
                        ? 2
                        : index === 2
                        ? 3
                        : index === 3
                        ? 4
                        : 5
                    ]
                  )
                }
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section treasury-attention-section">
        <div className="manual-section-header">
          <h2>{dualText("attentionTitle")}</h2>
          <p>{dualText("attentionSub")}</p>
        </div>

        <div className="attention-level-grid">
          {(attentionLevels[language] || attentionLevels.en).map(
            ([icon, level, title, text, result]) => (
              <div
                className={`attention-card ${level
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                key={level}
              >
                <span>
                  {icon} {level}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <small>{result}</small>
              </div>
            )
          )}
        </div>
      </section>
        <section className="dashboard-section treasury-decision-logic-section">
  <div className="manual-section-header">
    <h2>{dualText("decisionTitle")}</h2>
    <p>{dualText("decisionSub")}</p>
  </div>

  <div className="decision-logic-grid">
    {[
      {
        level: "NORMAL",
        icon: "🟢",
        className: "normal",
        titleEn: "No Action Required",
        titleLocal:
          language === "zh"
            ? "无需采取行动"
            : language === "ja"
            ? "対応不要"
            : language === "bm"
            ? "Tiada Tindakan Diperlukan"
            : "",
        body:
          language === "zh"
            ? "资产运行正常。"
            : language === "ja"
            ? "ポートフォリオは正常に運用されています。"
            : language === "bm"
            ? "Portfolio beroperasi secara normal."
            : "Portfolio operating normally.",
        note:
          language === "zh"
            ? "Treasury 监控持续运行。"
            : language === "ja"
            ? "Treasury 監視は継続中です。"
            : language === "bm"
            ? "Pemantauan Treasury masih aktif."
            : "Treasury monitoring remains active.",
      },
      {
        level: "REVIEW",
        icon: "🟡",
        className: "review",
        titleEn: "Review Recommended",
        titleLocal:
          language === "zh"
            ? "建议审查"
            : language === "ja"
            ? "確認推奨"
            : language === "bm"
            ? "Semakan Disyorkan"
            : "",
        body:
          language === "zh"
            ? "发现即将到期或流动性变化。"
            : language === "ja"
            ? "満期予定または流動性変化が検出されました。"
            : language === "bm"
            ? "Kematangan atau perubahan kecairan dikesan."
            : "Upcoming maturity or liquidity movement detected.",
        note:
          language === "zh"
            ? "Treasury 建议进入审查状态。"
            : language === "ja"
            ? "Treasury は確認を推奨します。"
            : language === "bm"
            ? "Treasury mengesyorkan semakan."
            : "Treasury recommends review.",
      },
      {
        level: "ACTION REQUIRED",
        icon: "🟠",
        className: "action",
        titleEn: "Intervention Recommended",
        titleLocal:
          language === "zh"
            ? "建议介入处理"
            : language === "ja"
            ? "介入推奨"
            : language === "bm"
            ? "Intervensi Disyorkan"
            : "",
        body:
          language === "zh"
            ? "发现资本配置或储备金问题。"
            : language === "ja"
            ? "資本配分またはリザーブ問題が検出されました。"
            : language === "bm"
            ? "Isu peruntukan modal atau rizab dikesan."
            : "Capital allocation or reserve issue detected.",
        note:
          language === "zh"
            ? "Treasury 建议采取下一步行动。"
            : language === "ja"
            ? "Treasury は次の対応を推奨します。"
            : language === "bm"
            ? "Treasury mengesyorkan tindakan seterusnya."
            : "Treasury recommends intervention.",
      },
      {
        level: "CRITICAL",
        icon: "🔴",
        className: "critical",
        titleEn: "Governance Escalation",
        titleLocal:
          language === "zh"
            ? "治理升级"
            : language === "ja"
            ? "ガバナンスエスカレーション"
            : language === "bm"
            ? "Eskalasi Governance"
            : "",
        body:
          language === "zh"
            ? "已触发关键财资或治理事件。"
            : language === "ja"
            ? "重要な財務またはガバナンスイベントが発生しました。"
            : language === "bm"
            ? "Peristiwa treasury atau governance kritikal dicetuskan."
            : "Critical treasury or governance event triggered.",
        note:
          language === "zh"
            ? "可能需要 Governance 审查或管理层介入。"
            : language === "ja"
            ? "Governance の確認または経営層介入が必要な場合があります。"
            : language === "bm"
            ? "Semakan Governance atau intervensi eksekutif mungkin diperlukan."
            : "Executive review may be required.",
      },
    ].map((item) => (
      <div className={`decision-card ${item.className}`} key={item.level}>
        <span>
          {item.icon} {item.level}
        </span>

        <h3>{item.titleEn}</h3>

        {item.titleLocal && (
          <p className="decision-local">{item.titleLocal}</p>
        )}

        <p>{item.body}</p>

        <small>{item.note}</small>
      </div>
    ))}
  </div>
</section>

        <section className="dashboard-section">
     
        <div className="manual-section-header">
          <h2>{dualText("readinessTitle")}</h2>
          <p>{dualText("readinessSub")}</p>
        </div>

        <div className="readiness-board">
          {(readinessRows[language] || readinessRows.en).map(
            ([layer, description]) => (
              <div className="readiness-row" key={layer}>
                <div>
                  <span>{layer}</span>
                  <small>{description}</small>
                </div>
               <strong className="readiness-status">
                🟢 {t.operational}
               </strong>
              </div>
            )
          )}
        </div>
      </section>

      <section className="onboarding-final-panel">
        <div>
          <p className="completion-eyebrow">{t.finalKicker}</p>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalText}</p>

          <div className="completion-checklist">
            <span>✓ Records</span>
            <span>✓ Dashboard</span>
            <span>✓ Treasury</span>
            <span>✓ Governance</span>
            <span>✓ Autonomous</span>
            <span>✓ Documentation</span>
          </div>
        </div>

 <div className="completion-status-box">
  <span>TREASURY OS V1</span>
  <strong>{t.ready}</strong>
  <small>{t.systemStatus}</small>
</div>

</section>

</div>

);
}