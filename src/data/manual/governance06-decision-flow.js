export const governance06DecisionFlow = {
  id: "governance-06",

  title: {
    en: "Governance Decision Flow",
    zh: "治理决策流程",
    jp: "ガバナンス意思決定フロー",
    bm: "Aliran Keputusan Governance",
  },

  description: {
    en: "Governance Decision Flow explains how a treasury signal moves through assessment, consensus, approval, execution and feedback inside Governance OS.",
    zh: "Governance Decision Flow 解释一个财资信号如何在 Governance OS 中经过评估、共识、审批、执行与反馈。",
    jp: "Governance Decision Flow は、財務シグナルが Governance OS 内で評価、合意、承認、実行、フィードバックを通過する流れを説明します。",
    bm: "Governance Decision Flow menerangkan bagaimana isyarat treasury bergerak melalui penilaian, konsensus, kelulusan, pelaksanaan dan maklum balas dalam Governance OS.",
  },

  sections: [
    {
      id: "decision-signal",
      title: {
        en: "Signal",
        zh: "信号",
        jp: "シグナル",
        bm: "Isyarat",
      },
      whatIs: {
        en: "A governance decision begins when Treasury OS detects a treasury signal such as risk pressure, liquidity movement, recovery need or authority escalation.",
        zh: "当 Treasury OS 侦测到风险压力、流动性变化、恢复需求或权责升级等财资信号时，治理决策流程开始。",
        jp: "Treasury OS がリスク圧力、流動性変化、復旧要求、権限エスカレーションなどの財務シグナルを検出すると、ガバナンス判断が開始されます。",
        bm: "Keputusan governance bermula apabila Treasury OS mengesan isyarat treasury seperti tekanan risiko, pergerakan kecairan, keperluan pemulihan atau eskalasi kuasa.",
      },
      whyItMatters: {
        en: "The signal creates the trigger that moves treasury observation into governance review.",
        zh: "信号是把财资观察推进到治理审核的触发点。",
        jp: "シグナルは、財務観測をガバナンスレビューへ進めるトリガーです。",
        bm: "Isyarat menjadi pencetus yang memindahkan pemerhatian treasury kepada semakan governance.",
      },
    },

    {
      id: "decision-assessment",
      title: {
        en: "Assessment",
        zh: "评估",
        jp: "評価",
        bm: "Penilaian",
      },
      whatIs: {
        en: "Assessment evaluates the severity, urgency, governance impact and required authority level of the detected signal.",
        zh: "评估阶段判断信号的严重度、紧急性、治理影响与所需权责层级。",
        jp: "評価では、検出されたシグナルの重大度、緊急性、ガバナンス影響、必要な権限レベルを判断します。",
        bm: "Penilaian menilai tahap keterukan, keperluan segera, impak governance dan tahap kuasa yang diperlukan bagi isyarat yang dikesan.",
      },
      whyItMatters: {
        en: "A correct assessment prevents over-escalation, under-escalation and unnecessary governance delay.",
        zh: "正确评估可以避免过度升级、升级不足与不必要的治理延迟。",
        jp: "正確な評価は、過剰エスカレーション、不十分なエスカレーション、不要なガバナンス遅延を防ぎます。",
        bm: "Penilaian yang tepat mengelakkan eskalasi berlebihan, eskalasi tidak mencukupi dan kelewatan governance yang tidak perlu.",
      },
    },

    {
      id: "decision-consensus",
      title: {
        en: "Consensus",
        zh: "共识",
        jp: "合意",
        bm: "Konsensus",
      },
      whatIs: {
        en: "Consensus checks whether the required authority nodes agree on the interpretation, priority and action path of the treasury decision.",
        zh: "共识阶段检查所需权责节点是否对财资决策的解释、优先级与行动路径达成一致。",
        jp: "合意では、必要な権限ノードが財務判断の解釈、優先順位、行動経路について一致しているかを確認します。",
        bm: "Konsensus menyemak sama ada nod kuasa yang diperlukan bersetuju terhadap tafsiran, keutamaan dan laluan tindakan keputusan treasury.",
      },
      whyItMatters: {
        en: "Consensus ensures the decision is institutionally aligned before approval routing begins.",
        zh: "共识确保决策在进入审批路由前已经具备机构一致性。",
        jp: "合意は、承認ルーティングが始まる前に判断が機関として整合していることを保証します。",
        bm: "Konsensus memastikan keputusan telah sejajar secara institusi sebelum laluan kelulusan bermula.",
      },
    },

    {
      id: "decision-approval",
      title: {
        en: "Approval",
        zh: "审批",
        jp: "承認",
        bm: "Kelulusan",
      },
      whatIs: {
        en: "Approval routes the decision to the correct governance authority based on severity, policy, exposure level and execution risk.",
        zh: "审批阶段根据严重度、政策、风险暴露水平与执行风险，把决策路由到正确的治理权责单位。",
        jp: "承認では、重大度、ポリシー、エクスポージャーレベル、実行リスクに基づいて、判断を適切なガバナンス権限へルーティングします。",
        bm: "Kelulusan mengarahkan keputusan kepada kuasa governance yang betul berdasarkan keterukan, polisi, tahap pendedahan dan risiko pelaksanaan.",
      },
      whyItMatters: {
        en: "Approval protects treasury actions from bypassing institutional authority.",
        zh: "审批保护财资行动不会绕过机构权责。",
        jp: "承認は、財務行動が機関権限を迂回しないよう保護します。",
        bm: "Kelulusan melindungi tindakan treasury daripada memintas kuasa institusi.",
      },
    },

    {
      id: "decision-execution",
      title: {
        en: "Execution",
        zh: "执行",
        jp: "実行",
        bm: "Pelaksanaan",
      },
      whatIs: {
        en: "Execution happens only after governance alignment and approval are sufficient for the treasury action to proceed.",
        zh: "只有当治理一致性与审批足够后，财资行动才进入执行阶段。",
        jp: "実行は、ガバナンス整合性と承認が十分である場合にのみ進みます。",
        bm: "Pelaksanaan hanya berlaku selepas penjajaran governance dan kelulusan mencukupi untuk tindakan treasury diteruskan.",
      },
      whyItMatters: {
        en: "This ensures execution is controlled, explainable and supported by the right authority path.",
        zh: "这确保执行是可控、可解释，并由正确权责路径支持。",
        jp: "これにより、実行は管理され、説明可能で、適切な権限経路に支えられます。",
        bm: "Ini memastikan pelaksanaan terkawal, boleh dijelaskan dan disokong oleh laluan kuasa yang betul.",
      },
    },

    {
      id: "decision-feedback",
      title: {
        en: "Feedback",
        zh: "反馈",
        jp: "フィードバック",
        bm: "Maklum Balas",
      },
      whatIs: {
        en: "Feedback records the decision result, governance status, approval trail and any lessons for future governance coordination.",
        zh: "反馈阶段记录决策结果、治理状态、审批轨迹，以及未来治理协调可学习的经验。",
        jp: "フィードバックでは、判断結果、ガバナンス状態、承認履歴、将来の調整に活かせる学習内容を記録します。",
        bm: "Maklum balas merekodkan hasil keputusan, status governance, jejak kelulusan dan pembelajaran untuk koordinasi governance masa depan.",
      },
      whyItMatters: {
        en: "Feedback closes the governance loop and improves future decision quality.",
        zh: "反馈关闭治理闭环，并提升未来决策质量。",
        jp: "フィードバックはガバナンスループを閉じ、将来の判断品質を向上させます。",
        bm: "Maklum balas menutup gelung governance dan meningkatkan kualiti keputusan masa depan.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Signal",
      "Assessment",
      "Consensus",
      "Approval",
      "Execution",
      "Feedback",
    ],
    zh: [
      "信号",
      "评估",
      "共识",
      "审批",
      "执行",
      "反馈",
    ],
    jp: [
      "シグナル",
      "評価",
      "合意",
      "承認",
      "実行",
      "フィードバック",
    ],
    bm: [
      "Isyarat",
      "Penilaian",
      "Konsensus",
      "Kelulusan",
      "Pelaksanaan",
      "Maklum Balas",
    ],
  },

  summary: {
    en: "Governance Decision Flow is the core operating logic of Governance OS. It ensures every treasury decision moves through signal recognition, assessment, consensus, approval, execution and feedback.",
    zh: "Governance Decision Flow 是 Governance OS 的核心运行逻辑。它确保每一个财资决策都经过信号识别、评估、共识、审批、执行与反馈。",
    jp: "Governance Decision Flow は Governance OS の中核運用ロジックです。すべての財務判断がシグナル認識、評価、合意、承認、実行、フィードバックを通過することを保証します。",
    bm: "Governance Decision Flow ialah logik operasi teras Governance OS. Ia memastikan setiap keputusan treasury melalui pengesanan isyarat, penilaian, konsensus, kelulusan, pelaksanaan dan maklum balas.",
  },
};