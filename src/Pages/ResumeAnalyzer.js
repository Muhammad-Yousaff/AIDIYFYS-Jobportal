import React, { useMemo, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const HISTORY_STORAGE_KEY = "__aidifys_resume_analyzer_history_v1";

const SKILL_LIBRARY = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "express",
  "python",
  "django",
  "flask",
  "java",
  "spring",
  "c#",
  ".net",
  "sql",
  "mysql",
  "postgresql",
  "mongodb",
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "git",
  "rest api",
  "graphql",
  "html",
  "css",
  "tailwind",
  "figma",
  "power bi",
  "excel",
  "communication",
  "leadership",
  "problem solving",
  "agile",
  "scrum",
  "project management",
  "testing",
  "jest",
  "cypress"
];

const SECTION_HINTS = {
  summary: ["summary", "profile", "objective", "about me"],
  experience: ["experience", "work history", "employment", "professional experience"],
  education: ["education", "university", "college", "degree"],
  projects: ["projects", "portfolio", "case study"],
  skills: ["skills", "technical skills", "core competencies"],
  certifications: ["certification", "certifications", "licenses"]
};

const tokenize = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const unique = (arr = []) => [...new Set(arr)];

const extractSkills = (resumeText) => {
  const lower = resumeText.toLowerCase();
  return SKILL_LIBRARY.filter((skill) => lower.includes(skill.toLowerCase()));
};

const hasAnyKeyword = (text, keywords) =>
  keywords.some((keyword) => text.includes(keyword.toLowerCase()));

const calculateResumeScore = (resumeText, skills) => {
  const lower = resumeText.toLowerCase();
  const words = tokenize(resumeText);

  let score = 0;
  const reasons = [];

  const hasEmail = /[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/.test(resumeText);
  const hasPhone = /(\+?\d[\d\s()-]{8,}\d)/.test(resumeText);
  if (hasEmail && hasPhone) {
    score += 15;
    reasons.push("Contact details found (+15)");
  } else {
    reasons.push("Add both email and phone number");
  }

  const foundSections = Object.entries(SECTION_HINTS).filter(([, hints]) =>
    hasAnyKeyword(lower, hints)
  );
  const sectionPoints = Math.min(foundSections.length * 8, 40);
  score += sectionPoints;
  reasons.push(`Structured sections detected (+${sectionPoints})`);

  const skillPoints = Math.min(skills.length * 2, 20);
  score += skillPoints;
  reasons.push(`Relevant skills recognized (+${skillPoints})`);

  if (words.length >= 250 && words.length <= 900) {
    score += 10;
    reasons.push("Good resume length (+10)");
  } else {
    reasons.push("Aim for ~250 to 900 words for better readability");
  }

  const achievementSignals = ["improved", "increased", "reduced", "%", "led", "built", "delivered", "launched"];
  const achievementsCount = achievementSignals.filter((signal) => lower.includes(signal)).length;
  if (achievementsCount >= 3) {
    score += 15;
    reasons.push("Achievement-oriented language found (+15)");
  } else {
    reasons.push("Use measurable impact (%, numbers, outcomes)");
  }

  return {
    score: Math.min(score, 100),
    reasons,
    foundSections: foundSections.map(([section]) => section)
  };
};

const suggestImprovements = (resumeText, analysis, skills) => {
  const suggestions = [];
  const lower = resumeText.toLowerCase();

  if (!/[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/.test(resumeText)) {
    suggestions.push("Add a professional email address in the header.");
  }

  if (!/(\+?\d[\d\s()-]{8,}\d)/.test(resumeText)) {
    suggestions.push("Include a reachable phone number with country code.");
  }

  if (!analysis.foundSections.includes("summary")) {
    suggestions.push("Add a 2-4 line professional summary tailored to your target role.");
  }

  if (!analysis.foundSections.includes("projects")) {
    suggestions.push("Add a Projects section with tools used and impact.");
  }

  if (skills.length < 6) {
    suggestions.push("Add more role-specific technical skills and tools.");
  }

  if (!lower.includes("%") && !lower.includes("increased") && !lower.includes("reduced")) {
    suggestions.push("Quantify impact, for example: increased conversion by 18%.");
  }

  if (tokenize(resumeText).length < 220) {
    suggestions.push("Your resume is short; add deeper details for recent experience and outcomes.");
  }

  if (analysis.score < 70) {
    suggestions.push("Reorder content so the strongest achievements appear in the top half of page 1.");
  }

  return unique(suggestions).slice(0, 8);
};

const matchWithJobDescription = (resumeText, jobDescription) => {
  if (!jobDescription.trim()) {
    return {
      matchScore: 0,
      commonKeywords: [],
      missingKeywords: [],
      note: "Add a job description to calculate a match score."
    };
  }

  const resumeTokens = unique(tokenize(resumeText));
  const jdTokens = unique(tokenize(jobDescription)).filter((token) => token.length > 2);

  const resumeTokenSet = new Set(resumeTokens);
  const commonKeywords = jdTokens.filter((token) => resumeTokenSet.has(token));
  const missingKeywords = jdTokens.filter((token) => !resumeTokenSet.has(token));

  const matchScore = jdTokens.length ? Math.round((commonKeywords.length / jdTokens.length) * 100) : 0;

  return {
    matchScore,
    commonKeywords: unique(commonKeywords).slice(0, 20),
    missingKeywords: unique(missingKeywords).slice(0, 20),
    note: "Match score is based on keyword overlap with the provided job description."
  };
};

const buildCandidateSummary = (resumeText, skills, analysis, matchData) => {
  const lines = resumeText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const nameLikeLine = lines.find((line) => /^[A-Za-z][A-Za-z\s.'-]{3,40}$/.test(line));
  const candidateName = nameLikeLine || "Candidate";

  const topSkills = skills.slice(0, 6).join(", ") || "general professional skills";

  return `${candidateName} has a resume quality score of ${analysis.score}/100 and demonstrates strengths in ${topSkills}. The profile includes ${analysis.foundSections.length} key resume sections and currently has a ${matchData.matchScore}% keyword match against the provided job description. Overall, this candidate shows a ${analysis.score >= 75 ? "strong" : analysis.score >= 60 ? "moderate" : "developing"} fit, and can improve further by addressing the highlighted missing keywords and enhancement suggestions.`;
};

const ResumeAnalyzer = () => {
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const analysisOutput = useMemo(() => {
    if (!hasAnalyzed || !resumeText.trim()) {
      return null;
    }

    const skills = extractSkills(resumeText);
    const resumeQuality = calculateResumeScore(resumeText, skills);
    const matchData = matchWithJobDescription(resumeText, jobDescription);
    const suggestions = suggestImprovements(resumeText, resumeQuality, skills);
    const candidateSummary = buildCandidateSummary(resumeText, skills, resumeQuality, matchData);

    return {
      skills,
      resumeQuality,
      matchData,
      suggestions,
      candidateSummary
    };
  }, [hasAnalyzed, resumeText, jobDescription]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    setErrorMessage("");

    if (!file) {
      return;
    }

    setResumeFileName(file.name);

    const canReadAsText =
      file.type.startsWith("text/") ||
      /\.(txt|md|rtf|json|csv)$/i.test(file.name) ||
      file.type === "";

    if (!canReadAsText) {
      setErrorMessage("This file type may not be readable in-browser. Upload a TXT/MD/RTF file or paste resume text manually.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setResumeText(String(loadEvent.target?.result || ""));
    };
    reader.onerror = () => {
      setErrorMessage("Could not read this file. Please paste resume content manually.");
    };
    reader.readAsText(file);
  };

  const handleAnalyze = () => {
    if (!resumeText.trim()) {
      setErrorMessage("Please upload a resume or paste resume text before analyzing.");
      return;
    }

    setErrorMessage("");
    setAiSummary("");
    setHasAnalyzed(true);

    const skills = extractSkills(resumeText);
    const resumeQuality = calculateResumeScore(resumeText, skills);
    const matchData = matchWithJobDescription(resumeText, jobDescription);

    const nextEntry = {
      id: Date.now(),
      analyzedAt: new Date().toISOString(),
      fileName: resumeFileName || "Pasted Resume",
      score: resumeQuality.score,
      matchScore: matchData.matchScore,
      skills: skills.slice(0, 8)
    };

    const updated = [nextEntry, ...analysisHistory].slice(0, 10);
    setAnalysisHistory(updated);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  const applyHistoryItem = (item) => {
    setResumeFileName(item.fileName || "");
    setHasAnalyzed(false);
  };

  const generateAISummary = async () => {
    if (!analysisOutput) {
      setErrorMessage("Run analysis before generating an AI summary.");
      return;
    }

    const endpoint = process.env.REACT_APP_RESUME_AI_ENDPOINT;
    if (!endpoint) {
      setErrorMessage("AI endpoint is not configured. Set REACT_APP_RESUME_AI_ENDPOINT in your environment.");
      return;
    }

    setErrorMessage("");
    setAiLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          extractedSkills: analysisOutput.skills,
          score: analysisOutput.resumeQuality.score,
          matchScore: analysisOutput.matchData.matchScore
        })
      });

      if (!response.ok) {
        throw new Error("AI summary request failed");
      }

      const data = await response.json();
      setAiSummary(data.summary || "No summary returned from endpoint.");
    } catch (error) {
      setErrorMessage("Could not generate AI summary from endpoint.");
    } finally {
      setAiLoading(false);
    }
  };

  const scoreColor =
    analysisOutput?.resumeQuality.score >= 80
      ? "text-green-600"
      : analysisOutput?.resumeQuality.score >= 60
        ? "text-amber-600"
        : "text-red-600";

  return (
    <HelmetProvider>
      <Helmet>
        <title>AI Resume Analyzer | Aidifys</title>
        <meta
          name="description"
          content="Analyze your resume with AI-style insights: skills extraction, quality scoring, job description matching, and candidate summary generation."
        />
      </Helmet>

      <section className="bg-gradient-to-b from-sky-50 to-white min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900">AI Resume Analyzer</h1>
            <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
              Upload your resume, extract skills, score profile quality, compare with a job description, and generate a concise candidate summary.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Resume Input</h2>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Upload Resume (TXT/MD/RTF)
              </label>
              <input
                type="file"
                accept=".txt,.md,.rtf,.json,.csv,text/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-slate-700 file:mr-3 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
              />
              {resumeFileName && <p className="text-xs text-slate-500 mt-2">Selected: {resumeFileName}</p>}

              <label className="block text-sm font-medium text-slate-700 mt-5 mb-2">
                Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                rows={10}
                placeholder="Paste resume content here if file upload is unavailable."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />

              <label className="block text-sm font-medium text-slate-700 mt-5 mb-2">
                Job Description (Optional for Match Score)
              </label>
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                rows={8}
                placeholder="Paste target job description to compare with the resume."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />

              {errorMessage && (
                <p className="mt-3 text-sm text-red-600 font-medium">{errorMessage}</p>
              )}

              <button
                onClick={handleAnalyze}
                className="mt-5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg px-6 py-2.5 transition-colors"
              >
                Analyze Resume
              </button>

              <div className="mt-8 border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-800">Recent Analyses</h3>
                  {analysisHistory.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Clear History
                    </button>
                  )}
                </div>

                {analysisHistory.length === 0 ? (
                  <p className="text-sm text-slate-500 mt-2">No saved analyses yet.</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {analysisHistory.map((item) => (
                      <li
                        key={item.id}
                        className="border border-slate-200 rounded-lg p-2.5 flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-700">{item.fileName}</p>
                          <p className="text-xs text-slate-500">
                            Score: {item.score}/100 | Match: {item.matchScore}%
                          </p>
                        </div>
                        <button
                          onClick={() => applyHistoryItem(item)}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded"
                        >
                          Select
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Analysis Results</h2>

              {!analysisOutput ? (
                <div className="h-full flex items-center justify-center text-slate-500 text-center">
                  Run analysis to see extracted skills, quality score, improvement suggestions, job match, and summary.
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-800">Extracted Skills</h3>
                    {analysisOutput.skills.length ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {analysisOutput.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs md:text-sm bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 mt-2">No known skills detected yet.</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">Resume Quality Score</h3>
                    <p className={`text-3xl font-bold mt-1 ${scoreColor}`}>
                      {analysisOutput.resumeQuality.score}/100
                    </p>
                    <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
                      {analysisOutput.resumeQuality.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">Job Description Match</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {analysisOutput.matchData.matchScore}%
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{analysisOutput.matchData.note}</p>
                    <p className="text-sm text-slate-700 mt-2">
                      <span className="font-medium">Matched Keywords:</span>{" "}
                      {analysisOutput.matchData.commonKeywords.length
                        ? analysisOutput.matchData.commonKeywords.join(", ")
                        : "None"}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      <span className="font-medium">Missing Keywords:</span>{" "}
                      {analysisOutput.matchData.missingKeywords.length
                        ? analysisOutput.matchData.missingKeywords.join(", ")
                        : "None"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">Improvement Suggestions</h3>
                    <ul className="mt-2 text-sm text-slate-700 list-disc pl-5 space-y-1">
                      {analysisOutput.suggestions.map((suggestion) => (
                        <li key={suggestion}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">Candidate Summary</h3>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                      {analysisOutput.candidateSummary}
                    </p>

                    <button
                      onClick={generateAISummary}
                      disabled={aiLoading}
                      className="mt-3 bg-slate-900 hover:bg-black disabled:opacity-70 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
                    >
                      {aiLoading ? "Generating AI Summary..." : "Generate AI Summary from API"}
                    </button>

                    {aiSummary && (
                      <p className="mt-3 text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-lg p-3 border border-slate-200">
                        {aiSummary}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default ResumeAnalyzer;
