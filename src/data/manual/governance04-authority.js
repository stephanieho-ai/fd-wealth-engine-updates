export const governance04Authority = {
  id: "governance-04",

  title: {
    en: "Authority Layer",
    zh: "权责层",
    jp: "権限レイヤー",
    bm: "Lapisan Kuasa",
  },

  description: {
    en: "The Authority Layer defines who can review, approve, escalate and execute treasury decisions within Governance OS.",
    zh: "Authority Layer 定义谁可以审核、批准、升级与执行财资决策。",
    jp: "Authority Layer は、Governance OS において誰が財務判断をレビュー、承認、エスカレーション、実行できるかを定義します。",
    bm: "Authority Layer mentakrifkan siapa yang boleh menyemak, meluluskan, mengeskalasi dan melaksanakan keputusan treasury.",
  },

  sections: [
    {
      id: "authority-treasury-desk",
      title: {
        en: "Treasury Desk",
        zh: "财资工作台",
        jp: "トレジャリーデスク",
        bm: "Meja Treasury",
      },
      whatIs: {
        en: "Treasury Desk is the operational authority closest to treasury activity, liquidity monitoring and execution readiness.",
        zh: "Treasury Desk 是最接近财资活动、流动性监控与执行准备的操作层权责单位。",
        jp: "Treasury Desk は、財務活動、流動性監視、実行準備に最も近い運用権限レイヤーです。",
        bm: "Treasury Desk ialah lapisan kuasa operasi yang paling hampir dengan aktiviti treasury, pemantauan kecairan dan kesiapsiagaan pelaksanaan.",
      },
      whyItMatters: {
        en: "It serves as the first governance checkpoint before decisions move upward.",
        zh: "它是决策向上流转前的第一道治理检查点。",
        jp: "判断が上位へ進む前の最初のガバナンスポイントです。",
        bm: "Ia berfungsi sebagai titik semakan governance pertama sebelum keputusan bergerak ke peringkat lebih tinggi.",
      },
    },

    {
      id: "authority-senior-treasury",
      title: {
        en: "Senior Treasury",
        zh: "高级财资层",
        jp: "シニアトレジャリー",
        bm: "Treasury Kanan",
      },
      whatIs: {
        en: "Senior Treasury validates treasury actions, reviews exposure levels and supervises operational decisions.",
        zh: "Senior Treasury 负责验证财资行动、审核风险暴露并监督操作决策。",
        jp: "Senior Treasury は財務行動を検証し、エクスポージャーを確認し、運用判断を監督します。",
        bm: "Senior Treasury mengesahkan tindakan treasury, menyemak tahap pendedahan dan menyelia keputusan operasi.",
      },
      whyItMatters: {
        en: "This layer reduces execution risk before governance escalation occurs.",
        zh: "这一层在治理升级前降低执行风险。",
        jp: "このレイヤーはガバナンスエスカレーション前の実行リスクを低減します。",
        bm: "Lapisan ini mengurangkan risiko pelaksanaan sebelum eskalasi governance berlaku.",
      },
    },

    {
      id: "authority-governance-board",
      title: {
        en: "Governance Board",
        zh: "治理委员会",
        jp: "ガバナンス委員会",
        bm: "Lembaga Governance",
      },
      whatIs: {
        en: "Governance Board coordinates policy alignment, consensus formation and governance-level approvals.",
        zh: "Governance Board 负责政策一致性、共识形成与治理级审批。",
        jp: "Governance Board はポリシー整合性、合意形成、ガバナンスレベル承認を担当します。",
        bm: "Governance Board menyelaras penjajaran polisi, pembentukan konsensus dan kelulusan peringkat governance.",
      },
      whyItMatters: {
        en: "It ensures treasury decisions remain aligned with institutional governance standards.",
        zh: "确保财资决策符合机构治理标准。",
        jp: "財務判断が機関ガバナンス基準と整合することを保証します。",
        bm: "Ia memastikan keputusan treasury kekal sejajar dengan piawaian governance institusi.",
      },
    },

    {
      id: "authority-executive",
      title: {
        en: "Executive Committee",
        zh: "执行委员会",
        jp: "エグゼクティブ委員会",
        bm: "Jawatankuasa Eksekutif",
      },
      whatIs: {
        en: "Executive Committee represents the highest governance authority and provides final institutional approval when required.",
        zh: "Executive Committee 代表最高治理权责，并在需要时提供最终机构批准。",
        jp: "Executive Committee は最高ガバナンス権限を代表し、必要に応じて最終承認を提供します。",
        bm: "Executive Committee mewakili kuasa governance tertinggi dan memberikan kelulusan institusi terakhir apabila diperlukan.",
      },
      whyItMatters: {
        en: "This layer protects strategic decisions and ensures executive accountability.",
        zh: "这一层保护战略决策并确保高层问责。",
        jp: "このレイヤーは戦略判断を保護し、経営責任を保証します。",
        bm: "Lapisan ini melindungi keputusan strategik dan memastikan akauntabiliti eksekutif.",
      },
    },

    {
      id: "authority-chain",
      title: {
        en: "Authority Chain",
        zh: "权责链",
        jp: "権限チェーン",
        bm: "Rantaian Kuasa",
      },
      whatIs: {
        en: "Authority flows from operational review toward executive approval through structured governance escalation.",
        zh: "权责通过结构化治理升级，从操作审核流向高层批准。",
        jp: "権限は構造化されたガバナンスエスカレーションを通じて、運用レビューから経営承認へ流れます。",
        bm: "Kuasa mengalir daripada semakan operasi kepada kelulusan eksekutif melalui eskalasi governance yang berstruktur.",
      },
      whyItMatters: {
        en: "This creates accountability, traceability and institutional control.",
        zh: "这建立问责性、可追踪性与机构控制。",
        jp: "これにより説明責任、追跡性、機関統制が確立されます。",
        bm: "Ini mewujudkan akauntabiliti, kebolehkesanan dan kawalan institusi.",
      },
    },
  ],

  operatingFlow: {
    en: [
      "Treasury Desk",
      "Senior Treasury",
      "Governance Board",
      "Executive Committee",
      "Institutional Approval",
    ],
    zh: [
      "财资工作台",
      "高级财资层",
      "治理委员会",
      "执行委员会",
      "机构批准",
    ],
    jp: [
      "トレジャリーデスク",
      "シニアトレジャリー",
      "ガバナンス委員会",
      "エグゼクティブ委員会",
      "機関承認",
    ],
    bm: [
      "Meja Treasury",
      "Treasury Kanan",
      "Lembaga Governance",
      "Jawatankuasa Eksekutif",
      "Kelulusan Institusi",
    ],
  },

  summary: {
    en: "The Authority Layer establishes accountability inside Governance OS by defining how decisions move from treasury operations to executive governance approval.",
    zh: "Authority Layer 通过定义决策如何从财资操作流向高层治理批准，建立 Governance OS 的问责体系。",
    jp: "Authority Layer は、判断が財務運用から経営ガバナンス承認へ進む流れを定義することで、Governance OS の説明責任を確立します。",
    bm: "Authority Layer membentuk akauntabiliti dalam Governance OS dengan mentakrifkan bagaimana keputusan bergerak daripada operasi treasury kepada kelulusan governance eksekutif.",
  },
};