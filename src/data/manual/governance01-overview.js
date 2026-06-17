export const governance01Overview = {
  id: "governance-01",

  title: {
    en: "Governance Overview",
    zh: "治理总览",
    jp: "ガバナンス概要",
    bm: "Gambaran Keseluruhan Governance",
  },

  description: {
    en: "Governance OS is the institutional coordination layer of Treasury OS. It explains how authority, consensus, approval and synchronization work together to protect treasury decisions.",
    zh: "Governance OS 是 Treasury OS 的机构级治理协调层。它解释权责、共识、审批与同步如何共同保护财资决策。",
    jp: "Governance OS は Treasury OS の機関向け調整レイヤーです。権限、合意、承認、同期がどのように連携して財務判断を保護するかを説明します。",
    bm: "Governance OS ialah lapisan koordinasi institusi dalam Treasury OS. Ia menerangkan bagaimana kuasa, konsensus, kelulusan dan penyelarasan melindungi keputusan treasury.",
  },

  sections: [
    {
      id: "governance-purpose",
      title: {
        en: "Purpose of Governance OS",
        zh: "Governance OS 的目的",
        jp: "Governance OS の目的",
        bm: "Tujuan Governance OS",
      },
      whatIs: {
        en: "Governance OS defines how treasury decisions are reviewed, coordinated, approved and stabilized across multiple authority layers.",
        zh: "Governance OS 定义财资决策如何在多层权责之间被审核、协调、批准与稳定化。",
        jp: "Governance OS は、財務判断が複数の権限レイヤーを通じてどのようにレビュー、調整、承認、安定化されるかを定義します。",
        bm: "Governance OS mentakrifkan bagaimana keputusan treasury disemak, diselaraskan, diluluskan dan distabilkan merentas pelbagai lapisan kuasa.",
      },
      whyItMatters: {
        en: "It prevents treasury actions from becoming isolated decisions by connecting operational signals with institutional authority.",
        zh: "它避免财资行动变成孤立决策，而是把操作信号连接到机构权责体系。",
        jp: "運用シグナルを機関の権限構造へ接続することで、財務行動が孤立した判断になることを防ぎます。",
        bm: "Ia mengelakkan tindakan treasury menjadi keputusan terpencil dengan menghubungkan isyarat operasi kepada kuasa institusi.",
      },
    },

    {
      id: "governance-responsibility",
      title: {
        en: "Governance Responsibility",
        zh: "治理责任",
        jp: "ガバナンス責任",
        bm: "Tanggungjawab Governance",
      },
      whatIs: {
        en: "The governance layer is responsible for authority clarity, consensus formation, escalation routing, decision alignment and runtime supervision.",
        zh: "治理层负责权责清晰、共识形成、升级路由、决策一致性与运行监督。",
        jp: "ガバナンスレイヤーは、権限の明確化、合意形成、エスカレーション経路、判断の整合性、実行時監督を担います。",
        bm: "Lapisan governance bertanggungjawab terhadap kejelasan kuasa, pembentukan konsensus, laluan eskalasi, penjajaran keputusan dan pemantauan runtime.",
      },
      whyItMatters: {
        en: "This ensures that treasury operations remain controlled, explainable and institutionally accountable.",
        zh: "这确保财资运作保持可控、可解释，并具备机构问责性。",
        jp: "これにより、財務運用は管理可能で説明可能かつ機関として責任ある状態を維持します。",
        bm: "Ini memastikan operasi treasury kekal terkawal, boleh dijelaskan dan mempunyai akauntabiliti institusi.",
      },
    },

    {
      id: "governance-position",
      title: {
        en: "Position Inside Treasury OS",
        zh: "在 Treasury OS 中的位置",
        jp: "Treasury OS 内での位置",
        bm: "Kedudukan Dalam Treasury OS",
      },
      whatIs: {
        en: "Governance OS sits above treasury signals and below executive decision authority. It translates operational conditions into coordinated institutional actions.",
        zh: "Governance OS 位于财资信号之上、执行决策权责之下。它把操作状态转化为协调后的机构行动。",
        jp: "Governance OS は財務シグナルの上位、経営判断権限の下位に位置し、運用状況を調整された機関行動へ変換します。",
        bm: "Governance OS berada di atas isyarat treasury dan di bawah kuasa keputusan eksekutif. Ia menukar keadaan operasi kepada tindakan institusi yang diselaraskan.",
      },
      whyItMatters: {
        en: "It creates the bridge between what the system observes and what the institution is allowed to do.",
        zh: "它建立系统观察结果与机构可执行行动之间的桥梁。",
        jp: "システムが観察する内容と、機関が実行できる行動の間に橋を作ります。",
        bm: "Ia mewujudkan jambatan antara apa yang diperhatikan oleh sistem dan tindakan yang dibenarkan oleh institusi.",
      },
    },

    {
      id: "governance-core-functions",
      title: {
        en: "Core Governance Functions",
        zh: "核心治理功能",
        jp: "主要ガバナンス機能",
        bm: "Fungsi Teras Governance",
      },
      whatIs: {
        en: "The core functions include authority coordination, consensus intelligence, conflict resolution, approval routing, synchronization monitoring and governance stability control.",
        zh: "核心功能包括权责协调、共识智能、冲突解决、审批路由、同步监控与治理稳定控制。",
        jp: "主要機能には、権限調整、合意インテリジェンス、衝突解決、承認ルーティング、同期監視、ガバナンス安定制御が含まれます。",
        bm: "Fungsi teras termasuk koordinasi kuasa, intelligence konsensus, penyelesaian konflik, laluan kelulusan, pemantauan penyelarasan dan kawalan kestabilan governance.",
      },
      whyItMatters: {
        en: "Together, these functions allow Governance OS to operate like a control layer for institutional treasury decision-making.",
        zh: "这些功能共同让 Governance OS 像机构财资决策的控制层一样运作。",
        jp: "これらの機能により、Governance OS は機関財務判断の制御レイヤーとして機能します。",
        bm: "Gabungan fungsi ini membolehkan Governance OS beroperasi sebagai lapisan kawalan untuk keputusan treasury institusi.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Treasury Signal",
      "Governance Review",
      "Authority Coordination",
      "Consensus Formation",
      "Approval Routing",
      "Decision Stabilization",
    ],
    zh: [
      "财资信号",
      "治理审核",
      "权责协调",
      "共识形成",
      "审批路由",
      "决策稳定化",
    ],
    jp: [
      "財務シグナル",
      "ガバナンスレビュー",
      "権限調整",
      "合意形成",
      "承認ルーティング",
      "判断安定化",
    ],
    bm: [
      "Isyarat Treasury",
      "Semakan Governance",
      "Koordinasi Kuasa",
      "Pembentukan Konsensus",
      "Laluan Kelulusan",
      "Penstabilan Keputusan",
    ],
  },

  summary: {
    en: "Governance OS provides the institutional control layer for Treasury OS. It ensures that decisions are not only intelligent, but also authorized, coordinated, explainable and stable.",
    zh: "Governance OS 为 Treasury OS 提供机构级控制层。它确保决策不只是智能化，也必须被授权、被协调、可解释并保持稳定。",
    jp: "Governance OS は Treasury OS に機関向け制御レイヤーを提供します。判断が高度であるだけでなく、承認され、調整され、説明可能で、安定していることを保証します。",
    bm: "Governance OS menyediakan lapisan kawalan institusi untuk Treasury OS. Ia memastikan keputusan bukan sahaja pintar, tetapi juga diberi kuasa, diselaraskan, boleh dijelaskan dan stabil.",
  },
};