import { useEffect, useState } from "react";
import { extractPPTText } from "../utils/pptParser";
import { evaluateSubmission } from "../utils/gemini";

const DIMENSIONS = [
  { key: "problemSolutionFit", label: "Problem-Solution Fit", color: "#f97316" },
  { key: "innovation", label: "Innovation", color: "#a855f7" },
  { key: "feasibility", label: "Feasibility", color: "#3b82f6" },
  { key: "clarityOfExplanation", label: "Clarity of Explanation", color: "#06b6d4" }
];

function ScoreBar({ score, color }) {
  const safeScore = Number.isFinite(score) ? score : 0;
  const pct = (safeScore / 10) * 100;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
      <div
        style={{
          flex: 1,
          height: "6px",
          background: "#1e293b",
          borderRadius: "99px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            transition: "width 0.7s ease"
          }}
        />
      </div>

      <span
        style={{
          color,
          fontWeight: 800,
          fontSize: "13px",
          minWidth: "34px",
          textAlign: "right"
        }}
      >
        {safeScore}/10
      </span>
    </div>
  );
}

export default function EvaluateButton({
  teamName = "Unknown Team",
  problemStatement = "Problem statement not available",
  abstract = "",
  pptFile = null,
  pptContent = "",
  initialReport = null,
  onEvaluationComplete
}) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(initialReport);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [dots, setDots] = useState(".");

  useEffect(() => {
    setReport(initialReport);
  }, [initialReport]);

  async function handleEvaluate() {
    setLoading(true);
    setError("");

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "." : `${prev}.`));
    }, 500);

    try {
      let extractedPptContent = pptContent || "";

      if (!extractedPptContent && pptFile) {
        extractedPptContent = (await extractPPTText(pptFile)).slice(0, 12000);
      }

      const evaluation = await evaluateSubmission({
        teamName,
        problemStatement,
        abstract,
        pptContent: extractedPptContent
      });

      setReport(evaluation);
      setShowModal(true);

      if (typeof onEvaluationComplete === "function") {
        onEvaluationComplete(evaluation);
      }
    } catch (e) {
      setError(`AI evaluation failed: ${e.message}`);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }

  return (
    <>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={handleEvaluate}
          disabled={loading}
          style={{
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 22px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {loading ? `Analysing${dots}` : report ? "Re-evaluate" : "Evaluate with AI"}
        </button>

        {report && (
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "linear-gradient(135deg,#059669,#047857)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 22px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            AI Judge Report
          </button>
        )}
      </div>

      {error && <p style={{ color: "#dc2626", marginTop: "10px" }}>{error}</p>}

      {showModal && report && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.82)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "min(620px, 92vw)",
              background: "#0f172a",
              borderRadius: "16px",
              padding: "28px"
            }}
          >
            <h2 style={{ color: "#f8fafc", marginBottom: "6px" }}>AI Judge Report</h2>
            <p style={{ color: "#94a3b8", margin: 0 }}>{teamName}</p>

            <div style={{ marginTop: "16px", display: "grid", gap: "10px" }}>
              <div style={{ color: "#e2e8f0", fontWeight: 700 }}>
                Overall Score: {report.overallScore}/10
              </div>
              <div style={{ color: "#cbd5e1" }}>Relevance: {report.relevance}</div>
              <div style={{ color: "#cbd5e1" }}>
                Qualification Decision: {report.qualificationDecision}
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {DIMENSIONS.map(dim => (
                <div key={dim.key} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#cbd5e1", minWidth: "180px" }}>{dim.label}</span>
                  <ScoreBar score={report[dim.key]} color={dim.color} />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "20px",
                background: "#1e293b",
                padding: "14px",
                borderRadius: "10px"
              }}
            >
              <p style={{ color: "#cbd5e1", margin: 0 }}>{report.summary}</p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "20px",
                background: "#334155",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 18px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
