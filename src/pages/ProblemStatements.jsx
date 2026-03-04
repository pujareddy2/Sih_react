import { useState } from "react";
import { Link } from "react-router-dom";
import problemData from "../data/problemData";
import "./problemstatements.css";

function ProblemStatements() {

const [category,setCategory] = useState("");
const [theme,setTheme] = useState("");
const [currentPage,setCurrentPage] = useState(1);

const problemsPerPage = 10;


/* FILTER LOGIC */

const filteredProblems = problemData.filter((p)=>{

return (
(category === "" || p.category === category) &&
(theme === "" || p.theme === theme)
);

});


/* PAGINATION */

const indexOfLast = currentPage * problemsPerPage;
const indexOfFirst = indexOfLast - problemsPerPage;

const currentProblems = filteredProblems.slice(indexOfFirst,indexOfLast);

const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);



return(

<div className="ps-container">

<h1 className="ps-title">
TS-MSME Problem Statements
</h1>


{/* Download Template */}

<div className="template-box">

<a
href="/template/template.pptx"
download
className="template-btn"
>

Download PPT Template

</a>

</div>


{/* Filters */}

<div className="filters">

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option value="">Select Category</option>
<option value="Software">Software</option>
<option value="Hardware">Hardware</option>
<option value="Miscellaneous">Miscellaneous</option>

</select>


<select
value={theme}
onChange={(e)=>setTheme(e.target.value)}
>

<option value="">Select Theme</option>
<option value="Artificial Intelligence">Artificial Intelligence</option>
<option value="Agriculture">Agriculture</option>
<option value="Cyber Security">Cyber Security</option>
<option value="Smart Cities">Smart Cities</option>
<option value="FinTech">FinTech</option>
<option value="Health Tech">Health Tech</option>

</select>

</div>



{/* TABLE */}

<table className="ps-table">

<thead>

<tr>

<th>S.No</th>
<th>Problem Title</th>
<th>Category</th>
<th>Theme</th>
<th>Deadline</th>
<th>Submissions</th>
<th>Action</th>

</tr>

</thead>


<tbody>

{currentProblems.map((p,index)=>(
<tr key={p.id}>

<td>{indexOfFirst + index + 1}</td>

<td>{p.title}</td>

<td>{p.category}</td>

<td>{p.theme}</td>

<td>{p.deadline}</td>

<td>{p.submissions}/{p.max}</td>

<td>

<Link to={`/problems/${p.id}`}>

<button className="view-btn">

View

</button>

</Link>

</td>

</tr>
))}

</tbody>

</table>



{/* Pagination */}

<div className="pagination">

{[...Array(totalPages)].map((_,i)=>(

<button
key={i}
className={`page-btn ${currentPage===i+1 ? "active":""}`}
onClick={()=>setCurrentPage(i+1)}
>

{i+1}

</button>

))}

</div>

</div>

);

}

export default ProblemStatements;