import { useState } from "react";
import TreasuryDemoBanner from "../components/demo/TreasuryDemoBanner";
import useWorkspaceMode from "../hooks/useWorkspaceMode";
import "../styles/treasury/treasury-manual.css";

import { chapter01Dashboard } from "../data/manual/chapter01-dashboard";
import { chapter02TreasuryConsole } from "../data/manual/chapter02-treasury-console";
import { chapter03Intelligence } from "../data/manual/chapter03-intelligence";
import { chapter04Strategy } from "../data/manual/chapter04-strategy";
import { chapter05Runtime } from "../data/manual/chapter05-runtime";
import { chapter06Autonomous } from "../data/manual/chapter06-autonomous";
import { chapter07Architecture } from "../data/manual/chapter07-architecture";

const LANGUAGES = {
  en: "English",
  zh: "中文",
  jp: "日本語",
  bm: "Bahasa Melayu",
};

const UI = {
  en: {
    title: "Treasury OS Manual",
    subtitle:
      "Institutional operating manual for Dashboard, Treasury Console, Intelligence, Strategy, Runtime, Autonomous Treasury and Treasury OS architecture.",
    languageLabel: "Manual Language",
    tocLabel: "TREASURY OS MANUAL V1",
    tocTitle: "Manual Index",
    chapterLabel: "CHAPTER",
    operatingFlowLabel: "OPERATING PIPELINE",
    summaryTitle: "Chapter Summary",
    emptyLabel: "Documentation content pending.",
  },

  zh: {
    title: "Treasury OS Manual",
    subtitle:
      "机构级操作说明书：涵盖仪表板、财资控制台、财资智能、财资策略、运行层、自主财资与 Treasury OS 架构。",
    languageLabel: "Manual Language",
    tocLabel: "TREASURY OS MANUAL V1",
    tocTitle: "Manual Index / 手册目录",
    chapterLabel: "CHAPTER / 章节",
    operatingFlowLabel: "OPERATING PIPELINE / 操作管线",
    summaryTitle: "Chapter Summary / 章节总结",
    emptyLabel: "Documentation content pending / 说明内容待补充。",
  },

  jp: {
    title: "Treasury OS Manual",
    subtitle:
      "Dashboard、Treasury Console、Intelligence、Strategy、Runtime、Autonomous Treasury、Treasury OS Architecture を扱う機関向け操作マニュアルです。",
    languageLabel: "Manual Language",
    tocLabel: "TREASURY OS MANUAL V1",
    tocTitle: "Manual Index / 手册目次",
    chapterLabel: "CHAPTER / チャプター",
    operatingFlowLabel: "OPERATING PIPELINE / 操作パイプライン",
    summaryTitle: "Chapter Summary / チャプター要約",
    emptyLabel: "Documentation content pending / ドキュメント内容は準備中です。",
  },

  bm: {
    title: "Treasury OS Manual",
    subtitle:
      "Manual operasi institusi untuk Dashboard, Konsol Treasury, Intelligence, Strategy, Runtime, Treasury Autonomi dan seni bina Treasury OS.",
    languageLabel: "Manual Language",
    tocLabel: "TREASURY OS MANUAL V1",
    tocTitle: "Manual Index / Indeks Manual",
    chapterLabel: "CHAPTER / BAB",
    operatingFlowLabel: "OPERATING PIPELINE / ALIRAN OPERASI",
    summaryTitle: "Chapter Summary / Ringkasan Bab",
    emptyLabel: "Documentation content pending / Kandungan dokumentasi belum ditambah.",
  },
};

const CHAPTER_META = {
  "chapter-01": "Portfolio Monitoring • 9 Modules • Visibility Layer",
  "chapter-02": "G18 → G24 • 12 Modules • Treasury Operations",
  "chapter-03": "G21 Architecture • 12 Modules • Intelligence Layer",
  "chapter-04": "G22 Architecture • 7 Modules • Strategy Layer",
  "chapter-05": "G24 Architecture • 8 Modules • Runtime Layer",
  "chapter-06": "G25 Architecture • 5 Modules • Autonomous Layer",
  "chapter-07": "Treasury OS V1 • 8 Modules • System Blueprint",
};

const manualChapters = [
  chapter01Dashboard,
  chapter02TreasuryConsole,
  chapter03Intelligence,
  chapter04Strategy,
  chapter05Runtime,
  chapter06Autonomous,
  chapter07Architecture,
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

export default function TreasuryManualPage() {
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

        <div className="treasury-manual-footer-title">
          FD WEALTH ENGINE
        </div>

        <div className="treasury-manual-footer-subtitle">
          Treasury OS Operating Manual
        </div>

        <div className="treasury-manual-footer-description">
          Institutional Treasury Architecture Documentation
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