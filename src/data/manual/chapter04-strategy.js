export const chapter04Strategy = {
  id: "chapter-04",

  title: {
    en: "Treasury Strategy Layer",
    zh: "财资策略层",
    jp: "財務戦略層",
    bm: "Lapisan Strategi Treasury",
  },

  description: {
    en: "Institutional treasury strategy architecture based on G22, covering strategy overview, alternatives, decision matrix, optimization, capital allocation, capital planning and strategy intelligence.",
    zh: "基于 G22 的机构级财资策略架构，涵盖策略总览、策略方案、决策矩阵、优化、资本配置、资本规划与策略智能。",
    jp: "G22 に基づく機関レベルの財務戦略アーキテクチャです。戦略概要、戦略代替案、意思決定マトリクス、最適化、資本配分、資本計画、戦略インテリジェンスを含みます。",
    bm: "Seni bina strategi treasury institusi berdasarkan G22 yang merangkumi gambaran strategi, alternatif strategi, matriks keputusan, pengoptimuman, peruntukan modal, perancangan modal dan kecerdasan strategi.",
  },

  learningGoal: {
    en: "Understand how Treasury Strategy converts treasury intelligence into long-term treasury direction, capital allocation, optimization decisions and strategic reasoning.",
    zh: "理解财资策略如何把财资智能转换成长期财资方向、资本配置、优化决策与策略推理。",
    jp: "Treasury Strategy が財務インテリジェンスを長期的な財務方向、資本配分、最適化判断、戦略的推論へ変換する方法を理解します。",
    bm: "Memahami bagaimana Strategi Treasury menukar kecerdasan treasury kepada hala tuju treasury jangka panjang, peruntukan modal, keputusan pengoptimuman dan penaakulan strategi.",
  },

  sections: [
    {
      id: "strategy-overview",

      title: {
        en: "Strategy Overview",
        zh: "策略总览",
        jp: "戦略概要",
        bm: "Gambaran Strategi",
      },

      meaning: {
        en: "Executive treasury strategy overview.",
        zh: "财资策略执行总览。",
        jp: "財務戦略の全体概要です。",
        bm: "Gambaran keseluruhan strategi treasury.",
      },

      purpose: {
        en: "Provides a consolidated view of treasury strategy direction and planning priorities.",
        zh: "提供财资策略方向与规划优先级的整体视图。",
        jp: "財務戦略の方向性と計画上の優先事項を統合的に把握できます。",
        bm: "Memberi pandangan menyeluruh mengenai hala tuju strategi treasury dan keutamaan perancangan.",
      },

      usage: {
        en: "Review it before entering individual strategy modules.",
        zh: "进入各个策略模块前先查看。",
        jp: "各戦略モジュールに入る前に確認します。",
        bm: "Semak sebelum memasuki modul strategi individu.",
      },
    },

    {
      id: "strategy-alternatives",

      title: {
        en: "Strategy Alternatives",
        zh: "策略方案",
        jp: "戦略代替案",
        bm: "Alternatif Strategi",
      },

      meaning: {
        en: "Treasury strategy option generation layer.",
        zh: "财资策略方案生成层。",
        jp: "財務戦略選択肢生成層です。",
        bm: "Lapisan penjanaan pilihan strategi treasury.",
      },

      purpose: {
        en: "Generates multiple treasury operating strategies for comparison and planning.",
        zh: "生成多个财资运营策略供比较与规划。",
        jp: "比較と計画のために複数の財務運営戦略を生成します。",
        bm: "Menjana pelbagai strategi operasi treasury untuk perbandingan dan perancangan.",
      },

      usage: {
        en: "Use it to explore different treasury paths before committing capital.",
        zh: "在投入资本前探索不同财资路径。",
        jp: "資本投入前に異なる財務方針を検討するために使用します。",
        bm: "Gunakan untuk meneroka laluan treasury yang berbeza sebelum mengagihkan modal.",
      },
    },

    {
      id: "decision-matrix",

      title: {
        en: "Decision Matrix",
        zh: "决策矩阵",
        jp: "意思決定マトリクス",
        bm: "Matriks Keputusan",
      },

      meaning: {
        en: "Treasury strategy evaluation framework.",
        zh: "财资策略评估框架。",
        jp: "財務戦略評価フレームワークです。",
        bm: "Rangka kerja penilaian strategi treasury.",
      },

      purpose: {
        en: "Evaluates strategy alternatives using risk, return, liquidity and governance criteria.",
        zh: "通过风险、收益、流动性与治理标准评估策略方案。",
        jp: "リスク、収益、流動性、ガバナンス基準で戦略案を評価します。",
        bm: "Menilai alternatif strategi menggunakan kriteria risiko, pulangan, liquidity dan governance.",
      },

      usage: {
        en: "Use it to identify the most balanced treasury strategy.",
        zh: "用于识别最平衡的财资策略。",
        jp: "最もバランスの取れた財務戦略を特定するために使用します。",
        bm: "Gunakan untuk mengenal pasti strategi treasury yang paling seimbang.",
      },
    },

    {
      id: "optimization-engine",

      title: {
        en: "Optimization Engine",
        zh: "优化引擎",
        jp: "最適化エンジン",
        bm: "Enjin Pengoptimuman",
      },

      meaning: {
        en: "Treasury performance optimization layer.",
        zh: "财资绩效优化层。",
        jp: "財務パフォーマンス最適化層です。",
        bm: "Lapisan pengoptimuman prestasi treasury.",
      },

      purpose: {
        en: "Improves treasury efficiency by reducing concentration risk and improving capital utilization.",
        zh: "通过降低集中风险与提高资本利用率来优化财资效率。",
        jp: "集中リスクを低減し、資本利用率を向上させることで財務効率を改善します。",
        bm: "Meningkatkan kecekapan treasury dengan mengurangkan risiko tumpuan dan meningkatkan penggunaan modal.",
      },

      usage: {
        en: "Use it when evaluating more efficient treasury deployment structures.",
        zh: "在评估更高效的财资部署结构时使用。",
        jp: "より効率的な財務展開構造を評価する際に使用します。",
        bm: "Gunakan semasa menilai struktur deployment treasury yang lebih cekap.",
      },
    },

    {
      id: "capital-allocation",

      title: {
        en: "Capital Allocation Engine",
        zh: "资本配置引擎",
        jp: "資本配分エンジン",
        bm: "Enjin Peruntukan Modal",
      },

      meaning: {
        en: "Treasury capital distribution framework.",
        zh: "财资资本分配框架。",
        jp: "財務資本配分フレームワークです。",
        bm: "Rangka kerja pengagihan modal treasury.",
      },

      purpose: {
        en: "Determines how available treasury capital should be allocated across opportunities.",
        zh: "决定可用财资资本应如何配置到不同机会。",
        jp: "利用可能な財務資本をどの機会へ配分するかを決定します。",
        bm: "Menentukan bagaimana modal treasury yang tersedia harus diagihkan kepada peluang yang berbeza.",
      },

      usage: {
        en: "Use it when planning portfolio growth and treasury deployment.",
        zh: "用于规划投资组合增长与财资部署。",
        jp: "ポートフォリオ成長と財務展開計画時に使用します。",
        bm: "Gunakan semasa merancang pertumbuhan portfolio dan deployment treasury.",
      },
    },

    {
      id: "capital-planning",

      title: {
        en: "Capital Planning Engine",
        zh: "资本规划引擎",
        jp: "資本計画エンジン",
        bm: "Enjin Perancangan Modal",
      },

      meaning: {
        en: "Long-term treasury planning framework.",
        zh: "长期财资规划框架。",
        jp: "長期財務計画フレームワークです。",
        bm: "Rangka kerja perancangan treasury jangka panjang.",
      },

      purpose: {
        en: "Supports treasury growth planning, liquidity preparation and maturity ladder development.",
        zh: "支持财资增长规划、流动性准备与到期梯队建设。",
        jp: "財務成長計画、流動性準備、満期ラダー構築を支援します。",
        bm: "Menyokong perancangan pertumbuhan treasury, persediaan liquidity dan pembangunan maturity ladder.",
      },

      usage: {
        en: "Use it to align treasury activities with long-term objectives.",
        zh: "用于使财资活动与长期目标保持一致。",
        jp: "財務活動を長期目標と整合させるために使用します。",
        bm: "Gunakan untuk menyelaraskan aktiviti treasury dengan objektif jangka panjang.",
      },
    },

    {
      id: "strategy-intelligence",

      title: {
        en: "Strategy Intelligence",
        zh: "策略智能",
        jp: "戦略インテリジェンス",
        bm: "Kecerdasan Strategi",
      },

      meaning: {
        en: "Treasury strategic reasoning layer.",
        zh: "财资战略推理层。",
        jp: "財務戦略推論層です。",
        bm: "Lapisan penaakulan strategi treasury.",
      },

      purpose: {
        en: "Connects intelligence insights with long-term treasury planning and preferred strategy selection.",
        zh: "连接智能洞察、长期财资规划与优先策略选择。",
        jp: "インテリジェンス洞察、長期財務計画、優先戦略の選択を接続します。",
        bm: "Menghubungkan insight kecerdasan dengan perancangan treasury jangka panjang dan pemilihan strategi pilihan.",
      },

      usage: {
        en: "Use it to understand why a treasury strategy is preferred over alternatives.",
        zh: "用于理解为何某项财资策略优于其他方案。",
        jp: "なぜその財務戦略が他の選択肢より優れているかを理解するために使用します。",
        bm: "Gunakan untuk memahami mengapa sesuatu strategi treasury dipilih berbanding alternatif lain.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Strategy Overview",
      "Strategy Alternatives",
      "Decision Matrix",
      "Optimization Engine",
      "Capital Allocation Engine",
      "Capital Planning Engine",
      "Strategy Intelligence",
    ],

    zh: [
      "策略总览",
      "策略方案",
      "决策矩阵",
      "优化引擎",
      "资本配置引擎",
      "资本规划引擎",
      "策略智能",
    ],

    jp: [
      "戦略概要",
      "戦略代替案",
      "意思決定マトリクス",
      "最適化エンジン",
      "資本配分エンジン",
      "資本計画エンジン",
      "戦略インテリジェンス",
    ],

    bm: [
      "Gambaran Strategi",
      "Alternatif Strategi",
      "Matriks Keputusan",
      "Enjin Pengoptimuman",
      "Enjin Peruntukan Modal",
      "Enjin Perancangan Modal",
      "Kecerdasan Strategi",
    ],
  },

  summary: {
    en: "Treasury Strategy Layer is the planning brain of Treasury OS. It transforms treasury intelligence into strategy overview, alternatives, decision matrices, optimization logic, capital allocation, capital planning and strategic reasoning. This layer helps the operator understand not only what Treasury OS sees, but how treasury capital should move next.",

    zh: "财资策略层是 Treasury OS 的规划大脑。它把财资智能转换成策略总览、策略方案、决策矩阵、优化逻辑、资本配置、资本规划与策略推理。这个层帮助操作员理解的不只是 Treasury OS 看见了什么，也理解财资资本下一步应该如何移动。",

    jp: "Treasury Strategy Layer は Treasury OS の計画中枢です。財務インテリジェンスを戦略概要、戦略代替案、意思決定マトリクス、最適化ロジック、資本配分、資本計画、戦略的推論へ変換します。この層は、Treasury OS が何を見ているかだけでなく、財務資本が次にどのように動くべきかを理解するために役立ちます。",

    bm: "Lapisan Strategi Treasury ialah pusat perancangan Treasury OS. Ia menukar kecerdasan treasury kepada gambaran strategi, alternatif strategi, matriks keputusan, logik pengoptimuman, peruntukan modal, perancangan modal dan penaakulan strategi. Lapisan ini membantu operator memahami bukan sahaja apa yang Treasury OS lihat, tetapi juga bagaimana modal treasury harus bergerak seterusnya.",
  },
};