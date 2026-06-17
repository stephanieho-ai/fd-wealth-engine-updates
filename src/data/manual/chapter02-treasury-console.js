export const chapter02TreasuryConsole = {
  id: "chapter-02",

  title: {
    en: "Treasury Console",
    zh: "财资控制台",
    jp: "財務管理コンソール",
    bm: "Konsol Treasury",
  },

  description: {
    en: "Treasury operations command center covering signal, assessment, recommendation and execution lifecycle from G18 to G24.",
    zh: "财资操作指挥中心，涵盖从 G18 到 G24 的信号、评估、建议与执行生命周期。",
    jp: "G18 から G24 までのシグナル、評価、推奨、実行ライフサイクルを管理する財務運用指令センターです。",
    bm: "Pusat arahan operasi treasury yang merangkumi signal, assessment, recommendation dan execution lifecycle dari G18 hingga G24.",
  },

  learningGoal: {
    en: "Understand how Treasury Console converts portfolio condition, liquidity pressure, risk movement and governance signals into treasury recommendations, actions, recovery flow and future state awareness.",
    zh: "理解财资控制台如何把投资组合状态、流动性压力、风险变化与治理信号转换成财资建议、操作行动、恢复流程与未来状态判断。",
    jp: "Treasury Console が、ポートフォリオ状況、流動性圧力、リスク変化、ガバナンスシグナルを、財務上の推奨、アクション、回復フロー、将来状態の認識へ変換する仕組みを理解します。",
    bm: "Memahami bagaimana Konsol Treasury menukar keadaan portfolio, tekanan liquidity, pergerakan risiko dan signal governance kepada cadangan treasury, tindakan, aliran recovery dan future state awareness.",
  },

  sections: [
    {
      id: "treasury-control-tower",

      title: {
        en: "Treasury Control Tower",
        zh: "财资控制塔",
        jp: "財務コントロールタワー",
        bm: "Menara Kawalan Treasury",
      },

      meaning: {
        en: "Institutional treasury command center.",
        zh: "机构级财资指挥中心。",
        jp: "機関レベルの財務指令センターです。",
        bm: "Pusat arahan treasury peringkat institusi.",
      },

      purpose: {
        en: "Centralizes monitoring of treasury condition, liquidity pressure, risk exposure, governance status and recovery readiness.",
        zh: "集中监控财资状态、流动性压力、风险暴露、治理状态与恢复准备度。",
        jp: "財務状況、流動性圧力、リスクエクスポージャー、ガバナンス状態、回復準備状況を一元的に監視します。",
        bm: "Memusatkan pemantauan keadaan treasury, tekanan liquidity, pendedahan risiko, status governance dan kesediaan recovery.",
      },

      usage: {
        en: "Use it as the first command view when checking whether the treasury environment is stable, pressured, restricted or requiring intervention.",
        zh: "当需要判断财资环境是稳定、受压、受限或需要介入时，先查看这一指挥视图。",
        jp: "財務環境が安定、圧力下、制限中、または介入が必要かを確認する最初の指令ビューとして使用します。",
        bm: "Gunakan sebagai paparan arahan pertama untuk menilai sama ada persekitaran treasury stabil, bertekanan, terhad atau memerlukan intervensi.",
      },
    },

    {
      id: "signal-layer",

      title: {
        en: "Signal Layer",
        zh: "信号层",
        jp: "シグナル層",
        bm: "Lapisan Isyarat",
      },

      meaning: {
        en: "Treasury condition detection layer.",
        zh: "财资状态侦测层。",
        jp: "財務状態を検出する層です。",
        bm: "Lapisan pengesanan keadaan treasury.",
      },

      purpose: {
        en: "Detects liquidity pressure, recovery queue pressure, escalation activity and policy restriction.",
        zh: "侦测流动性压力、恢复队列压力、升级活动与政策限制。",
        jp: "流動性圧力、回復キューの圧力、エスカレーション活動、ポリシー制限を検出します。",
        bm: "Mengesan tekanan liquidity, tekanan recovery queue, aktiviti escalation dan sekatan policy.",
      },

      usage: {
        en: "Read it first to understand what the system is seeing before reviewing assessment or recommendation layers.",
        zh: "先阅读这一层，了解系统正在看到什么，再进入评估或建议层。",
        jp: "評価層や推奨層を確認する前に、システムが何を検出しているかを理解するために最初に確認します。",
        bm: "Baca dahulu untuk memahami apa yang sistem sedang lihat sebelum menyemak lapisan assessment atau recommendation.",
      },
    },

    {
      id: "assessment-layer",

      title: {
        en: "Assessment Layer",
        zh: "评估层",
        jp: "評価層",
        bm: "Lapisan Penilaian",
      },

      meaning: {
        en: "Treasury condition interpretation layer.",
        zh: "财资状态解读层。",
        jp: "財務状態を解釈する層です。",
        bm: "Lapisan tafsiran keadaan treasury.",
      },

      purpose: {
        en: "Explains whether detected treasury signals are normal, elevated, restricted or critical.",
        zh: "解释侦测到的财资信号是正常、升高、受限还是关键状态。",
        jp: "検出された財務シグナルが正常、上昇、制限、または重大状態であるかを説明します。",
        bm: "Menjelaskan sama ada signal treasury yang dikesan berada dalam keadaan normal, meningkat, terhad atau kritikal.",
      },

      usage: {
        en: "Use it to avoid reacting blindly to signals and to understand the seriousness of the treasury condition.",
        zh: "使用这一层避免盲目响应信号，并理解财资状态的严重程度。",
        jp: "シグナルに盲目的に反応せず、財務状態の深刻度を理解するために使用します。",
        bm: "Gunakan untuk mengelakkan tindak balas secara membuta tuli terhadap signal dan memahami tahap keseriusan keadaan treasury.",
      },
    },

    {
      id: "recommendation-layer",

      title: {
        en: "Recommendation Layer",
        zh: "建议层",
        jp: "推奨層",
        bm: "Lapisan Cadangan",
      },

      meaning: {
        en: "Treasury operating guidance layer.",
        zh: "财资操作指导层。",
        jp: "財務運用ガイダンスの層です。",
        bm: "Lapisan panduan operasi treasury.",
      },

      purpose: {
        en: "Converts treasury assessment into suggested operator actions such as monitor, protect reserve, pause deployment or escalate.",
        zh: "把财资评估转换成建议操作，例如继续监控、保护储备、暂停部署或升级处理。",
        jp: "財務評価を、監視継続、準備金保護、展開停止、エスカレーションなどの推奨アクションに変換します。",
        bm: "Menukar assessment treasury kepada tindakan operator yang dicadangkan seperti monitor, lindungi reserve, hentikan deployment atau escalate.",
      },

      usage: {
        en: "Use it as guided decision support before approving, reviewing, delaying or escalating treasury action.",
        zh: "在批准、复核、延迟或升级财资行动前，把它作为决策辅助。",
        jp: "承認、確認、延期、エスカレーションを行う前の意思決定支援として使用します。",
        bm: "Gunakan sebagai sokongan keputusan sebelum approve, review, delay atau escalate tindakan treasury.",
      },
    },

    {
      id: "decision-layer",

      title: {
        en: "Decision Layer",
        zh: "决策层",
        jp: "意思決定層",
        bm: "Lapisan Keputusan",
      },

      meaning: {
        en: "Treasury Decision Brain and safety gate.",
        zh: "财资决策大脑与安全闸门。",
        jp: "財務意思決定ブレインと安全ゲートです。",
        bm: "Treasury Decision Brain dan pintu kawalan keselamatan.",
      },

      purpose: {
        en: "Classifies treasury condition into NORMAL, WARNING, RESTRICTED or LOCKDOWN before execution.",
        zh: "在执行前把财资状态分类为 NORMAL、WARNING、RESTRICTED 或 LOCKDOWN。",
        jp: "実行前に財務状態を NORMAL、WARNING、RESTRICTED、LOCKDOWN に分類します。",
        bm: "Mengelaskan keadaan treasury kepada NORMAL, WARNING, RESTRICTED atau LOCKDOWN sebelum execution.",
      },

      usage: {
        en: "Treat it as the main safety gate before any new capital deployment or treasury execution.",
        zh: "把它视为任何新资本部署或财资执行前的主要安全闸门。",
        jp: "新しい資金展開や財務実行の前に、主要な安全ゲートとして扱います。",
        bm: "Anggap sebagai pintu keselamatan utama sebelum deployment modal baharu atau execution treasury.",
      },
    },

    {
      id: "execution-layer",

      title: {
        en: "Execution Layer",
        zh: "执行层",
        jp: "実行層",
        bm: "Lapisan Pelaksanaan",
      },

      meaning: {
        en: "Operator action and treasury response layer.",
        zh: "操作员行动与财资响应层。",
        jp: "オペレーターアクションと財務レスポンスの層です。",
        bm: "Lapisan tindakan operator dan respons treasury.",
      },

      purpose: {
        en: "Records operator actions such as approve, review, delay, escalate, hold or simulate risk.",
        zh: "记录批准、复核、延迟、升级、暂停或模拟风险等操作员行动。",
        jp: "承認、確認、延期、エスカレーション、保留、リスクシミュレーションなどの操作を記録します。",
        bm: "Merekod tindakan operator seperti approve, review, delay, escalate, hold atau simulate risk.",
      },

      usage: {
        en: "Use it to convert treasury intelligence into controlled action while preserving audit visibility.",
        zh: "使用它把财资智能转换成受控行动，同时保留审计可视性。",
        jp: "財務インテリジェンスを制御されたアクションに変換し、監査可視性を保持するために使用します。",
        bm: "Gunakan untuk menukar treasury intelligence kepada tindakan terkawal sambil mengekalkan audit visibility.",
      },
    },

    {
      id: "feedback-layer",

      title: {
        en: "Feedback Layer",
        zh: "反馈层",
        jp: "フィードバック層",
        bm: "Lapisan Maklum Balas",
      },

      meaning: {
        en: "Treasury response after action.",
        zh: "行动后的财资响应。",
        jp: "アクション後の財務レスポンスです。",
        bm: "Respons treasury selepas tindakan.",
      },

      purpose: {
        en: "Shows whether the recommendation was approved, reviewed, delayed or escalated, and what should happen next.",
        zh: "显示建议是否已批准、复核、延迟或升级，以及下一步应如何处理。",
        jp: "推奨が承認、確認、延期、またはエスカレーションされたか、次に何をすべきかを示します。",
        bm: "Menunjukkan sama ada recommendation telah approved, reviewed, delayed atau escalated, serta langkah seterusnya.",
      },

      usage: {
        en: "Use it to confirm whether the action improved, delayed or escalated the treasury condition.",
        zh: "使用它确认行动是否改善、延迟或升级了财资状态。",
        jp: "アクションが財務状態を改善、遅延、またはエスカレーションしたかを確認するために使用します。",
        bm: "Gunakan untuk mengesahkan sama ada tindakan memperbaiki, melambatkan atau meningkatkan keadaan treasury.",
      },
    },

    {
      id: "learning-layer",

      title: {
        en: "Learning Layer",
        zh: "学习层",
        jp: "学習層",
        bm: "Lapisan Pembelajaran",
      },

      meaning: {
        en: "Treasury intelligence memory layer.",
        zh: "财资智能记忆层。",
        jp: "財務インテリジェンスの記憶層です。",
        bm: "Lapisan memori kecerdasan treasury.",
      },

      purpose: {
        en: "Preserves decision context, workflow movement and recurring treasury pressure patterns.",
        zh: "保留决策背景、工作流变化与重复出现的财资压力模式。",
        jp: "意思決定の文脈、ワークフローの動き、繰り返し発生する財務圧力パターンを保持します。",
        bm: "Menyimpan konteks keputusan, pergerakan workflow dan pola tekanan treasury yang berulang.",
      },

      usage: {
        en: "Use it to understand repeated issues, weak zones and previous treasury decision outcomes.",
        zh: "使用它理解重复问题、薄弱区域与过去财资决策结果。",
        jp: "繰り返し発生する問題、弱い領域、過去の財務判断結果を理解するために使用します。",
        bm: "Gunakan untuk memahami isu berulang, zon lemah dan hasil keputusan treasury terdahulu.",
      },
    },

    {
      id: "prediction-layer",

      title: {
        en: "Prediction Layer",
        zh: "预测层",
        jp: "予測層",
        bm: "Lapisan Ramalan",
      },

      meaning: {
        en: "Forward treasury condition awareness layer.",
        zh: "前瞻性财资状态感知层。",
        jp: "将来の財務状態を把握する層です。",
        bm: "Lapisan kesedaran keadaan treasury ke hadapan.",
      },

      purpose: {
        en: "Estimates possible future treasury pressure based on current signals, liquidity stress and recovery activity.",
        zh: "根据当前信号、流动性压力与恢复活动，估算未来可能出现的财资压力。",
        jp: "現在のシグナル、流動性ストレス、回復活動に基づいて将来の財務圧力を推定します。",
        bm: "Menganggarkan kemungkinan tekanan treasury masa depan berdasarkan signal semasa, tekanan liquidity dan aktiviti recovery.",
      },

      usage: {
        en: "Use it to act early before treasury stress becomes critical.",
        zh: "使用它在财资压力变成关键问题前提前行动。",
        jp: "財務ストレスが重大化する前に早めに行動するために使用します。",
        bm: "Gunakan untuk bertindak awal sebelum tekanan treasury menjadi kritikal.",
      },
    },

    {
      id: "scenario-layer",

      title: {
        en: "Scenario Layer",
        zh: "情境层",
        jp: "シナリオ層",
        bm: "Lapisan Senario",
      },

      meaning: {
        en: "Treasury situation modeling layer.",
        zh: "财资情境建模层。",
        jp: "財務状況をモデル化する層です。",
        bm: "Lapisan pemodelan situasi treasury.",
      },

      purpose: {
        en: "Compares possible operating paths such as monitoring, reserve protection, deployment pause, recovery routing or governance escalation.",
        zh: "比较不同操作路径，例如监控、储备保护、暂停部署、恢复路由或治理升级。",
        jp: "監視、準備金保護、展開停止、回復ルーティング、ガバナンスエスカレーションなどの可能な運用経路を比較します。",
        bm: "Membandingkan laluan operasi seperti monitoring, reserve protection, deployment pause, recovery routing atau governance escalation.",
      },

      usage: {
        en: "Use it to understand the consequences of different treasury actions before execution.",
        zh: "使用它在执行前理解不同财资行动可能带来的结果。",
        jp: "実行前に異なる財務アクションの結果を理解するために使用します。",
        bm: "Gunakan untuk memahami kesan tindakan treasury yang berbeza sebelum execution.",
      },
    },

    {
      id: "what-if-layer",

      title: {
        en: "What-If Layer",
        zh: "假设分析层",
        jp: "What-If 分析層",
        bm: "Lapisan What-If",
      },

      meaning: {
        en: "Treasury alternative testing layer.",
        zh: "财资替代方案测试层。",
        jp: "財務代替案をテストする層です。",
        bm: "Lapisan ujian alternatif treasury.",
      },

      purpose: {
        en: "Tests possible outcomes before real treasury execution.",
        zh: "在真实财资执行前测试可能结果。",
        jp: "実際の財務実行前に、可能な結果をテストします。",
        bm: "Menguji kemungkinan hasil sebelum execution treasury sebenar.",
      },

      usage: {
        en: "Use it to test deployment restriction, liquidity stress, recovery pressure, reserve protection or escalation safely.",
        zh: "使用它安全测试部署限制、流动性压力、恢复压力、储备保护或升级情况。",
        jp: "展開制限、流動性ストレス、回復圧力、準備金保護、エスカレーションを安全にテストするために使用します。",
        bm: "Gunakan untuk menguji deployment restriction, tekanan liquidity, recovery pressure, reserve protection atau escalation dengan selamat.",
      },
    },

    {
      id: "future-state-layer",

      title: {
        en: "Future State Layer",
        zh: "未来状态层",
        jp: "将来状態層",
        bm: "Lapisan Keadaan Masa Depan",
      },

      meaning: {
        en: "Treasury forward operating model.",
        zh: "财资前瞻运营模型。",
        jp: "財務の将来運用モデルです。",
        bm: "Model operasi treasury ke hadapan.",
      },

      purpose: {
        en: "Shows where the treasury environment may move next by combining signal, assessment, decision, prediction and scenario awareness.",
        zh: "结合信号、评估、决策、预测与情境感知，显示财资环境下一步可能走向。",
        jp: "シグナル、評価、意思決定、予測、シナリオ認識を組み合わせ、財務環境が次にどこへ向かうかを示します。",
        bm: "Menunjukkan arah seterusnya persekitaran treasury dengan menggabungkan signal, assessment, decision, prediction dan scenario awareness.",
      },

      usage: {
        en: "Use it to understand whether Treasury OS is improving, stabilizing, deteriorating or moving toward intervention.",
        zh: "使用它判断 Treasury OS 正在改善、稳定、恶化，还是走向介入状态。",
        jp: "Treasury OS が改善、安定、悪化、または介入へ向かっているかを理解するために使用します。",
        bm: "Gunakan untuk memahami sama ada Treasury OS sedang bertambah baik, stabil, merosot atau menuju kepada intervensi.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Treasury Control Tower",
      "Signal Layer",
      "Assessment Layer",
      "Recommendation Layer",
      "Decision Layer",
      "Execution Layer",
      "Feedback Layer",
      "Learning Layer",
      "Prediction Layer",
      "Scenario Layer",
      "What-If Layer",
      "Future State Layer",
    ],
    zh: [
      "财资控制塔",
      "信号层",
      "评估层",
      "建议层",
      "决策层",
      "执行层",
      "反馈层",
      "学习层",
      "预测层",
      "情境层",
      "假设分析层",
      "未来状态层",
    ],
    jp: [
      "財務コントロールタワー",
      "シグナル層",
      "評価層",
      "推奨層",
      "意思決定層",
      "実行層",
      "フィードバック層",
      "学習層",
      "予測層",
      "シナリオ層",
      "What-If 分析層",
      "将来状態層",
    ],
    bm: [
      "Menara Kawalan Treasury",
      "Lapisan Isyarat",
      "Lapisan Penilaian",
      "Lapisan Cadangan",
      "Lapisan Keputusan",
      "Lapisan Pelaksanaan",
      "Lapisan Maklum Balas",
      "Lapisan Pembelajaran",
      "Lapisan Ramalan",
      "Lapisan Senario",
      "Lapisan What-If",
      "Lapisan Keadaan Masa Depan",
    ],
  },

  summary: {
    en: "Treasury Console is the institutional operations layer of Treasury OS. It converts dashboard visibility into treasury intelligence, recommendations, decisions, execution control, feedback, learning, prediction, scenarios and future state awareness. It is the bridge between portfolio monitoring and full Treasury OS runtime operation.",
    zh: "财资控制台是 Treasury OS 的机构级操作层。它把仪表板可视性转换成财资智能、建议、决策、执行控制、反馈、学习、预测、情境与未来状态感知，是投资组合监控与完整 Treasury OS 运行之间的桥梁。",
    jp: "Treasury Console は Treasury OS の機関レベルの運用層です。Dashboard の可視性を、財務インテリジェンス、推奨、意思決定、実行制御、フィードバック、学習、予測、シナリオ、将来状態の認識へ変換します。ポートフォリオ監視と Treasury OS の本格的なランタイム運用をつなぐ橋渡しです。",
    bm: "Konsol Treasury ialah lapisan operasi institusi Treasury OS. Ia menukar keterlihatan dashboard kepada treasury intelligence, cadangan, keputusan, execution control, feedback, learning, prediction, scenario dan future state awareness. Ia menjadi jambatan antara pemantauan portfolio dan operasi runtime Treasury OS yang lengkap.",
  },
};