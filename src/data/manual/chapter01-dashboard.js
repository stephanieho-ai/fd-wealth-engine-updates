export const chapter01Dashboard = {
  id: "chapter-01",

  title: {
    en: "Dashboard Overview",
    zh: "仪表板总览",
    jp: "ダッシュボード概要",
    bm: "Gambaran Papan Pemuka",
  },

  description: {
    en: "Executive treasury monitoring center providing portfolio, liquidity, risk and operational visibility.",
    zh: "执行层财资监控中心，提供投资组合、流动性、风险与运营状态可视化。",
    jp: "ポートフォリオ、流動性、リスク、運用状況を可視化する経営層向け財務監視センターです。",
    bm: "Pusat pemantauan treasury eksekutif yang memaparkan portfolio, kecairan, risiko dan operasi.",
  },

  learningGoal: {
    en: "Understand how the Dashboard helps the operator monitor portfolio condition, capital movement, liquidity readiness, risk pressure and treasury activity from one executive view.",
    zh: "理解仪表板如何帮助操作员从一个执行视图中监控投资组合状态、资本流动、流动性准备度、风险压力与财资活动。",
    jp: "Dashboard が、ポートフォリオ状況、資本移動、流動性準備、リスク圧力、財務活動を一つの経営視点から監視する方法を理解します。",
    bm: "Memahami bagaimana Papan Pemuka membantu operator memantau keadaan portfolio, pergerakan modal, kesediaan kecairan, tekanan risiko dan aktiviti treasury dalam satu paparan eksekutif.",
  },

  sections: [
    {
      id: "portfolio-overview",

      title: {
        en: "Portfolio Overview",
        zh: "投资组合总览",
        jp: "ポートフォリオ概要",
        bm: "Gambaran Portfolio",
      },

      meaning: {
        en: "Executive portfolio monitoring view.",
        zh: "执行层投资组合监控视图。",
        jp: "経営層向けのポートフォリオ監視ビューです。",
        bm: "Paparan pemantauan portfolio eksekutif.",
      },

      purpose: {
        en: "Provides the first treasury snapshot of the entire portfolio condition.",
        zh: "提供整个投资组合状态的第一层财资快照。",
        jp: "ポートフォリオ全体の状態を最初に把握するための財務スナップショットを提供します。",
        bm: "Memberi snapshot treasury pertama tentang keseluruhan keadaan portfolio.",
      },

      usage: {
        en: "Review this first to understand whether the portfolio is stable before checking deeper liquidity, risk or policy modules.",
        zh: "先查看这一部分，确认投资组合是否稳定，然后再深入检查流动性、风险或政策模块。",
        jp: "まずこの部分を確認し、ポートフォリオが安定しているかを把握してから、流動性、リスク、ポリシーを確認します。",
        bm: "Semak bahagian ini dahulu untuk memahami sama ada portfolio stabil sebelum melihat modul liquidity, risk atau policy dengan lebih mendalam.",
      },
    },

    {
      id: "capital-engine",

      title: {
        en: "Capital Engine",
        zh: "资本引擎",
        jp: "資本エンジン",
        bm: "Enjin Modal",
      },

      meaning: {
        en: "Capital allocation and deployment visibility layer.",
        zh: "资本配置与资金部署可视化层。",
        jp: "資本配分と資金展開を可視化する層です。",
        bm: "Lapisan keterlihatan peruntukan modal dan penggunaan modal.",
      },

      purpose: {
        en: "Explains where capital is allocated and how money is being deployed or reserved.",
        zh: "解释资金目前分配在哪里，以及资金是被部署、保留还是等待行动。",
        jp: "資本がどこに配分され、資金がどのように展開または保留されているかを説明します。",
        bm: "Menerangkan di mana modal diperuntukkan dan bagaimana wang digunakan atau disimpan sebagai reserve.",
      },

      usage: {
        en: "Use this section to decide whether capital can be deployed, should remain reserved, or needs to be rebalanced.",
        zh: "使用这一部分判断资金是否可以部署、是否应该保留，或是否需要重新平衡。",
        jp: "資金を展開できるか、保留すべきか、または再調整が必要かを判断するために使います。",
        bm: "Gunakan bahagian ini untuk menentukan sama ada modal boleh digunakan, perlu dikekalkan sebagai reserve atau perlu diseimbangkan semula.",
      },
    },

    {
      id: "risk-monitor",

      title: {
        en: "Risk Monitor",
        zh: "风险监控器",
        jp: "リスク監視",
        bm: "Pemantau Risiko",
      },

      meaning: {
        en: "Treasury risk and pressure detection layer.",
        zh: "财资风险与压力侦测层。",
        jp: "財務リスクと圧力を検出する層です。",
        bm: "Lapisan pengesanan risiko dan tekanan treasury.",
      },

      purpose: {
        en: "Identifies treasury pressure, portfolio exposure and operating risk before action is taken.",
        zh: "在采取行动前识别财资压力、投资组合暴露与运营风险。",
        jp: "行動を取る前に、財務圧力、ポートフォリオのエクスポージャー、運用リスクを検出します。",
        bm: "Mengenal pasti tekanan treasury, pendedahan portfolio dan risiko operasi sebelum tindakan diambil.",
      },

      usage: {
        en: "Check this before new deployment. If risk rises, slow down and review liquidity, heatmap and policy breach modules.",
        zh: "在新资金部署前查看这一部分。如果风险上升，应放慢行动，并检查流动性、热力图与政策违规模块。",
        jp: "新しい資金展開の前に確認します。リスクが上昇している場合は、行動を遅らせ、流動性、ヒートマップ、ポリシー違反を確認します。",
        bm: "Semak sebelum deployment baharu. Jika risiko meningkat, perlahan tindakan dan semak liquidity, heatmap serta policy breach.",
      },
    },

    {
      id: "treasury-stress-simulation",

      title: {
        en: "Treasury Stress Simulation",
        zh: "财资压力模拟",
        jp: "財務ストレスシミュレーション",
        bm: "Simulasi Tekanan Treasury",
      },

      meaning: {
        en: "Scenario testing and treasury pressure simulation tool.",
        zh: "情境测试与财资压力模拟工具。",
        jp: "シナリオテストと財務圧力シミュレーションのための機能です。",
        bm: "Alat ujian senario dan simulasi tekanan treasury.",
      },

      purpose: {
        en: "Tests how the portfolio behaves under difficult conditions such as liquidity stress or concentration pressure.",
        zh: "测试投资组合在流动性压力、集中风险或不利条件下如何反应。",
        jp: "流動性ストレスや集中リスクなどの困難な状況下で、ポートフォリオがどのように反応するかを確認します。",
        bm: "Menguji bagaimana portfolio bertindak dalam keadaan sukar seperti tekanan liquidity atau concentration pressure.",
      },

      usage: {
        en: "Use this as a planning tool before real problems occur, not only during emergencies.",
        zh: "把它作为问题发生前的规划工具，而不是只在紧急情况时才使用。",
        jp: "緊急時だけでなく、問題が起きる前の計画ツールとして使用します。",
        bm: "Gunakan sebagai alat perancangan sebelum masalah sebenar berlaku, bukan hanya ketika kecemasan.",
      },
    },

    {
      id: "treasury-intelligence-center",

      title: {
        en: "Treasury Intelligence Center",
        zh: "财资智能中心",
        jp: "財務インテリジェンスセンター",
        bm: "Pusat Kecerdasan Treasury",
      },

      meaning: {
        en: "Signal, assessment and recommendation visibility layer.",
        zh: "信号、评估与建议可视化层。",
        jp: "シグナル、評価、推奨を可視化する層です。",
        bm: "Lapisan keterlihatan isyarat, penilaian dan cadangan.",
      },

      purpose: {
        en: "Converts treasury data into signals, assessments and operating recommendations.",
        zh: "把财资数据转换成信号、评估与操作建议。",
        jp: "財務データをシグナル、評価、運用上の推奨に変換します。",
        bm: "Menukar data treasury kepada isyarat, penilaian dan cadangan operasi.",
      },

      usage: {
        en: "Read this as the system’s intelligence summary before moving into deeper console, strategy or runtime layers.",
        zh: "在进入更深层的控制台、策略或运行层之前，先把这里当作系统的智能摘要来阅读。",
        jp: "より深いコンソール、戦略、ランタイム層に進む前に、システムのインテリジェンス要約として確認します。",
        bm: "Baca bahagian ini sebagai ringkasan kecerdasan sistem sebelum masuk ke console, strategy atau runtime layer yang lebih mendalam.",
      },
    },

    {
      id: "liquidity-flow-matrix",

      title: {
        en: "Liquidity Flow Matrix",
        zh: "流动性流向矩阵",
        jp: "流動性フローマトリクス",
        bm: "Matriks Aliran Kecairan",
      },

      meaning: {
        en: "Liquidity movement and maturity flow visibility layer.",
        zh: "流动性移动与到期流向可视化层。",
        jp: "流動性の動きと満期フローを可視化する層です。",
        bm: "Lapisan keterlihatan pergerakan liquidity dan aliran maturity.",
      },

      purpose: {
        en: "Shows how money moves across time, maturity months and treasury position.",
        zh: "显示资金如何跨时间、到期月份与财资位置流动。",
        jp: "資金が時間、満期月、財務ポジションを通じてどのように動くかを示します。",
        bm: "Menunjukkan bagaimana wang bergerak merentas masa, bulan maturity dan posisi treasury.",
      },

      usage: {
        en: "Use this to avoid blind deployment and keep the maturity ladder balanced across future months.",
        zh: "使用这一部分避免盲目部署，并保持未来月份的到期阶梯平衡。",
        jp: "盲目的な資金展開を避け、将来月の満期ラダーを均衡させるために使います。",
        bm: "Gunakan untuk mengelakkan deployment secara membuta tuli dan memastikan maturity ladder seimbang merentas bulan akan datang.",
      },
    },

    {
      id: "treasury-heatmap",

      title: {
        en: "Treasury Heatmap",
        zh: "财资热力图",
        jp: "財務ヒートマップ",
        bm: "Peta Haba Treasury",
      },

      meaning: {
        en: "Risk concentration and pressure visualization layer.",
        zh: "风险集中与压力可视化层。",
        jp: "リスク集中と圧力を可視化する層です。",
        bm: "Lapisan visualisasi tumpuan risiko dan tekanan.",
      },

      purpose: {
        en: "Visualizes where treasury pressure, concentration or exposure may exist.",
        zh: "可视化显示财资压力、集中风险或暴露可能存在的位置。",
        jp: "財務圧力、集中、エクスポージャーが存在する可能性のある場所を可視化します。",
        bm: "Memaparkan di mana tekanan treasury, concentration atau exposure mungkin berlaku.",
      },

      usage: {
        en: "Use this as a fast visual warning system. Strong signals should lead to deeper review.",
        zh: "把它作为快速视觉预警系统。强烈信号应触发更深入检查。",
        jp: "迅速な視覚的警告システムとして使います。強いシグナルが出た場合は、さらに深く確認します。",
        bm: "Gunakan sebagai sistem amaran visual pantas. Isyarat kuat perlu membawa kepada semakan yang lebih mendalam.",
      },
    },

    {
      id: "treasury-timeline",

      title: {
        en: "Treasury Timeline",
        zh: "财资时间线",
        jp: "財務タイムライン",
        bm: "Garis Masa Treasury",
      },

      meaning: {
        en: "Treasury history and audit movement layer.",
        zh: "财资历史与审计轨迹层。",
        jp: "財務履歴と監査の動きを示す層です。",
        bm: "Lapisan sejarah treasury dan pergerakan audit.",
      },

      purpose: {
        en: "Records important treasury events, workflow actions and operating history.",
        zh: "记录重要财资事件、工作流程动作与运营历史。",
        jp: "重要な財務イベント、ワークフローアクション、運用履歴を記録します。",
        bm: "Merekod treasury events penting, tindakan workflow dan sejarah operasi.",
      },

      usage: {
        en: "Use this to review past actions, understand decision history and preserve traceability.",
        zh: "使用它回顾过去行动、理解决策历史，并保留可追踪记录。",
        jp: "過去の行動を確認し、意思決定の履歴を理解し、追跡可能性を保持するために使用します。",
        bm: "Gunakan untuk menyemak tindakan lalu, memahami sejarah keputusan dan mengekalkan traceability.",
      },
    },

    {
      id: "policy-breach-monitor",

      title: {
        en: "Policy Breach Monitor",
        zh: "政策违规监控器",
        jp: "ポリシー違反監視",
        bm: "Pemantau Pelanggaran Polisi",
      },

      meaning: {
        en: "Policy compliance and breach detection layer.",
        zh: "政策合规与违规侦测层。",
        jp: "ポリシー遵守と違反検出のための層です。",
        bm: "Lapisan pematuhan polisi dan pengesanan pelanggaran.",
      },

      purpose: {
        en: "Checks whether treasury activity violates internal rules or safety boundaries.",
        zh: "检查财资活动是否违反内部规则或安全边界。",
        jp: "財務活動が内部ルールまたは安全境界に違反していないかを確認します。",
        bm: "Memeriksa sama ada aktiviti treasury melanggar peraturan dalaman atau sempadan keselamatan.",
      },

      usage: {
        en: "If a breach appears, stop normal deployment until the issue is reviewed, restricted or escalated.",
        zh: "如果出现违规，应停止普通部署，直到问题被审查、限制或升级处理。",
        jp: "違反が表示された場合、問題が確認、制限、またはエスカレーションされるまで通常の資金展開を停止します。",
        bm: "Jika pelanggaran muncul, hentikan deployment biasa sehingga isu disemak, dihadkan atau dieskalasikan.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Portfolio Overview",
      "Capital Engine",
      "Risk Monitor",
      "Treasury Stress Simulation",
      "Treasury Intelligence Center",
      "Liquidity Flow Matrix",
      "Treasury Heatmap",
      "Treasury Timeline",
      "Policy Breach Monitor",
    ],
    zh: [
      "投资组合总览",
      "资本引擎",
      "风险监控器",
      "财资压力模拟",
      "财资智能中心",
      "流动性流向矩阵",
      "财资热力图",
      "财资时间线",
      "政策违规监控器",
    ],
    jp: [
      "ポートフォリオ概要",
      "資本エンジン",
      "リスク監視",
      "財務ストレスシミュレーション",
      "財務インテリジェンスセンター",
      "流動性フローマトリクス",
      "財務ヒートマップ",
      "財務タイムライン",
      "ポリシー違反監視",
    ],
    bm: [
      "Gambaran Portfolio",
      "Enjin Modal",
      "Pemantau Risiko",
      "Simulasi Tekanan Treasury",
      "Pusat Kecerdasan Treasury",
      "Matriks Aliran Kecairan",
      "Peta Haba Treasury",
      "Garis Masa Treasury",
      "Pemantau Pelanggaran Polisi",
    ],
  },

  summary: {
    en: "Dashboard is the executive monitoring layer of Treasury OS. It helps the operator understand portfolio position, capital allocation, liquidity movement, risk exposure, intelligence signals, event history and policy safety before taking deeper treasury action.",
    zh: "仪表板是 Treasury OS 的执行监控层。它帮助操作员在采取更深入的财资行动之前，理解投资组合位置、资本配置、流动性移动、风险暴露、智能信号、事件历史与政策安全。",
    jp: "Dashboard は Treasury OS の経営監視層です。Operator がより深い財務アクションを取る前に、ポートフォリオ状況、資本配分、流動性の動き、リスクエクスポージャー、インテリジェンスシグナル、イベント履歴、ポリシー安全性を理解するために役立ちます。",
    bm: "Papan Pemuka ialah lapisan pemantauan eksekutif Treasury OS. Ia membantu operator memahami kedudukan portfolio, peruntukan modal, pergerakan kecairan, pendedahan risiko, isyarat kecerdasan, sejarah peristiwa dan keselamatan polisi sebelum mengambil tindakan treasury yang lebih mendalam.",
  },
};