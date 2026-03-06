import { useLocation } from "react-router-dom";
import "./confirmation.css";

function Confirmation() {
  const location = useLocation();
  

  const members = location.state?.members || [];
  const solution = location.state?.solution || "";
  const problemStatement = location.state?.problemStatement || "";
  const aiReport = location.state?.aiReport || null;
  const aiStatus = location.state?.aiStatus || "Pending";
  const aiError = location.state?.aiError || "";

  return (
    <div>
      
      <div className="confirmationPage">
        <h2 className="successTitle">Application Submitted Successfully</h2>

        <h3 className="sectionTitle">Team Members</h3>

        <table className="confirmTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {members.map((m, index) => (
              <tr key={index}>
                <td>{m.name}</td>
                <td>{m.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        

        <h3 className="sectionTitle">Abstract</h3>

        <div className="abstractBox">{solution}</div>

        {problemStatement && (
          <>
            <h3 className="sectionTitle">Problem Statement</h3>
            <div className="abstractBox">{problemStatement}</div>
          </>
        )}

        <h3 className="sectionTitle">AI Evaluation Status</h3>
        <div className="abstractBox">Status: {aiStatus}</div>

        {aiReport && (
          <div className="abstractBox" style={{ marginTop: "10px" }}>
            Overall Score: {aiReport.overallScore}/10
            <br />
            Qualification: {aiReport.qualificationDecision}
            <br />
            Summary: {aiReport.summary}
          </div>
        )}

        {aiError && (
          <div className="abstractBox" style={{ marginTop: "10px", color: "#b91c1c" }}>
            AI Note: {aiError}
          </div>
        )}
      </div>
    </div>
  );
}

export default Confirmation;
