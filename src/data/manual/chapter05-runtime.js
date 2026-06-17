
export const chapter05Runtime = {
  id: "chapter-05",

  title: {
    en: "Treasury Runtime Layer",
    zh: "财资运行层",
    jp: "財務ランタイム層",
    bm: "Lapisan Runtime Treasury",
  },

  description: {
    en: "Institutional treasury runtime architecture based on G24, covering runtime intelligence, signal monitoring, alerts, escalation, response, recovery and stability management.",
    zh: "基于 G24 的机构级财资运行架构，涵盖运行智能、信号监控、警报、升级、响应、恢复与稳定性管理。",
    jp: "G24 に基づく機関レベルの財務ランタイムアーキテクチャです。ランタイムインテリジェンス、シグナル監視、アラート、エスカレーション、レスポンス、リカバリー、安定性管理を含みます。",
    bm: "Seni bina runtime treasury institusi berdasarkan G24 yang merangkumi kecerdasan runtime, pemantauan isyarat, amaran, escalation, response, recovery dan pengurusan kestabilan.",
  },

  learningGoal: {
    en: "Understand how Treasury Runtime monitors, reacts, recovers and stabilizes Treasury OS during real operating conditions.",
    zh: "理解 Treasury Runtime 如何在真实运行环境中监控、响应、恢复并稳定 Treasury OS。",
    jp: "Treasury Runtime が実際の運用環境で Treasury OS を監視し、対応し、回復し、安定化する方法を理解します。",
    bm: "Memahami bagaimana Treasury Runtime memantau, bertindak balas, memulihkan dan menstabilkan Treasury OS dalam keadaan operasi sebenar.",
  },

  sections: [
    {
      id: "runtime-intelligence-core",

      title: {
        en: "Runtime Intelligence Core",
        zh: "运行智能核心",
        jp: "ランタイムインテリジェンスコア",
        bm: "Teras Kecerdasan Runtime",
      },

      meaning: {
        en: "Central runtime awareness engine.",
        zh: "中央运行感知引擎。",
        jp: "中央ランタイム認識エンジンです。",
        bm: "Enjin kesedaran runtime pusat.",
      },

      purpose: {
        en: "Provides real-time visibility into Treasury OS operating conditions.",
        zh: "提供 Treasury OS 实时运行状态可视化。",
        jp: "Treasury OS のリアルタイム運用状況を可視化します。",
        bm: "Memberikan keterlihatan masa nyata terhadap keadaan operasi Treasury OS.",
      },

      usage: {
        en: "Use it as the primary runtime monitoring dashboard.",
        zh: "将其作为主要运行监控中心。",
        jp: "主要なランタイム監視センターとして使用します。",
        bm: "Gunakan sebagai pusat pemantauan runtime utama.",
      },
    },

    {
      id: "runtime-signal",

      title: {
        en: "Runtime Signal",
        zh: "运行信号",
        jp: "ランタイムシグナル",
        bm: "Isyarat Runtime",
      },

      meaning: {
        en: "Runtime condition detection layer.",
        zh: "运行状态侦测层。",
        jp: "ランタイム状態検出層です。",
        bm: "Lapisan pengesanan keadaan runtime.",
      },

      purpose: {
        en: "Detects operating conditions, abnormal behavior and runtime pressure.",
        zh: "侦测运行状态、异常行为与运行压力。",
        jp: "運用状態、異常動作、ランタイム圧力を検出します。",
        bm: "Mengesan keadaan operasi, tingkah laku luar biasa dan tekanan runtime.",
      },

      usage: {
        en: "Review runtime signals before evaluating alerts.",
        zh: "在分析警报前先查看运行信号。",
        jp: "アラート分析前にランタイムシグナルを確認します。",
        bm: "Semak isyarat runtime sebelum menilai amaran.",
      },
    },

    {
      id: "runtime-alert",

      title: {
        en: "Runtime Alert",
        zh: "运行警报",
        jp: "ランタイムアラート",
        bm: "Amaran Runtime",
      },

      meaning: {
        en: "Runtime notification layer.",
        zh: "运行通知层。",
        jp: "ランタイム通知層です。",
        bm: "Lapisan pemberitahuan runtime.",
      },

      purpose: {
        en: "Notifies operators when runtime conditions require attention.",
        zh: "当运行状态需要关注时通知操作员。",
        jp: "運用状態が注意を必要とする場合に通知します。",
        bm: "Memaklumkan operator apabila keadaan runtime memerlukan perhatian.",
      },

      usage: {
        en: "Use alerts to identify priority runtime issues.",
        zh: "利用警报识别优先处理的问题。",
        jp: "優先対応が必要な問題を特定するために使用します。",
        bm: "Gunakan amaran untuk mengenal pasti isu runtime yang perlu diberi keutamaan.",
      },
    },

    {
      id: "runtime-escalation",

      title: {
        en: "Runtime Escalation",
        zh: "运行升级",
        jp: "ランタイムエスカレーション",
        bm: "Escalation Runtime",
      },

      meaning: {
        en: "Runtime intervention escalation layer.",
        zh: "运行干预升级层。",
        jp: "ランタイム介入エスカレーション層です。",
        bm: "Lapisan escalation intervensi runtime.",
      },

      purpose: {
        en: "Routes unresolved runtime issues toward higher response authority.",
        zh: "将未解决的运行问题升级至更高响应层级。",
        jp: "未解決のランタイム問題を上位対応レベルへ引き上げます。",
        bm: "Meningkatkan isu runtime yang belum diselesaikan ke tahap tindak balas yang lebih tinggi.",
      },

      usage: {
        en: "Use when runtime alerts exceed normal operating tolerance.",
        zh: "当运行警报超出正常容忍范围时使用。",
        jp: "ランタイムアラートが許容範囲を超えた場合に使用します。",
        bm: "Gunakan apabila amaran runtime melebihi toleransi operasi biasa.",
      },
    },

    {
      id: "runtime-response",

      title: {
        en: "Runtime Response",
        zh: "运行响应",
        jp: "ランタイムレスポンス",
        bm: "Respons Runtime",
      },

      meaning: {
        en: "Runtime corrective action layer.",
        zh: "运行纠正行动层。",
        jp: "ランタイム是正アクション層です。",
        bm: "Lapisan tindakan pembetulan runtime.",
      },

      purpose: {
        en: "Coordinates actions that reduce runtime pressure and restore normal operation.",
        zh: "协调降低运行压力并恢复正常运作的行动。",
        jp: "ランタイム圧力を低減し正常運用へ戻すアクションを調整します。",
        bm: "Menyelaraskan tindakan yang mengurangkan tekanan runtime dan memulihkan operasi normal.",
      },

      usage: {
        en: "Use it to manage operational responses to runtime events.",
        zh: "用于管理运行事件的响应行动。",
        jp: "ランタイムイベントへの対応を管理するために使用します。",
        bm: "Gunakan untuk mengurus respons operasi terhadap peristiwa runtime.",
      },
    },

    {
      id: "runtime-recovery",

      title: {
        en: "Runtime Recovery",
        zh: "运行恢复",
        jp: "ランタイムリカバリー",
        bm: "Recovery Runtime",
      },

      meaning: {
        en: "Runtime restoration layer.",
        zh: "运行恢复层。",
        jp: "ランタイム復旧層です。",
        bm: "Lapisan pemulihan runtime.",
      },

      purpose: {
        en: "Restores runtime health after incidents or operational disruption.",
        zh: "在事故或运行中断后恢复运行健康状态。",
        jp: "障害や運用中断後にランタイムの健全性を回復します。",
        bm: "Memulihkan kesihatan runtime selepas insiden atau gangguan operasi.",
      },

      usage: {
        en: "Monitor recovery progress until normal runtime operation is restored.",
        zh: "监控恢复进度直至恢复正常运行。",
        jp: "正常運用へ戻るまで回復状況を監視します。",
        bm: "Pantau kemajuan recovery sehingga operasi runtime kembali normal.",
      },
    },

    {
      id: "runtime-premium-recovery",

      title: {
        en: "Premium Recovery",
        zh: "高级恢复",
        jp: "プレミアムリカバリー",
        bm: "Recovery Premium",
      },

      meaning: {
        en: "Advanced runtime recovery layer.",
        zh: "高级运行恢复层。",
        jp: "高度ランタイム回復層です。",
        bm: "Lapisan recovery runtime lanjutan.",
      },

      purpose: {
        en: "Provides enhanced recovery intelligence and accelerated stabilization capabilities.",
        zh: "提供增强恢复智能与加速稳定能力。",
        jp: "高度な回復インテリジェンスと迅速な安定化機能を提供します。",
        bm: "Menyediakan kecerdasan recovery yang dipertingkatkan dan keupayaan penstabilan yang lebih pantas.",
      },

      usage: {
        en: "Use when complex runtime conditions require enhanced recovery support.",
        zh: "在复杂运行环境下使用增强恢复支持。",
        jp: "複雑なランタイム状況で高度な回復支援が必要な場合に使用します。",
        bm: "Gunakan apabila keadaan runtime yang kompleks memerlukan sokongan recovery tambahan.",
      },
    },

    {
      id: "runtime-stability",

      title: {
        en: "Runtime Stability",
        zh: "运行稳定性",
        jp: "ランタイム安定性",
        bm: "Kestabilan Runtime",
      },

      meaning: {
        en: "Runtime health and resilience layer.",
        zh: "运行健康与韧性层。",
        jp: "ランタイム健全性と回復力層です。",
        bm: "Lapisan kesihatan dan daya tahan runtime.",
      },

      purpose: {
        en: "Measures whether Treasury OS has achieved sustainable operating stability.",
        zh: "衡量 Treasury OS 是否达到可持续运行稳定状态。",
        jp: "Treasury OS が持続可能な安定運用状態に達したかを測定します。",
        bm: "Mengukur sama ada Treasury OS telah mencapai kestabilan operasi yang mampan.",
      },

      usage: {
        en: "Use it as the final confirmation that runtime recovery and response activities were successful.",
        zh: "作为运行恢复与响应成功完成的最终确认。",
        jp: "ランタイム回復と対応が成功したことを確認する最終指標として使用します。",
        bm: "Gunakan sebagai pengesahan akhir bahawa aktiviti recovery dan response telah berjaya.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Runtime Intelligence Core",
      "Runtime Signal",
      "Runtime Alert",
      "Runtime Escalation",
      "Runtime Response",
      "Runtime Recovery",
      "Premium Recovery",
      "Runtime Stability",
    ],

    zh: [
      "运行智能核心",
      "运行信号",
      "运行警报",
      "运行升级",
      "运行响应",
      "运行恢复",
      "高级恢复",
      "运行稳定性",
    ],

    jp: [
      "ランタイムインテリジェンスコア",
      "ランタイムシグナル",
      "ランタイムアラート",
      "ランタイムエスカレーション",
      "ランタイムレスポンス",
      "ランタイムリカバリー",
      "プレミアムリカバリー",
      "ランタイム安定性",
    ],

    bm: [
      "Teras Kecerdasan Runtime",
      "Isyarat Runtime",
      "Amaran Runtime",
      "Escalation Runtime",
      "Respons Runtime",
      "Recovery Runtime",
      "Recovery Premium",
      "Kestabilan Runtime",
    ],
  },

  summary: {
    en: "Treasury Runtime Layer is the operating system layer of Treasury OS. It continuously monitors runtime conditions, detects signals, generates alerts, escalates issues, coordinates responses, manages recovery and validates long-term stability.",

    zh: "财资运行层是 Treasury OS 的操作系统层。它持续监控运行状态、侦测信号、生成警报、升级问题、协调响应、管理恢复并验证长期稳定性。",

    jp: "Treasury Runtime Layer は Treasury OS のオペレーティングシステム層です。ランタイム状態を継続的に監視し、シグナルを検出し、アラートを生成し、問題をエスカレーションし、対応を調整し、回復を管理し、長期的な安定性を検証します。",

    bm: "Lapisan Runtime Treasury ialah lapisan sistem operasi Treasury OS. Ia memantau keadaan runtime secara berterusan, mengesan isyarat, menghasilkan amaran, meningkatkan isu, menyelaraskan respons, mengurus recovery dan mengesahkan kestabilan jangka panjang.",
  },
};
