export const governance03Runtime = {
  id: "governance-03",

  title: {
    en: "Governance Runtime",
    zh: "治理运行层",
    jp: "ガバナンス実行レイヤー",
    bm: "Runtime Governance",
  },

  description: {
    en: "Governance Runtime monitors the live health of authority coordination, consensus status, synchronization pressure and governance stability.",
    zh: "Governance Runtime 监控权责协调、共识状态、同步压力与治理稳定性的实时健康状态。",
    jp: "Governance Runtime は、権限調整、合意状態、同期圧力、ガバナンス安定性のライブヘルスを監視します。",
    bm: "Governance Runtime memantau kesihatan langsung koordinasi kuasa, status konsensus, tekanan penyelarasan dan kestabilan governance.",
  },

  sections: [
    {
      id: "runtime-health",
      title: {
        en: "Runtime Health",
        zh: "运行健康",
        jp: "実行ヘルス",
        bm: "Kesihatan Runtime",
      },
      whatIs: {
        en: "Runtime Health shows whether the governance system is stable, delayed, congested or under coordination pressure.",
        zh: "运行健康显示治理系统是稳定、延迟、拥堵，还是处于协调压力之下。",
        jp: "Runtime Health は、ガバナンスシステムが安定、遅延、混雑、または調整圧力下にあるかを示します。",
        bm: "Kesihatan Runtime menunjukkan sama ada sistem governance stabil, tertangguh, sesak atau berada di bawah tekanan koordinasi.",
      },
      whyItMatters: {
        en: "It gives operators early visibility before governance slowdown becomes decision failure.",
        zh: "它让操作员在治理放缓变成决策失败之前，提前看到问题。",
        jp: "ガバナンスの遅れが判断失敗になる前に、オペレーターへ早期可視性を提供します。",
        bm: "Ia memberi keterlihatan awal kepada operator sebelum kelembapan governance menjadi kegagalan keputusan.",
      },
    },

    {
      id: "authority-health",
      title: {
        en: "Authority Health",
        zh: "权责健康",
        jp: "権限ヘルス",
        bm: "Kesihatan Kuasa",
      },
      whatIs: {
        en: "Authority Health measures whether governance nodes are available, responsive and ready to participate in approval or escalation.",
        zh: "权责健康衡量治理节点是否可用、响应正常，并准备参与审批或升级。",
        jp: "Authority Health は、ガバナンスノードが利用可能で、応答可能で、承認またはエスカレーションに参加できる状態かを測定します。",
        bm: "Kesihatan Kuasa mengukur sama ada nod governance tersedia, responsif dan bersedia menyertai kelulusan atau eskalasi.",
      },
      whyItMatters: {
        en: "When authority health weakens, governance decisions may stall even if treasury signals are clear.",
        zh: "当权责健康变弱时，即使财资信号清晰，治理决策也可能停滞。",
        jp: "権限ヘルスが低下すると、財務シグナルが明確でもガバナンス判断が停滞する可能性があります。",
        bm: "Apabila kesihatan kuasa menjadi lemah, keputusan governance mungkin terhenti walaupun isyarat treasury jelas.",
      },
    },

    {
      id: "consensus-health",
      title: {
        en: "Consensus Health",
        zh: "共识健康",
        jp: "合意ヘルス",
        bm: "Kesihatan Konsensus",
      },
      whatIs: {
        en: "Consensus Health indicates whether the governance nodes are aligned enough for a decision to proceed safely.",
        zh: "共识健康显示治理节点是否达到足够一致，可以安全推进决策。",
        jp: "Consensus Health は、ガバナンスノードが安全に判断を進められる程度に整合しているかを示します。",
        bm: "Kesihatan Konsensus menunjukkan sama ada nod governance cukup sejajar untuk keputusan diteruskan dengan selamat.",
      },
      whyItMatters: {
        en: "Weak consensus increases the risk of disputed approvals, delayed execution and unclear accountability.",
        zh: "共识不足会增加审批争议、执行延迟与问责不清的风险。",
        jp: "合意が弱いと、承認の争い、実行遅延、責任の不明確化のリスクが高まります。",
        bm: "Konsensus yang lemah meningkatkan risiko kelulusan dipertikaikan, pelaksanaan tertangguh dan akauntabiliti tidak jelas.",
      },
    },

    {
      id: "coordination-pressure",
      title: {
        en: "Coordination Pressure",
        zh: "协调压力",
        jp: "調整圧力",
        bm: "Tekanan Koordinasi",
      },
      whatIs: {
        en: "Coordination Pressure measures how much governance effort is required to keep authority nodes synchronized.",
        zh: "协调压力衡量维持权责节点同步需要多少治理努力。",
        jp: "Coordination Pressure は、権限ノードを同期状態に保つために必要なガバナンス負荷を測定します。",
        bm: "Tekanan Koordinasi mengukur tahap usaha governance yang diperlukan untuk memastikan nod kuasa kekal selaras.",
      },
      whyItMatters: {
        en: "High pressure suggests governance capacity may be overloaded and decisions may require routing support.",
        zh: "高协调压力表示治理容量可能过载，决策可能需要路由支持。",
        jp: "高い調整圧力は、ガバナンス能力が過負荷となり、判断にルーティング支援が必要である可能性を示します。",
        bm: "Tekanan tinggi menunjukkan kapasiti governance mungkin terbeban dan keputusan mungkin memerlukan sokongan laluan.",
      },
    },

    {
      id: "runtime-stability",
      title: {
        en: "Governance Stability",
        zh: "治理稳定性",
        jp: "ガバナンス安定性",
        bm: "Kestabilan Governance",
      },
      whatIs: {
        en: "Governance Stability combines authority health, consensus strength, synchronization quality and coordination pressure into one operating view.",
        zh: "治理稳定性把权责健康、共识强度、同步质量与协调压力整合成一个运行视图。",
        jp: "Governance Stability は、権限ヘルス、合意の強さ、同期品質、調整圧力を1つの運用ビューに統合します。",
        bm: "Kestabilan Governance menggabungkan kesihatan kuasa, kekuatan konsensus, kualiti penyelarasan dan tekanan koordinasi ke dalam satu paparan operasi.",
      },
      whyItMatters: {
        en: "It helps operators understand whether governance is ready, strained or requires intervention.",
        zh: "它帮助操作员理解治理状态是就绪、紧张，还是需要干预。",
        jp: "ガバナンスが準備完了、逼迫状態、または介入が必要かをオペレーターが理解するのに役立ちます。",
        bm: "Ia membantu operator memahami sama ada governance bersedia, tertekan atau memerlukan intervensi.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Runtime Signal",
      "Authority Health Check",
      "Consensus Health Check",
      "Synchronization Review",
      "Pressure Assessment",
      "Governance Stability View",
    ],
    zh: [
      "运行信号",
      "权责健康检查",
      "共识健康检查",
      "同步审核",
      "压力评估",
      "治理稳定视图",
    ],
    jp: [
      "ランタイムシグナル",
      "権限ヘルス確認",
      "合意ヘルス確認",
      "同期レビュー",
      "圧力評価",
      "ガバナンス安定ビュー",
    ],
    bm: [
      "Isyarat Runtime",
      "Semakan Kesihatan Kuasa",
      "Semakan Kesihatan Konsensus",
      "Semakan Penyelarasan",
      "Penilaian Tekanan",
      "Paparan Kestabilan Governance",
    ],
  },

  summary: {
    en: "Governance Runtime gives Governance OS its live monitoring capability. It helps the institution see whether governance coordination is healthy, pressured or unstable.",
    zh: "Governance Runtime 让 Governance OS 具备实时监控能力。它帮助机构看清治理协调是健康、受压，还是不稳定。",
    jp: "Governance Runtime は Governance OS にライブ監視能力を与えます。ガバナンス調整が健全か、圧迫されているか、不安定かを機関が把握できるようにします。",
    bm: "Governance Runtime memberikan keupayaan pemantauan langsung kepada Governance OS. Ia membantu institusi melihat sama ada koordinasi governance sihat, tertekan atau tidak stabil.",
  },
};