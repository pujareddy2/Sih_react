import { useState } from "react";
import { useNavigate } from "react-router-dom";
import problemData from "../data/problemData";
import "./problemstatements.css";

function ProblemStatements() {

const navigate = useNavigate();

const [categoryFilter,setCategoryFilter] = useState("");
const [themeFilter,setThemeFilter] = useState("");

/* Problems added by evaluator */

const storedProblems =
JSON.parse(localStorage.getItem("addedProblems")) || [];

/* Merge original + evaluator problems */

const allProblems = [...problemData, ...storedProblems];


/* Filtering Logic */

const filteredProblems = allProblems.filter((problem)=>{

return (
(categoryFilter === "" || problem.category === categoryFilter) &&
(themeFilter === "" || problem.theme === themeFilter)
);

});


return(

<div className="ps-page">

<h1 className="ps-title">
TS-MSME Problem Statements
</h1>


{/* Top Buttons */}

<div className="top-actions">

<a
href="/template/template.pptx"
download
className="template-btn"
>
Download PPT Template
</a>

<button
className="add-problem-btn"
onClick={()=>navigate("/login?source=addproblem")}
>
Add Problem Statement
</button>

</div>


{/* Filters */}

<div className="filters">

<div className="filter-box">

<label>Category</label>

<select
value={categoryFilter}
onChange={(e)=>setCategoryFilter(e.target.value)}
>

<option value="">All</option>
<option value="Software">Software</option>
<option value="Hardware">Hardware</option>
<option value="Miscellaneous">Miscellaneous</option>

</select>

</div>


<div className="filter-box">

<label>Theme</label>

<select
value={themeFilter}
onChange={(e)=>setThemeFilter(e.target.value)}
>

<option value="">All</option>
<option value="Artificial Intelligence">Artificial Intelligence</option>
<option value="Smart Education">Smart Education</option>
<option value="Health Tech">Health Tech</option>
<option value="Agriculture">Agriculture</option>
<option value="Sustainable Development">Sustainable Development</option>

</select>

</div>

</div>


{/* Problem Statements Table */}

<table className="ps-table">

<thead>

<tr>

<th>ID</th>
<th>Problem Statement</th>
<th>Category</th>
<th>Theme</th>
<th>Deadline</th>
<th>Submissions</th>
<th>Action</th>

</tr>

</thead>


<tbody>

{filteredProblems.map((problem)=>(

<tr key={problem.id}>

<td>{problem.id}</td>

<td>{problem.title}</td>

<td>{problem.category}</td>

<td>{problem.theme}</td>

<td>{problem.deadline}</td>

<td>{problem.submissions}</td>

<td>

<button
className="view-btn"
onClick={()=>navigate(`/problems/${problem.id}`)}
>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default ProblemStatements;