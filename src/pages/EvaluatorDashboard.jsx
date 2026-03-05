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

return(

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
<th>View Analysis</th>

</tr>

</thead>

<tbody>

{submissions.length === 0 ? (
<tr>
<td colSpan="4" style={{ textAlign: "center", padding: "18px" }}>
No submissions yet.
</td>
</tr>
) : (
submissions.map((item)=>(
<tr key={item.id}>

<td>{item.problemId ?? item.id}</td>

<td>{item.leader}</td>

<td>{item.college}</td>

<td>

<EvaluateButton
teamName={item.leader}
problemStatement={item.problemStatement || "Problem statement not available"}
abstract={item.abstract || "Abstract not available"}
/>

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
