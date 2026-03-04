import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./evaluator.css";

function EvaluatorDashboard() {

const navigate = useNavigate();

const [submissions,setSubmissions] = useState([]);

useEffect(() => {

const stored = JSON.parse(localStorage.getItem("submissions")) || [];

setSubmissions(stored);

}, []);


/* Evaluate Button Logic */
/* Later backend AI will replace this */

const handleEvaluate = (id) => {

const randomScore = Math.floor(Math.random()*100);

const updated = submissions.map((item)=>{

if(item.id === id){

return{
...item,
score: randomScore,
status: randomScore >= 70 ? "Accepted" : "Rejected"
};

}

return item;

});

setSubmissions(updated);

localStorage.setItem("submissions", JSON.stringify(updated));

};


return(

<div className="eval-container">

<h1 className="eval-title">
TS-MSME Project Evaluation Dashboard
</h1>


{/* Student Level Evaluation */}

<h2 className="section-title">
Student Level Evaluation
</h2>


<table className="eval-table">

<thead>

<tr>

<th>Problem ID</th>
<th>Team Leader</th>
<th>College</th>
<th>Score</th>
<th>Status</th>
<th>View Analysis</th>
<th>Evaluate</th>

</tr>

</thead>


<tbody>

{submissions.map((item)=>(
<tr key={item.id}>

<td>{item.problemId}</td>

<td>{item.leader}</td>

<td>{item.college}</td>

<td className="score">{item.score}</td>

<td>
<span className={`status ${item.status}`}>
{item.status}
</span>
</td>


<td>

<button
className="analysis-btn"
onClick={()=>navigate(`/analysis/${item.problemId}`)}
>
View Analysis
</button>

</td>


<td>

<button
className="evaluate-btn"
onClick={()=>handleEvaluate(item.id)}
>
Evaluate
</button>

</td>

</tr>
))}

</tbody>

</table>



{/* College Level Section */}

<h2 className="section-title">
College Level Performance
</h2>

<table className="college-table">

<thead>

<tr>

<th>Rank</th>
<th>College</th>
<th>Total Teams</th>
<th>Average Score</th>

</tr>

</thead>


<tbody>

<tr>
<td>1</td>
<td>JNTUH</td>
<td>12</td>
<td>85</td>
</tr>

<tr>
<td>2</td>
<td>Osmania University</td>
<td>9</td>
<td>82</td>
</tr>

<tr>
<td>3</td>
<td>CBIT</td>
<td>7</td>
<td>78</td>
</tr>

</tbody>

</table>

</div>

);

}

export default EvaluatorDashboard;