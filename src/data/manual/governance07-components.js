export const governance07Components = {
  id: "governance-07",

  title: {
    en: "Governance Console Components",
    zh: "治理控制台组件",
    jp: "ガバナンスコンソール構成",
    bm: "Komponen Konsol Governance",
  },

  description: {
    en: "Governance Console Components explain the main modules inside the Governance page and how each module supports authority coordination and institutional control.",
    zh: "Governance Console Components 解释 Governance 页面中的主要模块，以及每个模块如何支持权责协调与机构控制。",
    jp: "Governance Console Components は、Governance ページ内の主要モジュールと、それぞれが権限調整と機関統制をどのように支援するかを説明します。",
    bm: "Governance Console Components menerangkan modul utama dalam halaman Governance dan bagaimana setiap modul menyokong koordinasi kuasa serta kawalan institusi.",
  },

  sections: [
    {
      id: "component-governance-mesh",
      title: {
        en: "Governance Mesh",
        zh: "治理网格",
        jp: "ガバナンスメッシュ",
        bm: "Governance Mesh",
      },
      whatIs: {
        en: "Displays the core governance nodes and their coordination status across the governance network.",
        zh: "显示核心治理节点以及它们在治理网络中的协调状态。",
        jp: "主要なガバナンスノードとネットワーク全体の調整状態を表示します。",
        bm: "Memaparkan nod governance utama dan status koordinasi merentas rangkaian governance.",
      },
      whyItMatters: {
        en: "It gives operators a clear view of who is involved in governance decisions.",
        zh: "它让操作员清楚看到哪些权责方参与治理决策。",
        jp: "どの権限者がガバナンス判断に関与しているかを明確に示します。",
        bm: "Ia memberi operator pandangan jelas tentang siapa yang terlibat dalam keputusan governance.",
      },
    },

    {
      id: "component-consensus-engine",
      title: {
        en: "Consensus Engine",
        zh: "共识引擎",
        jp: "合意エンジン",
        bm: "Enjin Konsensus",
      },
      whatIs: {
        en: "Measures alignment between authority nodes before a decision proceeds.",
        zh: "在决策推进前衡量权责节点之间的一致性。",
        jp: "判断が進む前に権限ノード間の整合性を測定します。",
        bm: "Mengukur penjajaran antara nod kuasa sebelum keputusan diteruskan.",
      },
      whyItMatters: {
        en: "It prevents execution when governance agreement is weak or unresolved.",
        zh: "当治理共识不足或未解决时，它防止执行继续推进。",
        jp: "ガバナンス合意が弱い、または未解決の場合に実行を防ぎます。",
        bm: "Ia menghalang pelaksanaan apabila persetujuan governance lemah atau belum diselesaikan.",
      },
    },

    {
      id: "component-conflict-resolution",
      title: {
        en: "Conflict Resolution",
        zh: "冲突解决",
        jp: "衝突解決",
        bm: "Penyelesaian Konflik",
      },
      whatIs: {
        en: "Routes governance disagreement into review, arbitration or synchronization actions.",
        zh: "把治理分歧路由到审核、仲裁或同步动作。",
        jp: "ガバナンス上の不一致をレビュー、仲裁、同期アクションへ導きます。",
        bm: "Mengarahkan percanggahan governance kepada semakan, timbang tara atau tindakan penyelarasan.",
      },
      whyItMatters: {
        en: "It keeps decision disputes visible, traceable and controlled.",
        zh: "它让决策争议保持可见、可追踪并受控。",
        jp: "判断の争いを可視化し、追跡可能で管理された状態に保ちます。",
        bm: "Ia memastikan pertikaian keputusan kekal kelihatan, boleh dijejak dan terkawal.",
      },
    },

    {
      id: "component-latency",
      title: {
        en: "Governance Latency Intelligence",
        zh: "治理延迟智能",
        jp: "ガバナンス遅延インテリジェンス",
        bm: "Intelligence Latensi Governance",
      },
      whatIs: {
        en: "Monitors signal delay, node response timing and governance routing latency.",
        zh: "监控信号延迟、节点响应时间与治理路由延迟。",
        jp: "シグナル遅延、ノード応答時間、ガバナンスルーティング遅延を監視します。",
        bm: "Memantau kelewatan isyarat, masa tindak balas nod dan latensi laluan governance.",
      },
      whyItMatters: {
        en: "Latency visibility helps prevent slow governance from becoming operational risk.",
        zh: "延迟可视化有助于防止治理缓慢演变成操作风险。",
        jp: "遅延の可視化は、遅いガバナンスが運用リスクになるのを防ぎます。",
        bm: "Keterlihatan latensi membantu mengelakkan governance yang perlahan menjadi risiko operasi.",
      },
    },

    {
      id: "component-load-balancing",
      title: {
        en: "Authority Load Balancing",
        zh: "权责负载均衡",
        jp: "権限負荷分散",
        bm: "Pengimbangan Beban Kuasa",
      },
      whatIs: {
        en: "Measures governance load across authority nodes and helps distribute review or approval pressure.",
        zh: "衡量各权责节点的治理负载，并帮助分散审核或审批压力。",
        jp: "各権限ノードのガバナンス負荷を測定し、レビューや承認の圧力を分散します。",
        bm: "Mengukur beban governance merentas nod kuasa dan membantu mengagihkan tekanan semakan atau kelulusan.",
      },
      whyItMatters: {
        en: "It protects the governance network from overload and approval bottlenecks.",
        zh: "它保护治理网络免于过载与审批瓶颈。",
        jp: "ガバナンスネットワークを過負荷と承認ボトルネックから保護します。",
        bm: "Ia melindungi rangkaian governance daripada beban berlebihan dan kesesakan kelulusan.",
      },
    },

    {
      id: "component-routing",
      title: {
        en: "Parallel Approval Routing",
        zh: "并行审批路由",
        jp: "並列承認ルーティング",
        bm: "Laluan Kelulusan Selari",
      },
      whatIs: {
        en: "Routes decisions across multiple approval paths when governance activity requires parallel coordination.",
        zh: "当治理活动需要并行协调时，把决策路由到多个审批路径。",
        jp: "ガバナンス活動に並列調整が必要な場合、判断を複数の承認経路へルーティングします。",
        bm: "Mengarahkan keputusan merentas beberapa laluan kelulusan apabila aktiviti governance memerlukan koordinasi selari.",
      },
      whyItMatters: {
        en: "It improves decision throughput and reduces dependency on a single authority path.",
        zh: "它提高决策吞吐量，并减少对单一权责路径的依赖。",
        jp: "判断処理量を向上させ、単一の権限経路への依存を減らします。",
        bm: "Ia meningkatkan aliran keputusan dan mengurangkan kebergantungan kepada satu laluan kuasa.",
      },
    },

    {
      id: "component-decision-matrix",
      title: {
        en: "Governance Decision Matrix",
        zh: "治理决策矩阵",
        jp: "ガバナンス判断マトリックス",
        bm: "Matriks Keputusan Governance",
      },
      whatIs: {
        en: "Summarizes authority decisions, confidence, routing status and governance readiness.",
        zh: "总结权责决策、信心度、路由状态与治理准备度。",
        jp: "権限判断、信頼度、ルーティング状態、ガバナンス準備状況を要約します。",
        bm: "Meringkaskan keputusan kuasa, tahap keyakinan, status laluan dan kesiapsiagaan governance.",
      },
      whyItMatters: {
        en: "It gives operators one consolidated view of governance decision status.",
        zh: "它为操作员提供一个整合后的治理决策状态视图。",
        jp: "オペレーターへガバナンス判断状態の統合ビューを提供します。",
        bm: "Ia memberikan operator satu paparan bersepadu bagi status keputusan governance.",
      },
    },

    {
      id: "component-intervention",
      title: {
        en: "Governance Intervention Engine",
        zh: "治理干预引擎",
        jp: "ガバナンス介入エンジン",
        bm: "Enjin Intervensi Governance",
      },
      whatIs: {
        en: "Identifies governance situations that may require operator intervention, escalation or stabilization action.",
        zh: "识别可能需要操作员干预、升级或稳定化动作的治理情况。",
        jp: "オペレーター介入、エスカレーション、安定化アクションが必要なガバナンス状況を識別します。",
        bm: "Mengenal pasti situasi governance yang mungkin memerlukan intervensi operator, eskalasi atau tindakan penstabilan.",
      },
      whyItMatters: {
        en: "It helps protect the governance system before instability affects treasury execution.",
        zh: "它在不稳定影响财资执行前，帮助保护治理系统。",
        jp: "不安定性が財務実行に影響する前に、ガバナンスシステムを保護します。",
        bm: "Ia membantu melindungi sistem governance sebelum ketidakstabilan menjejaskan pelaksanaan treasury.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Mesh View",
      "Consensus Check",
      "Conflict Review",
      "Latency Monitor",
      "Load Balancing",
      "Routing Matrix",
      "Intervention Control",
    ],
    zh: [
      "网格视图",
      "共识检查",
      "冲突审核",
      "延迟监控",
      "负载均衡",
      "路由矩阵",
      "干预控制",
    ],
    jp: [
      "メッシュビュー",
      "合意確認",
      "衝突レビュー",
      "遅延監視",
      "負荷分散",
      "ルーティングマトリックス",
      "介入制御",
    ],
    bm: [
      "Paparan Mesh",
      "Semakan Konsensus",
      "Semakan Konflik",
      "Pemantauan Latensi",
      "Pengimbangan Beban",
      "Matriks Laluan",
      "Kawalan Intervensi",
    ],
  },

  summary: {
    en: "Governance Console Components provide the operational interface for Governance OS. They allow users to observe authority nodes, consensus, latency, routing, conflict and intervention status in one console.",
    zh: "Governance Console Components 为 Governance OS 提供操作界面。用户可以在一个控制台中观察权责节点、共识、延迟、路由、冲突与干预状态。",
    jp: "Governance Console Components は Governance OS の運用インターフェースです。ユーザーは1つのコンソールで権限ノード、合意、遅延、ルーティング、衝突、介入状態を確認できます。",
    bm: "Governance Console Components menyediakan antara muka operasi untuk Governance OS. Pengguna boleh melihat nod kuasa, konsensus, latensi, laluan, konflik dan status intervensi dalam satu konsol.",
  },
};