export const governance05Synchronization = {
  id: "governance-05",

  title: {
    en: "Synchronization Layer",
    zh: "同步层",
    jp: "同期レイヤー",
    bm: "Lapisan Penyelarasan",
  },

  description: {
    en: "The Synchronization Layer ensures governance nodes maintain a consistent operational view across the entire Governance OS.",
    zh: "Synchronization Layer 确保所有治理节点在整个 Governance OS 中保持一致的运行视图。",
    jp: "Synchronization Layer は、すべてのガバナンスノードが Governance OS 全体で一貫した運用状態を維持することを保証します。",
    bm: "Synchronization Layer memastikan semua nod governance mengekalkan pandangan operasi yang konsisten di seluruh Governance OS.",
  },

  sections: [
    {
      id: "sync-signal-alignment",
      title: {
        en: "Signal Alignment",
        zh: "信号对齐",
        jp: "シグナル整合",
        bm: "Penjajaran Isyarat",
      },
      whatIs: {
        en: "Signal Alignment ensures governance participants observe the same treasury conditions and operational signals.",
        zh: "信号对齐确保所有治理参与者观察到相同的财资状态与运行信号。",
        jp: "Signal Alignment は、すべてのガバナンス参加者が同じ財務状況と運用シグナルを観測することを保証します。",
        bm: "Signal Alignment memastikan semua peserta governance melihat keadaan treasury dan isyarat operasi yang sama.",
      },
      whyItMatters: {
        en: "Without alignment, governance decisions may be based on inconsistent information.",
        zh: "缺乏对齐时，治理决策可能建立在不一致的信息之上。",
        jp: "整合がなければ、ガバナンス判断は不一致な情報に基づく可能性があります。",
        bm: "Tanpa penjajaran, keputusan governance mungkin dibuat berdasarkan maklumat yang tidak konsisten.",
      },
    },

    {
      id: "sync-authority-coordination",
      title: {
        en: "Authority Coordination",
        zh: "权责协调",
        jp: "権限調整",
        bm: "Koordinasi Kuasa",
      },
      whatIs: {
        en: "Authority Coordination synchronizes activities between governance nodes during approval, escalation and review processes.",
        zh: "权责协调在审批、升级与审核过程中同步各治理节点的活动。",
        jp: "Authority Coordination は、承認・エスカレーション・レビュー過程において各ガバナンスノードを同期させます。",
        bm: "Authority Coordination menyelaraskan aktiviti antara nod governance semasa proses kelulusan, eskalasi dan semakan.",
      },
      whyItMatters: {
        en: "Strong coordination reduces friction and prevents duplicated governance effort.",
        zh: "良好的协调减少摩擦并避免重复治理工作。",
        jp: "強力な調整は摩擦を減らし、重複したガバナンス作業を防ぎます。",
        bm: "Koordinasi yang kukuh mengurangkan geseran dan mengelakkan usaha governance yang berulang.",
      },
    },

    {
      id: "sync-decision-consistency",
      title: {
        en: "Decision Consistency",
        zh: "决策一致性",
        jp: "意思決定整合性",
        bm: "Konsistensi Keputusan",
      },
      whatIs: {
        en: "Decision Consistency verifies that governance outcomes remain aligned across all authority layers.",
        zh: "决策一致性验证治理结果在所有权责层之间保持一致。",
        jp: "Decision Consistency は、ガバナンス结果がすべての権限レイヤー間で整合していることを確認します。",
        bm: "Decision Consistency memastikan hasil governance kekal sejajar di semua lapisan kuasa.",
      },
      whyItMatters: {
        en: "Consistent decisions improve trust, accountability and execution confidence.",
        zh: "一致决策能够提高信任、问责与执行信心。",
        jp: "一貫した判断は信頼性、説明責任、実行信頼度を向上させます。",
        bm: "Keputusan yang konsisten meningkatkan kepercayaan, akauntabiliti dan keyakinan pelaksanaan.",
      },
    },

    {
      id: "sync-runtime",
      title: {
        en: "Runtime Synchronization",
        zh: "运行同步",
        jp: "ランタイム同期",
        bm: "Penyelarasan Runtime",
      },
      whatIs: {
        en: "Runtime Synchronization continuously monitors governance status changes and propagates updates across the governance network.",
        zh: "运行同步持续监控治理状态变化，并将更新传播到整个治理网络。",
        jp: "Runtime Synchronization はガバナンス状態変化を継続的に監視し、更新をネットワーク全体へ伝播します。",
        bm: "Runtime Synchronization memantau perubahan status governance secara berterusan dan menyebarkan kemas kini ke seluruh rangkaian governance.",
      },
      whyItMatters: {
        en: "It ensures every governance node operates from the latest verified state.",
        zh: "它确保所有治理节点基于最新验证状态运行。",
        jp: "これにより、すべてのノードが最新の検証済み状態で動作します。",
        bm: "Ia memastikan setiap nod governance beroperasi berdasarkan keadaan terkini yang disahkan.",
      },
    },

    {
      id: "sync-stability",
      title: {
        en: "Governance Stability",
        zh: "治理稳定性",
        jp: "ガバナンス安定性",
        bm: "Kestabilan Governance",
      },
      whatIs: {
        en: "Governance Stability is the outcome of successful synchronization across authority, consensus and operational coordination.",
        zh: "治理稳定性是权责、共识与运行协调成功同步后的结果。",
        jp: "Governance Stability は、権限・合意・運用調整が成功裏に同期された結果です。",
        bm: "Kestabilan Governance ialah hasil daripada penyelarasan yang berjaya antara kuasa, konsensus dan koordinasi operasi.",
      },
      whyItMatters: {
        en: "Stable governance enables confident treasury execution and predictable institutional behavior.",
        zh: "稳定治理使财资执行更有信心，并形成可预测的机构行为。",
        jp: "安定したガバナンスは、確信を持った財務実行と予測可能な組織行動を可能にします。",
        bm: "Governance yang stabil membolehkan pelaksanaan treasury yang lebih yakin dan tingkah laku institusi yang boleh diramal.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Signal Alignment",
      "Authority Coordination",
      "Decision Verification",
      "Runtime Synchronization",
      "Governance Stability",
    ],
    zh: [
      "信号对齐",
      "权责协调",
      "决策验证",
      "运行同步",
      "治理稳定",
    ],
    jp: [
      "シグナル整合",
      "権限調整",
      "判断検証",
      "ランタイム同期",
      "ガバナンス安定",
    ],
    bm: [
      "Penjajaran Isyarat",
      "Koordinasi Kuasa",
      "Pengesahan Keputusan",
      "Penyelarasan Runtime",
      "Kestabilan Governance",
    ],
  },

  summary: {
    en: "The Synchronization Layer keeps Governance OS operating as a unified system by ensuring alignment, consistency and coordination across all governance participants.",
    zh: "Synchronization Layer 通过确保对齐、一致性与协调，让 Governance OS 作为统一系统运行。",
    jp: "Synchronization Layer は、整合性・一貫性・調整を保証することで Governance OS を統一システムとして維持します。",
    bm: "Synchronization Layer memastikan Governance OS beroperasi sebagai satu sistem bersatu melalui penjajaran, konsistensi dan koordinasi.",
  },
};