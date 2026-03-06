import { useEffect, useState } from "react";
import EvaluateButton from "../components/EvaluateButton";
import "./evaluator.css";

function EvaluatorDashboard() {

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const loadSubmissions = () => {
      const stored = JSON.parse(localStorage.getItem("submissions")) || [];
      setSubmissions(stored);
    };

    loadSubmissions();

    // Keeps dashboard synced when localStorage changes in another tab/window.
    window.addEventListener("storage", loadSubmissions);
    return () => window.removeEventListener("storage", loadSubmissions);
  }, []);

  const updateSubmissionReport = (submissionId, report) => {
    const stored = JSON.parse(localStorage.getItem("submissions")) || [];

    const updated = stored.map(item => {
      if (item.id !== submissionId) {
        return item;
      }

      return {
        ...item,
        aiReport: report,
        aiStatus: "Completed",
        aiError: "",
        score: report?.overallScore ?? "-",
        status: "AI Reviewed"
      };
    });

    localStorage.setItem("submissions", JSON.stringify(updated));
    setSubmissions(updated);
  };

  return (

    <div className="eval-container">

      <h1 className="eval-title">
        TS-MSME Evaluation Dashboard
      </h1>

      <h2 className="section-title">
        Student Level Evaluation
      </h2>

      <table className="eval-table">

        <thead>

          <tr>

            <th>Problem ID</th>
            <th>Team Leader</th>
            <th>College</th>
            <th>AI Score</th>
            <th>AI Status</th>
            <th>AI Judge Report</th>

          </tr>

        </thead>

        <tbody>

          {submissions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "18px" }}>
                No submissions yet.
              </td>
            </tr>
          ) : (
            submissions.map((item) => (
              <tr key={item.id}>

                <td>{item.problemId ?? item.id}</td>

                <td>{item.leader}</td>

                <td>{item.college}</td>

                <td>{item.aiReport?.overallScore ?? "-"}</td>

                <td>{item.aiStatus || "Pending"}</td>

                <td>

                  <EvaluateButton
                    teamName={item.leader}
                    problemStatement={item.problemStatement || "Problem statement not available"}
                    abstract={item.abstract || "Abstract not available"}
                    pptContent={item.pptText || ""}
                    initialReport={item.aiReport || null}
                    onEvaluationComplete={(report) => updateSubmissionReport(item.id, report)}
                  />

                  {item.aiError && (
                    <p style={{ color: "#b91c1c", marginTop: "8px", marginBottom: 0 }}>
                      {item.aiError}
                    </p>
                  )}

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>

  );

}

export default EvaluatorDashboard;
