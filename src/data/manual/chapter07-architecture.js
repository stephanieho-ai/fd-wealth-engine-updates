export const chapter07Architecture = {
  id: "chapter-07",

  title: {
    en: "Treasury OS Architecture",
    zh: "财资操作系统架构",
    jp: "Treasury OS アーキテクチャ",
    bm: "Seni Bina Treasury OS",
  },

  description: {
    en: "Complete Treasury Operating System architecture explaining how Dashboard, Treasury Operations, Governance, Intelligence, Strategy, Runtime and Autonomous layers work together.",
    zh: "完整 Treasury OS 架构，解释仪表板、财资操作、治理、智能、策略、运行与自主层如何协同运作。",
    jp: "Dashboard、Treasury Operations、Governance、Intelligence、Strategy、Runtime、Autonomous の各層がどのように連携するかを説明する完全な Treasury OS アーキテクチャです。",
    bm: "Seni bina lengkap Treasury OS yang menerangkan bagaimana Dashboard, Operasi Treasury, Governance, Intelligence, Strategy, Runtime dan Autonomous layers bekerjasama.",
  },

  learningGoal: {
    en: "Understand how every Treasury OS layer connects together to form a complete institutional treasury operating environment.",
    zh: "理解每一个 Treasury OS 层如何连接在一起，形成完整的机构级财资操作环境。",
    jp: "すべての Treasury OS 層がどのように接続され、完全な機関レベルの財務運用環境を形成するかを理解します。",
    bm: "Memahami bagaimana setiap lapisan Treasury OS saling berhubung untuk membentuk persekitaran operasi treasury institusi yang lengkap.",
  },

  sections: [
    {
      id: "dashboard-layer",

      title: {
        en: "Dashboard Layer",
        zh: "仪表板层",
        jp: "ダッシュボード層",
        bm: "Lapisan Papan Pemuka",
      },

      meaning: {
        en: "Treasury visibility foundation.",
        zh: "财资可视化基础层。",
        jp: "財務可視化の基盤層です。",
        bm: "Asas keterlihatan treasury.",
      },

      purpose: {
        en: "Provides portfolio awareness, liquidity visibility, risk monitoring and policy safety awareness.",
        zh: "提供投资组合认知、流动性可视化、风险监控与政策安全感知。",
        jp: "ポートフォリオ認識、流動性可視化、リスク監視、ポリシー安全認識を提供します。",
        bm: "Memberi kesedaran portfolio, keterlihatan liquidity, pemantauan risiko dan kesedaran keselamatan policy.",
      },

      usage: {
        en: "Use it as the first view before entering deeper treasury operations.",
        zh: "进入更深层财资操作前，先从这一层查看整体状态。",
        jp: "より深い財務運用に入る前の最初の確認画面として使用します。",
        bm: "Gunakan sebagai paparan pertama sebelum masuk ke operasi treasury yang lebih mendalam.",
      },
    },

    {
      id: "operations-layer",

      title: {
        en: "Treasury Operations Layer",
        zh: "财资操作层",
        jp: "財務運用層",
        bm: "Lapisan Operasi Treasury",
      },

      meaning: {
        en: "Treasury Control Tower and operator workflow layer.",
        zh: "财资控制塔与操作员工作流层。",
        jp: "財務コントロールタワーとオペレーターワークフロー層です。",
        bm: "Lapisan Menara Kawalan Treasury dan workflow operator.",
      },

      purpose: {
        en: "Transforms monitoring into recommendations, decisions and controlled treasury actions.",
        zh: "把监控结果转换成建议、决策与受控财资行动。",
        jp: "監視結果を推奨、意思決定、制御された財務アクションへ変換します。",
        bm: "Menukar pemantauan kepada cadangan, keputusan dan tindakan treasury terkawal.",
      },

      usage: {
        en: "Use it when treasury visibility must become an action, review or escalation.",
        zh: "当财资可视化需要变成行动、复核或升级时使用。",
        jp: "財務可視性をアクション、確認、エスカレーションへ変える必要がある場合に使用します。",
        bm: "Gunakan apabila keterlihatan treasury perlu menjadi tindakan, semakan atau escalation.",
      },
    },

    {
      id: "governance-layer",

      title: {
        en: "Governance Layer",
        zh: "治理层",
        jp: "ガバナンス層",
        bm: "Lapisan Governance",
      },

      meaning: {
        en: "Institutional authority and control framework.",
        zh: "机构级权限与控制框架。",
        jp: "機関レベルの権限と統制フレームワークです。",
        bm: "Rangka kerja autoriti dan kawalan institusi.",
      },

      purpose: {
        en: "Ensures treasury actions remain safe, reviewable, controlled and aligned with governance rules.",
        zh: "确保财资行动保持安全、可复核、受控，并符合治理规则。",
        jp: "財務アクションが安全で、確認可能で、制御され、ガバナンスルールに沿っていることを保証します。",
        bm: "Memastikan tindakan treasury kekal selamat, boleh disemak, terkawal dan sejajar dengan peraturan governance.",
      },

      usage: {
        en: "Use it when authority, approval, restriction or escalation must be managed.",
        zh: "当需要管理权限、批准、限制或升级时使用。",
        jp: "権限、承認、制限、エスカレーションを管理する必要がある場合に使用します。",
        bm: "Gunakan apabila autoriti, kelulusan, sekatan atau escalation perlu diuruskan.",
      },
    },

    {
      id: "intelligence-layer",

      title: {
        en: "Intelligence Layer",
        zh: "智能层",
        jp: "インテリジェンス層",
        bm: "Lapisan Kecerdasan",
      },

      meaning: {
        en: "Analytical brain of Treasury OS.",
        zh: "Treasury OS 的分析大脑。",
        jp: "Treasury OS の分析脳です。",
        bm: "Otak analitik Treasury OS.",
      },

      purpose: {
        en: "Converts treasury data into signals, assessments, recommendations, decisions, predictions and future state awareness.",
        zh: "把财资数据转换成信号、评估、建议、决策、预测与未来状态感知。",
        jp: "財務データをシグナル、評価、推奨、意思決定、予測、将来状態の認識へ変換します。",
        bm: "Menukar data treasury kepada isyarat, penilaian, cadangan, keputusan, ramalan dan kesedaran keadaan masa depan.",
      },

      usage: {
        en: "Use it to understand what treasury conditions mean before choosing an action.",
        zh: "在选择行动前，使用它理解财资状态代表什么。",
        jp: "アクションを選択する前に、財務状況の意味を理解するために使用します。",
        bm: "Gunakan untuk memahami maksud keadaan treasury sebelum memilih tindakan.",
      },
    },

    {
      id: "strategy-layer",

      title: {
        en: "Strategy Layer",
        zh: "策略层",
        jp: "戦略層",
        bm: "Lapisan Strategi",
      },

      meaning: {
        en: "Treasury planning and capital allocation layer.",
        zh: "财资规划与资本配置层。",
        jp: "財務計画と資本配分の層です。",
        bm: "Lapisan perancangan treasury dan peruntukan modal.",
      },

      purpose: {
        en: "Determines how treasury capital should move, be allocated and be planned for the future.",
        zh: "决定财资资本应如何移动、配置并规划未来。",
        jp: "財務資本をどのように動かし、配分し、将来に向けて計画するかを決定します。",
        bm: "Menentukan bagaimana modal treasury harus bergerak, diagihkan dan dirancang untuk masa depan.",
      },

      usage: {
        en: "Use it when converting intelligence into portfolio direction and capital planning.",
        zh: "当需要把智能结果转换成投资组合方向与资本规划时使用。",
        jp: "インテリジェンスをポートフォリオ方向と資本計画へ変換する際に使用します。",
        bm: "Gunakan apabila menukar kecerdasan kepada hala tuju portfolio dan perancangan modal.",
      },
    },

    {
      id: "runtime-layer",

      title: {
        en: "Runtime Layer",
        zh: "运行层",
        jp: "ランタイム層",
        bm: "Lapisan Runtime",
      },

      meaning: {
        en: "Treasury OS self-monitoring and stability layer.",
        zh: "Treasury OS 自我监控与稳定性层。",
        jp: "Treasury OS の自己監視と安定性の層です。",
        bm: "Lapisan pemantauan kendiri dan kestabilan Treasury OS.",
      },

      purpose: {
        en: "Monitors runtime health, detects alerts, coordinates response, supports recovery and validates stability.",
        zh: "监控运行健康、侦测警报、协调响应、支持恢复并验证稳定性。",
        jp: "ランタイム健全性を監視し、アラートを検出し、対応を調整し、回復を支援し、安定性を検証します。",
        bm: "Memantau kesihatan runtime, mengesan amaran, menyelaraskan respons, menyokong recovery dan mengesahkan kestabilan.",
      },

      usage: {
        en: "Use it to confirm that Treasury OS remains operational, stable and recoverable.",
        zh: "使用它确认 Treasury OS 保持可运行、稳定且可恢复。",
        jp: "Treasury OS が稼働中で安定し、回復可能であることを確認するために使用します。",
        bm: "Gunakan untuk mengesahkan Treasury OS kekal beroperasi, stabil dan boleh dipulihkan.",
      },
    },

    {
      id: "autonomous-layer",

      title: {
        en: "Autonomous Layer",
        zh: "自主层",
        jp: "自律層",
        bm: "Lapisan Autonomi",
      },

      meaning: {
        en: "AI-assisted treasury supervision layer.",
        zh: "AI 辅助财资监督层。",
        jp: "AI 支援型財務監督層です。",
        bm: "Lapisan penyeliaan treasury berbantukan AI.",
      },

      purpose: {
        en: "Adds AI observation, reasoning, recommendation and decision support while preserving human governance authority.",
        zh: "加入 AI 观察、推理、建议与决策支持，同时保留人工治理权限。",
        jp: "人間のガバナンス権限を維持しながら、AI 観察、推論、推奨、意思決定支援を追加します。",
        bm: "Menambah pemerhatian AI, penaakulan, cadangan dan sokongan keputusan sambil mengekalkan autoriti governance manusia.",
      },

      usage: {
        en: "Use it as intelligent assistance, not as automatic decision authority.",
        zh: "把它作为智能辅助，而不是自动决策权限。",
        jp: "自動的な意思決定権限ではなく、インテリジェントな支援として使用します。",
        bm: "Gunakan sebagai bantuan pintar, bukan sebagai autoriti keputusan automatik.",
      },
    },

    {
      id: "treasury-os-layer",

      title: {
        en: "Treasury Operating System",
        zh: "财资操作系统",
        jp: "財務オペレーティングシステム",
        bm: "Sistem Operasi Treasury",
      },

      meaning: {
        en: "Integrated institutional treasury operating environment.",
        zh: "整合式机构级财资操作环境。",
        jp: "統合された機関レベルの財務運用環境です。",
        bm: "Persekitaran operasi treasury institusi yang bersepadu.",
      },

      purpose: {
        en: "Combines visibility, operations, governance, intelligence, strategy, runtime and autonomous supervision into one system.",
        zh: "把可视化、操作、治理、智能、策略、运行与自主监督整合成一个系统。",
        jp: "可視化、運用、ガバナンス、インテリジェンス、戦略、ランタイム、自律監督を一つのシステムへ統合します。",
        bm: "Menggabungkan visibility, operasi, governance, intelligence, strategy, runtime dan autonomous supervision ke dalam satu sistem.",
      },

      usage: {
        en: "Use it as the full operating model for institutional treasury decision support.",
        zh: "把它作为机构级财资决策支持的完整操作模型。",
        jp: "機関レベルの財務意思決定支援の完全な運用モデルとして使用します。",
        bm: "Gunakan sebagai model operasi penuh untuk sokongan keputusan treasury institusi.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Dashboard",
      "Treasury Operations",
      "Governance",
      "Intelligence",
      "Strategy",
      "Runtime",
      "Autonomous",
      "Treasury OS",
    ],

    zh: [
      "仪表板",
      "财资操作",
      "治理",
      "智能",
      "策略",
      "运行",
      "自主",
      "财资操作系统",
    ],

    jp: [
      "ダッシュボード",
      "財務運用",
      "ガバナンス",
      "インテリジェンス",
      "戦略",
      "ランタイム",
      "自律",
      "Treasury OS",
    ],

    bm: [
      "Papan Pemuka",
      "Operasi Treasury",
      "Governance",
      "Intelligence",
      "Strategy",
      "Runtime",
      "Autonomous",
      "Treasury OS",
    ],
  },

  summary: {
    en: "Treasury OS is an institutional treasury operating environment. Dashboard provides visibility. Treasury Operations coordinates action. Governance provides authority and control. Intelligence generates understanding. Strategy determines direction. Runtime monitors operating health. Autonomous adds AI-assisted supervision. Together, these layers form Treasury OS V1.",

    zh: "Treasury OS 是机构级财资操作环境。仪表板提供可视化，财资操作协调行动，治理提供权限与控制，智能产生理解，策略决定方向，运行监控操作健康，自主层加入 AI 辅助监督。这些层共同组成 Treasury OS V1。",

    jp: "Treasury OS は機関レベルの財務運用環境です。Dashboard は可視化を提供し、Treasury Operations はアクションを調整し、Governance は権限と統制を提供し、Intelligence は理解を生み出し、Strategy は方向性を決定し、Runtime は運用健全性を監視し、Autonomous は AI 支援型監督を追加します。これらの層が一体となって Treasury OS V1 を形成します。",

    bm: "Treasury OS ialah persekitaran operasi treasury institusi. Dashboard memberi visibility. Operasi Treasury menyelaraskan tindakan. Governance memberi autoriti dan kawalan. Intelligence menghasilkan pemahaman. Strategy menentukan hala tuju. Runtime memantau kesihatan operasi. Autonomous menambah penyeliaan berbantukan AI. Semua lapisan ini membentuk Treasury OS V1.",
  },
};