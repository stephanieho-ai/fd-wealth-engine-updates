export const chapter03Intelligence = {
  id: "chapter-03",

  title: {
    en: "Treasury Intelligence Layer",
    zh: "财资智能层",
    jp: "財務インテリジェンス層",
    bm: "Lapisan Kecerdasan Treasury",
  },

  description: {
    en: "Institutional treasury intelligence architecture based on G21, covering summary, signal, assessment, recommendation, decision, execution, feedback, learning, prediction, scenario, what-if and future state modeling.",
    zh: "基于 G21 的机构级财资智能架构，涵盖总览、信号、评估、建议、决策、执行、反馈、学习、预测、情境、假设分析与未来状态建模。",
    jp: "G21 に基づく機関レベルの財務インテリジェンスアーキテクチャです。概要、シグナル、評価、推奨、意思決定、実行、フィードバック、学習、予測、シナリオ、What-If、将来状態モデリングを含みます。",
    bm: "Seni bina kecerdasan treasury institusi berdasarkan G21, merangkumi ringkasan, isyarat, penilaian, cadangan, keputusan, pelaksanaan, maklum balas, pembelajaran, ramalan, senario, what-if dan pemodelan keadaan masa depan.",
  },

  learningGoal: {
    en: "Understand how Treasury Intelligence converts treasury data into structured insight, operating judgement, recommendations and forward-looking decision support.",
    zh: "理解财资智能如何把财资数据转换成结构化洞察、运营判断、操作建议与前瞻性决策支持。",
    jp: "Treasury Intelligence が財務データを構造化された洞察、運用判断、推奨、将来を見据えた意思決定支援へ変換する方法を理解します。",
    bm: "Memahami bagaimana Treasury Intelligence menukar data treasury kepada insight berstruktur, pertimbangan operasi, cadangan dan sokongan keputusan berorientasi masa depan.",
  },

  sections: [
    {
      id: "intelligence-summary",

      title: {
        en: "Intelligence Summary",
        zh: "智能总览",
        jp: "インテリジェンス概要",
        bm: "Ringkasan Kecerdasan",
      },

      meaning: {
        en: "Treasury intelligence overview layer.",
        zh: "财资智能总览层。",
        jp: "財務インテリジェンスの概要層です。",
        bm: "Lapisan gambaran keseluruhan kecerdasan treasury.",
      },

      purpose: {
        en: "Provides a high-level view of treasury condition, liquidity stress, governance pressure and action readiness.",
        zh: "提供财资状态、流动性压力、治理压力与行动准备度的高层总览。",
        jp: "財務状況、流動性ストレス、ガバナンス圧力、アクション準備状況を高い視点で把握できます。",
        bm: "Memberi paparan tahap tinggi tentang keadaan treasury, tekanan liquidity, tekanan governance dan kesediaan tindakan.",
      },

      usage: {
        en: "Read this first to understand the overall intelligence condition before reviewing deeper modules.",
        zh: "先阅读这一部分，理解整体智能状态，再进入更深入的模块。",
        jp: "より詳細なモジュールを確認する前に、まず全体のインテリジェンス状態を理解するために使用します。",
        bm: "Baca dahulu untuk memahami keadaan kecerdasan keseluruhan sebelum menyemak modul yang lebih mendalam.",
      },
    },

    {
      id: "intelligence-signal",

      title: {
        en: "Signal Engine",
        zh: "信号引擎",
        jp: "シグナルエンジン",
        bm: "Enjin Isyarat",
      },

      meaning: {
        en: "Treasury signal detection engine.",
        zh: "财资信号侦测引擎。",
        jp: "財務シグナル検出エンジンです。",
        bm: "Enjin pengesanan isyarat treasury.",
      },

      purpose: {
        en: "Identifies treasury signals such as liquidity stability, governance pressure, policy restriction and confidence level.",
        zh: "识别流动性稳定性、治理压力、政策限制与信心水平等财资信号。",
        jp: "流動性の安定性、ガバナンス圧力、ポリシー制限、信頼度レベルなどの財務シグナルを検出します。",
        bm: "Mengenal pasti isyarat treasury seperti kestabilan liquidity, tekanan governance, sekatan policy dan tahap keyakinan.",
      },

      usage: {
        en: "Use it to understand what Treasury OS is detecting before interpreting or acting on the condition.",
        zh: "在解读或行动之前，先使用它了解 Treasury OS 正在侦测到什么。",
        jp: "状態を解釈または対応する前に、Treasury OS が何を検出しているかを理解するために使用します。",
        bm: "Gunakan untuk memahami apa yang Treasury OS sedang kesan sebelum mentafsir atau bertindak terhadap keadaan tersebut.",
      },
    },

    {
      id: "intelligence-assessment",

      title: {
        en: "Assessment Engine",
        zh: "评估引擎",
        jp: "評価エンジン",
        bm: "Enjin Penilaian",
      },

      meaning: {
        en: "Treasury condition interpretation engine.",
        zh: "财资状态解读引擎。",
        jp: "財務状態を解釈するエンジンです。",
        bm: "Enjin tafsiran keadaan treasury.",
      },

      purpose: {
        en: "Explains what treasury signals mean and how serious the current condition may be.",
        zh: "解释财资信号的含义，以及当前状态可能有多严重。",
        jp: "財務シグナルの意味と、現在の状態がどの程度深刻かを説明します。",
        bm: "Menjelaskan maksud isyarat treasury dan tahap keseriusan keadaan semasa.",
      },

      usage: {
        en: "Use it to distinguish stable, elevated, restricted or critical treasury conditions.",
        zh: "使用它区分稳定、升高、受限或关键的财资状态。",
        jp: "安定、上昇、制限、重大な財務状態を区別するために使用します。",
        bm: "Gunakan untuk membezakan keadaan treasury yang stabil, meningkat, terhad atau kritikal.",
      },
    },

    {
      id: "intelligence-recommendation",

      title: {
        en: "Recommendation Engine",
        zh: "建议引擎",
        jp: "推奨エンジン",
        bm: "Enjin Cadangan",
      },

      meaning: {
        en: "Treasury action guidance engine.",
        zh: "财资行动指导引擎。",
        jp: "財務アクションガイダンスエンジンです。",
        bm: "Enjin panduan tindakan treasury.",
      },

      purpose: {
        en: "Converts assessment results into suggested treasury actions such as monitoring, reserve protection, deployment pause or governance escalation.",
        zh: "把评估结果转换成建议财资行动，例如持续监控、保护储备、暂停部署或治理升级。",
        jp: "評価結果を、監視継続、準備金保護、展開停止、ガバナンスエスカレーションなどの推奨アクションに変換します。",
        bm: "Menukar hasil penilaian kepada tindakan treasury yang dicadangkan seperti monitoring, perlindungan reserve, deployment pause atau governance escalation.",
      },

      usage: {
        en: "Review recommendations before approving, delaying or escalating treasury action.",
        zh: "在批准、延迟或升级财资行动前查看建议。",
        jp: "財務アクションを承認、延期、またはエスカレーションする前に推奨を確認します。",
        bm: "Semak cadangan sebelum approve, delay atau escalate tindakan treasury.",
      },
    },

    {
      id: "intelligence-decision",

      title: {
        en: "Decision Engine",
        zh: "决策引擎",
        jp: "意思決定エンジン",
        bm: "Enjin Keputusan",
      },

      meaning: {
        en: "Treasury decision support engine.",
        zh: "财资决策支持引擎。",
        jp: "財務意思決定支援エンジンです。",
        bm: "Enjin sokongan keputusan treasury.",
      },

      purpose: {
        en: "Supports institutional treasury judgement before action is taken.",
        zh: "在采取行动前支持机构级财资判断。",
        jp: "アクションを取る前に、機関レベルの財務判断を支援します。",
        bm: "Menyokong pertimbangan treasury institusi sebelum tindakan diambil.",
      },

      usage: {
        en: "Use it as the final intelligence checkpoint before execution, review or escalation.",
        zh: "把它作为执行、复核或升级前的最终智能检查点。",
        jp: "実行、確認、またはエスカレーション前の最終インテリジェンス確認点として使用します。",
        bm: "Gunakan sebagai checkpoint kecerdasan terakhir sebelum execution, review atau escalation.",
      },
    },

    {
      id: "intelligence-execution",

      title: {
        en: "Execution Engine",
        zh: "执行引擎",
        jp: "実行エンジン",
        bm: "Enjin Pelaksanaan",
      },

      meaning: {
        en: "Treasury execution readiness engine.",
        zh: "财资执行准备度引擎。",
        jp: "財務実行準備エンジンです。",
        bm: "Enjin kesediaan pelaksanaan treasury.",
      },

      purpose: {
        en: "Connects treasury intelligence to controlled operator action.",
        zh: "把财资智能连接到受控的操作员行动。",
        jp: "財務インテリジェンスを制御されたオペレーターアクションへ接続します。",
        bm: "Menghubungkan treasury intelligence kepada tindakan operator yang terkawal.",
      },

      usage: {
        en: "Use it to confirm whether a recommendation can move into execution, review, delay or escalation.",
        zh: "使用它确认建议是否可以进入执行、复核、延迟或升级。",
        jp: "推奨が実行、確認、延期、エスカレーションへ進めるかを確認するために使用します。",
        bm: "Gunakan untuk mengesahkan sama ada recommendation boleh bergerak kepada execution, review, delay atau escalation.",
      },
    },

    {
      id: "intelligence-feedback",

      title: {
        en: "Feedback Loop Engine",
        zh: "反馈循环引擎",
        jp: "フィードバックループエンジン",
        bm: "Enjin Gelung Maklum Balas",
      },

      meaning: {
        en: "Treasury action result tracking engine.",
        zh: "财资行动结果追踪引擎。",
        jp: "財務アクション結果追跡エンジンです。",
        bm: "Enjin penjejakan hasil tindakan treasury.",
      },

      purpose: {
        en: "Records the result of treasury actions and sends the outcome back into the intelligence cycle.",
        zh: "记录财资行动结果，并把结果回流到智能循环。",
        jp: "財務アクションの結果を記録し、その結果をインテリジェンスサイクルへ戻します。",
        bm: "Merekod hasil tindakan treasury dan menghantar hasil tersebut kembali ke dalam kitaran kecerdasan.",
      },

      usage: {
        en: "Use it to confirm whether actions improved, stabilized, delayed or escalated the treasury condition.",
        zh: "使用它确认行动是否改善、稳定、延迟或升级了财资状态。",
        jp: "アクションが財務状態を改善、安定、遅延、またはエスカレーションしたかを確認するために使用します。",
        bm: "Gunakan untuk mengesahkan sama ada tindakan memperbaiki, menstabilkan, melambatkan atau meningkatkan keadaan treasury.",
      },
    },

    {
      id: "intelligence-learning",

      title: {
        en: "Learning Engine",
        zh: "学习引擎",
        jp: "学習エンジン",
        bm: "Enjin Pembelajaran",
      },

      meaning: {
        en: "Treasury pattern memory engine.",
        zh: "财资模式记忆引擎。",
        jp: "財務パターン記憶エンジンです。",
        bm: "Enjin memori pola treasury.",
      },

      purpose: {
        en: "Preserves treasury patterns, repeated pressure zones and previous operator outcomes.",
        zh: "保留财资模式、重复压力区域与过去操作结果。",
        jp: "財務パターン、繰り返し発生する圧力領域、過去のオペレーター結果を保持します。",
        bm: "Menyimpan pola treasury, zon tekanan berulang dan hasil operator terdahulu.",
      },

      usage: {
        en: "Use it to understand repeated issues and improve future treasury awareness.",
        zh: "使用它理解重复问题，并提升未来财资认知。",
        jp: "繰り返し発生する問題を理解し、将来の財務認識を向上させるために使用します。",
        bm: "Gunakan untuk memahami isu berulang dan meningkatkan kesedaran treasury masa depan.",
      },
    },

    {
      id: "intelligence-prediction",

      title: {
        en: "Prediction Engine",
        zh: "预测引擎",
        jp: "予測エンジン",
        bm: "Enjin Ramalan",
      },

      meaning: {
        en: "Forward treasury visibility engine.",
        zh: "前瞻性财资可视化引擎。",
        jp: "将来の財務可視化エンジンです。",
        bm: "Enjin keterlihatan treasury ke hadapan.",
      },

      purpose: {
        en: "Estimates how treasury condition may develop in the future.",
        zh: "估算财资状态未来可能如何发展。",
        jp: "財務状態が将来どのように変化する可能性があるかを推定します。",
        bm: "Menganggarkan bagaimana keadaan treasury mungkin berkembang pada masa depan.",
      },

      usage: {
        en: "Use it to detect whether current signals may become future liquidity stress, governance bottleneck or execution restriction.",
        zh: "使用它判断当前信号是否可能演变成未来流动性压力、治理瓶颈或执行限制。",
        jp: "現在のシグナルが将来の流動性ストレス、ガバナンスのボトルネック、実行制限につながるかを確認するために使用します。",
        bm: "Gunakan untuk mengesan sama ada signal semasa mungkin menjadi tekanan liquidity, bottleneck governance atau sekatan execution pada masa depan.",
      },
    },

    {
      id: "intelligence-scenario",

      title: {
        en: "Scenario Engine",
        zh: "情境引擎",
        jp: "シナリオエンジン",
        bm: "Enjin Senario",
      },

      meaning: {
        en: "Treasury scenario planning engine.",
        zh: "财资情境规划引擎。",
        jp: "財務シナリオ計画エンジンです。",
        bm: "Enjin perancangan senario treasury.",
      },

      purpose: {
        en: "Allows the operator to compare different possible treasury operating situations.",
        zh: "允许操作员比较不同可能的财资运营情境。",
        jp: "オペレーターが複数の財務運用シナリオを比較できるようにします。",
        bm: "Membolehkan operator membandingkan situasi operasi treasury yang berbeza.",
      },

      usage: {
        en: "Use it to plan safely before choosing a treasury action path.",
        zh: "在选择财资行动路径前，用它进行安全规划。",
        jp: "財務アクション経路を選ぶ前に、安全に計画するために使用します。",
        bm: "Gunakan untuk merancang dengan selamat sebelum memilih laluan tindakan treasury.",
      },
    },

    {
      id: "intelligence-what-if",

      title: {
        en: "What-If Engine",
        zh: "假设分析引擎",
        jp: "What-If エンジン",
        bm: "Enjin What-If",
      },

      meaning: {
        en: "Treasury alternative testing engine.",
        zh: "财资替代方案测试引擎。",
        jp: "財務代替案テストエンジンです。",
        bm: "Enjin ujian alternatif treasury.",
      },

      purpose: {
        en: "Tests possible treasury alternatives before real execution.",
        zh: "在真实执行前测试可能的财资替代方案。",
        jp: "実際の実行前に、可能な財務代替案をテストします。",
        bm: "Menguji alternatif treasury yang mungkin sebelum execution sebenar.",
      },

      usage: {
        en: "Use it to understand the possible impact of capital deployment, reserve protection, liquidity pressure or escalation.",
        zh: "使用它理解资本部署、储备保护、流动性压力或升级处理可能带来的影响。",
        jp: "資本展開、準備金保護、流動性圧力、エスカレーションの影響を理解するために使用します。",
        bm: "Gunakan untuk memahami kemungkinan kesan deployment modal, perlindungan reserve, tekanan liquidity atau escalation.",
      },
    },

    {
      id: "intelligence-future-state",

      title: {
        en: "Future State Modeling Engine",
        zh: "未来状态建模引擎",
        jp: "将来状態モデリングエンジン",
        bm: "Enjin Pemodelan Keadaan Masa Depan",
      },

      meaning: {
        en: "Treasury forward operating model engine.",
        zh: "财资前瞻运营模型引擎。",
        jp: "財務の将来運用モデルエンジンです。",
        bm: "Enjin model operasi treasury masa depan.",
      },

      purpose: {
        en: "Describes the possible future direction of the treasury environment.",
        zh: "描述财资环境未来可能的发展方向。",
        jp: "財務環境が将来どの方向へ進む可能性があるかを示します。",
        bm: "Menerangkan kemungkinan arah masa depan persekitaran treasury.",
      },

      usage: {
        en: "Use it to understand whether Treasury OS is improving, stabilizing, deteriorating or moving toward intervention.",
        zh: "使用它判断 Treasury OS 正在改善、稳定、恶化，还是走向介入。",
        jp: "Treasury OS が改善、安定、悪化、または介入へ向かっているかを理解するために使用します。",
        bm: "Gunakan untuk memahami sama ada Treasury OS sedang bertambah baik, stabil, merosot atau menuju kepada intervensi.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Intelligence Summary",
      "Signal Engine",
      "Assessment Engine",
      "Recommendation Engine",
      "Decision Engine",
      "Execution Engine",
      "Feedback Loop Engine",
      "Learning Engine",
      "Prediction Engine",
      "Scenario Engine",
      "What-If Engine",
      "Future State Modeling Engine",
    ],
    zh: [
      "智能总览",
      "信号引擎",
      "评估引擎",
      "建议引擎",
      "决策引擎",
      "执行引擎",
      "反馈循环引擎",
      "学习引擎",
      "预测引擎",
      "情境引擎",
      "假设分析引擎",
      "未来状态建模引擎",
    ],
    jp: [
      "インテリジェンス概要",
      "シグナルエンジン",
      "評価エンジン",
      "推奨エンジン",
      "意思決定エンジン",
      "実行エンジン",
      "フィードバックループエンジン",
      "学習エンジン",
      "予測エンジン",
      "シナリオエンジン",
      "What-If エンジン",
      "将来状態モデリングエンジン",
    ],
    bm: [
      "Ringkasan Kecerdasan",
      "Enjin Isyarat",
      "Enjin Penilaian",
      "Enjin Cadangan",
      "Enjin Keputusan",
      "Enjin Pelaksanaan",
      "Enjin Gelung Maklum Balas",
      "Enjin Pembelajaran",
      "Enjin Ramalan",
      "Enjin Senario",
      "Enjin What-If",
      "Enjin Pemodelan Keadaan Masa Depan",
    ],
  },

  summary: {
    en: "Treasury Intelligence Layer is the analytical brain of Treasury OS. It converts treasury data into signals, assessments, recommendations, decisions, execution readiness, feedback, learning, prediction, scenarios, what-if analysis and future state modeling. This layer helps the operator understand not only what is happening, but also what it means and what may happen next.",
    zh: "财资智能层是 Treasury OS 的分析大脑。它把财资数据转换成信号、评估、建议、决策、执行准备、反馈、学习、预测、情境、假设分析与未来状态建模。这个层帮助操作员理解不仅发生了什么，也理解它代表什么，以及接下来可能发生什么。",
    jp: "Treasury Intelligence Layer は Treasury OS の分析脳です。財務データをシグナル、評価、推奨、意思決定、実行準備、フィードバック、学習、予測、シナリオ、What-If 分析、将来状態モデリングへ変換します。この層は、何が起きているかだけでなく、その意味と次に何が起こる可能性があるかを理解するために役立ちます。",
    bm: "Lapisan Kecerdasan Treasury ialah otak analitik Treasury OS. Ia menukar data treasury kepada isyarat, penilaian, cadangan, keputusan, kesediaan pelaksanaan, maklum balas, pembelajaran, ramalan, senario, analisis what-if dan pemodelan keadaan masa depan. Lapisan ini membantu operator memahami bukan sahaja apa yang berlaku, tetapi juga maksudnya dan apa yang mungkin berlaku seterusnya.",
  },
};