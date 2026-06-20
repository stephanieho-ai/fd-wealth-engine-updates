import { useState } from "react";
import TreasuryDemoBanner from "../components/demo/TreasuryDemoBanner";
import useWorkspaceMode from "../hooks/useWorkspaceMode";
import "../styles/treasury/treasury-manual.css";

import { governance01Overview } from "../data/manual/governance01-overview";
import { governance02Mesh } from "../data/manual/governance02-mesh";
import { governance03Runtime } from "../data/manual/governance03-runtime";
import { governance04Authority } from "../data/manual/governance04-authority";
import { governance05Synchronization } from "../data/manual/governance05-synchronization";
import { governance06DecisionFlow } from "../data/manual/governance06-decision-flow";
import { governance07Components } from "../data/manual/governance07-components";
import { governance08Roadmap } from "../data/manual/governance08-roadmap";

const LANGUAGES = {
  en: "English",
  zh: "中文",
  jp: "日本語",
  bm: "Bahasa Melayu",
};

const UI = {
  en: {
    title: "Governance OS Manual",
    subtitle:
      "Institutional governance manual for authority coordination, consensus intelligence, synchronization, decision flow and Governance OS architecture.",
    languageLabel: "Manual Language",
    tocLabel: "GOVERNANCE OS MANUAL V1",
    tocTitle: "Manual Index",
    chapterLabel: "CHAPTER",
    operatingFlowLabel: "GOVERNANCE PIPELINE",
    summaryTitle: "Chapter Summary",
    emptyLabel: "Documentation content pending.",
  },

  zh: {
    title: "Governance OS Manual",
    subtitle:
      "机构级治理说明书：涵盖权责协调、共识智能、同步机制、决策流程与 Governance OS 架构。",
    languageLabel: "Manual Language",
    tocLabel: "GOVERNANCE OS MANUAL V1",
    tocTitle: "Manual Index / 手册目录",
    chapterLabel: "CHAPTER / 章节",
    operatingFlowLabel: "GOVERNANCE PIPELINE / 治理管线",
    summaryTitle: "Chapter Summary / 章节总结",
    emptyLabel: "Documentation content pending / 说明内容待补充。",
  },

  jp: {
    title: "Governance OS Manual",
    subtitle:
      "権限調整、合意インテリジェンス、同期、意思決定フロー、Governance OS Architecture を扱う機関向けガバナンスマニュアルです。",
    languageLabel: "Manual Language",
    tocLabel: "GOVERNANCE OS MANUAL V1",
    tocTitle: "Manual Index / 手册目次",
    chapterLabel: "CHAPTER / チャプター",
    operatingFlowLabel: "GOVERNANCE PIPELINE / ガバナンスパイプライン",
    summaryTitle: "Chapter Summary / チャプター要約",
    emptyLabel: "Documentation content pending / ドキュメント内容は準備中です。",
  },

  bm: {
    title: "Governance OS Manual",
    subtitle:
      "Manual governance institusi untuk koordinasi kuasa, intelligence konsensus, penyelarasan, aliran keputusan dan seni bina Governance OS.",
    languageLabel: "Manual Language",
    tocLabel: "GOVERNANCE OS MANUAL V1",
    tocTitle: "Manual Index / Indeks Manual",
    chapterLabel: "CHAPTER / BAB",
    operatingFlowLabel: "GOVERNANCE PIPELINE / ALIRAN GOVERNANCE",
    summaryTitle: "Chapter Summary / Ringkasan Bab",
    emptyLabel: "Documentation content pending / Kandungan dokumentasi belum ditambah.",
  },
};

const CHAPTER_META = {
  "governance-01": "Governance OS • Institutional Control • Overview Layer",
  "governance-02": "G19 Architecture • Multi-Node Authority • Governance Mesh",
  "governance-03": "Runtime Intelligence • Health • Stability Monitoring",
  "governance-04": "Authority Chain • Approval • Escalation Layer",
  "governance-05": "Signal Alignment • Coordination • Synchronization Layer",
  "governance-06": "Signal → Assessment → Consensus → Approval → Execution",
  "governance-07": "Governance Console • Components • Operating Interface",
  "governance-08": "Governance OS V1 • Roadmap • Future Architecture",
};

const manualChapters = [
  governance01Overview,
  governance02Mesh,
  governance03Runtime,
  governance04Authority,
  governance05Synchronization,
  governance06DecisionFlow,
  governance07Components,
  governance08Roadmap,
];

function getText(value, lang, fallbackLang = "en") {
  if (!value) return "";

  if (typeof value === "object" && !Array.isArray(value)) {
    return value[lang] || value[fallbackLang] || "";
  }

  return value;
}

function shouldShowLocal(lang) {
  return lang !== "en";
}

function BilingualText({ value, lang }) {
  const enText = getText(value, "en");
  const localText = getText(value, lang);

  return (
    <>
      {enText && <p>{enText}</p>}

      {shouldShowLocal(lang) && localText && localText !== enText && (
        <p className="manual-local-text">{localText}</p>
      )}
    </>
  );
}

function BilingualTitle({ value, lang }) {
  const enText = getText(value, "en");
  const localText = getText(value, lang);

  return (
    <>
      <h3>{enText}</h3>

      {shouldShowLocal(lang) && localText && localText !== enText && (
        <h4 className="manual-local-title">{localText}</h4>
      )}
    </>
  );
}

function getChapterText(chapter, lang) {
  return {
    titleEn: getText(chapter.title, "en"),
    titleLocal: getText(chapter.title, lang),
  };
}

function getSectionText(section) {
  return {
    title: section.title,
    primary: section.whatIs || section.meaning || section.subtitle,
    secondary: section.whyItMatters || section.purpose,
  };
}

function getOperatingFlow(chapter, lang) {
  if (!chapter.operatingFlow) return [];

  if (Array.isArray(chapter.operatingFlow)) {
    return chapter.operatingFlow;
  }

  if (typeof chapter.operatingFlow === "object") {
    return chapter.operatingFlow[lang] || chapter.operatingFlow.en || [];
  }

  return [];
}

export default function GovernanceManualPage() {
  const { workspaceMode } = useWorkspaceMode();
  const isDemoMode = workspaceMode === "DEMO";

  const [lang, setLang] = useState("en");
  const ui = UI[lang];

  return (
    <div className="treasury-manual-page">
      {isDemoMode && <TreasuryDemoBanner compact />}

      <section className="manual-hero">
        <div className="manual-logo-wrap">
          <div className="manual-logo">FD</div>

          <div>
            <div className="manual-kicker">
              TREASURY OS V1 
            </div>

            <h1>{ui.title}</h1>
            <p>{ui.subtitle}</p>
          </div>
        </div>

        <div className="manual-language-card">
          <span>{ui.languageLabel}</span>

          <select
            value={lang}
            onChange={(event) => setLang(event.target.value)}
          >
            {Object.entries(LANGUAGES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="manual-navigation-panel">
        <div className="manual-section-header">
          <p>{ui.tocLabel}</p>
          <h2>{ui.tocTitle}</h2>
        </div>

        <div className="manual-nav-grid">
          {manualChapters.map((chapter, index) => {
            const chapterText = getChapterText(chapter, lang);

            return (
              <a
                href={`#${chapter.id}`}
                className="manual-nav-card"
                key={chapter.id}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <strong>{chapterText.titleEn}</strong>

                {shouldShowLocal(lang) &&
                  chapterText.titleLocal &&
                  chapterText.titleLocal !== chapterText.titleEn && (
                    <strong className="manual-local-title">
                      {chapterText.titleLocal}
                    </strong>
                  )}

                <small>{CHAPTER_META[chapter.id]}</small>
              </a>
            );
          })}
        </div>
      </section>

      {manualChapters.map((chapter, index) => {
        const chapterText = getChapterText(chapter, lang);
        const operatingFlow = getOperatingFlow(chapter, lang);

        return (
          <section
            key={chapter.id}
            id={chapter.id}
            className="manual-architecture-panel"
          >
            <div className="manual-section-header">
              <p>
                {ui.chapterLabel} {String(index + 1).padStart(2, "0")}
              </p>

              <h2>{chapterText.titleEn}</h2>

              {shouldShowLocal(lang) &&
                chapterText.titleLocal &&
                chapterText.titleLocal !== chapterText.titleEn && (
                  <h3 className="manual-local-title">
                    {chapterText.titleLocal}
                  </h3>
                )}

              <small>{CHAPTER_META[chapter.id]}</small>
            </div>

            <div className="manual-chapter-description">
              <BilingualText value={chapter.description} lang={lang} />
            </div>

            {chapter.sections?.length > 0 ? (
              <div className="manual-content-grid">
                {chapter.sections.map((section) => {
                  const sectionText = getSectionText(section);

                  return (
                    <article className="manual-info-card" key={section.id}>
                      <span className="manual-dot" />

                      <BilingualTitle value={sectionText.title} lang={lang} />

                      <div className="manual-card-copy">
                        {sectionText.primary && (
                          <BilingualText
                            value={sectionText.primary}
                            lang={lang}
                          />
                        )}

                        {sectionText.secondary && (
                          <BilingualText
                            value={sectionText.secondary}
                            lang={lang}
                          />
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="manual-info-card">
                <span className="manual-dot" />
                <h3>{chapterText.titleEn}</h3>
                <p>{ui.emptyLabel}</p>
              </div>
            )}

            {operatingFlow.length > 0 && (
              <div className="manual-architecture-panel manual-flow-panel">
                <div className="manual-section-header">
                  <p>{ui.operatingFlowLabel}</p>
                  <h2>{chapterText.titleEn}</h2>

                  {shouldShowLocal(lang) &&
                    chapterText.titleLocal &&
                    chapterText.titleLocal !== chapterText.titleEn && (
                      <h3 className="manual-local-title">
                        {chapterText.titleLocal}
                      </h3>
                    )}
                </div>

                <div className="manual-flow">
                  {operatingFlow.map((item, flowIndex) => (
                    <div
                      className="manual-flow-item"
                      key={`${item}-${flowIndex}`}
                    >
                      <strong>{item}</strong>

                      {flowIndex < operatingFlow.length - 1 && (
                        <span className="manual-arrow">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {chapter.summary && (
              <div className="manual-info-card manual-summary-card">
                <span className="manual-dot" />
                <h3>{ui.summaryTitle}</h3>
                <BilingualText value={chapter.summary} lang={lang} />
              </div>
            )}
          </section>
        );
      })}

      <footer className="treasury-manual-footer">
        <div className="treasury-manual-footer-title">FD WEALTH ENGINE</div>

        <div className="treasury-manual-footer-subtitle">
          Governance OS Operating Manual
        </div>

        <div className="treasury-manual-footer-description">
          Institutional Governance Architecture Documentation
        </div>

        <div className="treasury-manual-footer-version">
          Version 1.0.0
        </div>

        <div className="treasury-manual-footer-divider" />

        <div className="treasury-manual-footer-platform-title">
          TREASURY OS V1
        </div>

        <div className="treasury-manual-footer-platform-subtitle">
          Treasury Operating System Platform
        </div>

        <div className="treasury-manual-footer-platform-tech">
          Built with React + Electron
        </div>
      </footer>
    </div>
  );
}