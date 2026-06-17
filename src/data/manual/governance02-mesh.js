export const governance02Mesh = {
  id: "governance-02",

  title: {
    en: "Governance Mesh",
    zh: "治理网格",
    jp: "ガバナンスメッシュ",
    bm: "Mesh Governance",
  },

  description: {
    en: "Governance Mesh explains how multiple authority nodes coordinate treasury decisions through consensus, routing, conflict resolution and synchronized governance control.",
    zh: "Governance Mesh 解释多个权责节点如何通过共识、路由、冲突解决与同步治理控制来协调财资决策。",
    jp: "Governance Mesh は、複数の権限ノードが合意、ルーティング、衝突解決、同期されたガバナンス制御を通じて財務判断を調整する仕組みを説明します。",
    bm: "Governance Mesh menerangkan bagaimana pelbagai nod kuasa menyelaraskan keputusan treasury melalui konsensus, laluan, penyelesaian konflik dan kawalan governance yang diselaraskan.",
  },

  sections: [
    {
      id: "mesh-architecture",
      title: {
        en: "Mesh Architecture",
        zh: "网格架构",
        jp: "メッシュ構造",
        bm: "Seni Bina Mesh",
      },
      whatIs: {
        en: "The mesh replaces a single linear authority chain with a distributed structure where Treasury Board, Risk Authority and Executive Committee can coordinate in parallel.",
        zh: "治理网格把单一直线式权责链，升级为 Treasury Board、Risk Authority 与 Executive Committee 可并行协作的分布式结构。",
        jp: "メッシュは単一の直線的な権限チェーンを、Treasury Board、Risk Authority、Executive Committee が並行して調整できる分散構造へ置き換えます。",
        bm: "Mesh menggantikan rantaian kuasa linear tunggal dengan struktur teragih di mana Treasury Board, Risk Authority dan Executive Committee boleh menyelaras secara selari.",
      },
      whyItMatters: {
        en: "This allows governance decisions to be faster, more resilient and less dependent on one approval path.",
        zh: "这让治理决策更快、更有韧性，并减少对单一审批路径的依赖。",
        jp: "これにより、ガバナンス判断はより迅速で、より回復力が高く、単一の承認経路への依存が少なくなります。",
        bm: "Ini membolehkan keputusan governance menjadi lebih pantas, lebih berdaya tahan dan kurang bergantung kepada satu laluan kelulusan sahaja.",
      },
    },

    {
      id: "mesh-authority-nodes",
      title: {
        en: "Authority Nodes",
        zh: "权责节点",
        jp: "権限ノード",
        bm: "Nod Kuasa",
      },
      whatIs: {
        en: "Each node represents a governance role. Treasury Board oversees treasury direction, Risk Authority reviews exposure and control risk, while Executive Committee provides higher-level clearance.",
        zh: "每个节点代表一个治理角色。Treasury Board 负责财资方向，Risk Authority 审核风险暴露与控制风险，Executive Committee 提供更高层级批准。",
        jp: "各ノードはガバナンス上の役割を表します。Treasury Board は財務方針を監督し、Risk Authority はエクスポージャーと統制リスクを確認し、Executive Committee は上位承認を提供します。",
        bm: "Setiap nod mewakili peranan governance. Treasury Board memantau arah treasury, Risk Authority menyemak pendedahan dan risiko kawalan, manakala Executive Committee memberikan pelepasan peringkat lebih tinggi.",
      },
      whyItMatters: {
        en: "Clear node responsibility prevents decision confusion and makes escalation ownership visible.",
        zh: "清晰的节点责任可以避免决策混乱，并让升级责任变得可见。",
        jp: "明確なノード責任により、判断の混乱を防ぎ、エスカレーションの責任所在を可視化します。",
        bm: "Tanggungjawab nod yang jelas mengelakkan kekeliruan keputusan dan menjadikan pemilikan eskalasi lebih kelihatan.",
      },
    },

    {
      id: "mesh-consensus",
      title: {
        en: "Consensus Intelligence",
        zh: "共识智能",
        jp: "合意インテリジェンス",
        bm: "Intelligence Konsensus",
      },
      whatIs: {
        en: "Consensus Intelligence measures whether authority nodes are aligned, partially aligned or in conflict before a treasury decision proceeds.",
        zh: "共识智能衡量权责节点在财资决策推进前，是否一致、部分一致或存在冲突。",
        jp: "合意インテリジェンスは、財務判断が進む前に、権限ノードが一致しているか、部分的に一致しているか、または衝突しているかを測定します。",
        bm: "Intelligence Konsensus mengukur sama ada nod kuasa sejajar, separa sejajar atau bercanggah sebelum keputusan treasury diteruskan.",
      },
      whyItMatters: {
        en: "It prevents execution from moving ahead when governance alignment is weak or unresolved.",
        zh: "当治理一致性不足或尚未解决时，它可以阻止执行继续推进。",
        jp: "ガバナンス整合性が弱い、または未解決の場合に、実行が先に進むことを防ぎます。",
        bm: "Ia menghalang pelaksanaan daripada diteruskan apabila penjajaran governance lemah atau belum diselesaikan.",
      },
    },

    {
      id: "mesh-conflict-resolution",
      title: {
        en: "Conflict Resolution",
        zh: "冲突解决",
        jp: "衝突解決",
        bm: "Penyelesaian Konflik",
      },
      whatIs: {
        en: "When authority nodes disagree, the mesh routes the issue into review, arbitration or synchronization actions instead of allowing silent governance failure.",
        zh: "当权责节点意见不一致时，治理网格会把问题导入审核、仲裁或同步动作，而不是让治理静默失效。",
        jp: "権限ノードが一致しない場合、メッシュは問題をレビュー、仲裁、同期アクションへルーティングし、静かなガバナンス失敗を防ぎます。",
        bm: "Apabila nod kuasa tidak sependapat, mesh mengarahkan isu kepada semakan, timbang tara atau tindakan penyelarasan dan bukannya membiarkan kegagalan governance berlaku secara senyap.",
      },
      whyItMatters: {
        en: "Conflict handling keeps treasury decisions explainable, auditable and institutionally controlled.",
        zh: "冲突处理让财资决策保持可解释、可审计，并处于机构控制之下。",
        jp: "衝突処理により、財務判断は説明可能で監査可能、かつ機関として管理された状態を維持します。",
        bm: "Pengendalian konflik memastikan keputusan treasury boleh dijelaskan, boleh diaudit dan dikawal secara institusi.",
      },
    },

    {
      id: "mesh-distributed-control",
      title: {
        en: "Distributed Governance Control",
        zh: "分布式治理控制",
        jp: "分散型ガバナンス制御",
        bm: "Kawalan Governance Teragih",
      },
      whatIs: {
        en: "Distributed control allows the governance layer to continue operating even when one authority route is delayed, overloaded or pending.",
        zh: "分布式控制让治理层即使在某个权责路径延迟、过载或待处理时，仍可继续运作。",
        jp: "分散制御により、ある権限経路が遅延、過負荷、または保留中でも、ガバナンスレイヤーは継続して機能できます。",
        bm: "Kawalan teragih membolehkan lapisan governance terus beroperasi walaupun satu laluan kuasa mengalami kelewatan, beban berlebihan atau status menunggu.",
      },
      whyItMatters: {
        en: "This improves governance resilience and supports parallel approval routing.",
        zh: "这提升治理韧性，并支持并行审批路由。",
        jp: "これによりガバナンスの回復力が向上し、並列承認ルーティングを支援します。",
        bm: "Ini meningkatkan daya tahan governance dan menyokong laluan kelulusan selari.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Signal Detected",
      "Authority Nodes Activated",
      "Consensus Checked",
      "Conflict Reviewed",
      "Routing Applied",
      "Governance Mesh Stabilized",
    ],
    zh: [
      "信号被侦测",
      "权责节点启动",
      "共识检查",
      "冲突审核",
      "路由执行",
      "治理网格稳定化",
    ],
    jp: [
      "シグナル検知",
      "権限ノード起動",
      "合意確認",
      "衝突レビュー",
      "ルーティング適用",
      "ガバナンスメッシュ安定化",
    ],
    bm: [
      "Isyarat Dikesan",
      "Nod Kuasa Diaktifkan",
      "Konsensus Disemak",
      "Konflik Disemak",
      "Laluan Digunakan",
      "Governance Mesh Distabilkan",
    ],
  },

  summary: {
    en: "Governance Mesh is the foundation of Governance OS. It transforms treasury governance from a single authority chain into a coordinated multi-node operating structure.",
    zh: "Governance Mesh 是 Governance OS 的基础。它把财资治理从单一路径权责链，升级为多节点协调运行结构。",
    jp: "Governance Mesh は Governance OS の基盤です。財務ガバナンスを単一の権限チェーンから、複数ノードが連携する運用構造へ変換します。",
    bm: "Governance Mesh ialah asas Governance OS. Ia menukar governance treasury daripada rantaian kuasa tunggal kepada struktur operasi pelbagai nod yang diselaraskan.",
  },
};