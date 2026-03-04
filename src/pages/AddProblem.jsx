import { useState } from "react";
import { useNavigate } from "react-router-dom";
import problemData from "../data/problemData";
import "./addproblem.css";

function AddProblem(){

const navigate = useNavigate();

const [title,setTitle] = useState("");
const [theme,setTheme] = useState("");
const [category,setCategory] = useState("");
const [deadline,setDeadline] = useState("");

const handleSubmit = () => {

if(title==="" || theme==="" || category==="" || deadline===""){
alert("Please fill all fields");
return;
}

const newProblem = {

id: problemData.length + 1,
title,
category,
theme,
deadline,
submissions:"0 / 100"

};

problemData.push(newProblem);

alert("Problem Statement Added Successfully");

navigate("/problems");

};

return(

<div className="add-problem-page">

<h1>Add Problem Statement</h1>

<div className="form-box">

<input
placeholder="Problem Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<select
value={theme}
onChange={(e)=>setTheme(e.target.value)}
>

<option value="">Select Theme</option>
<option>Artificial Intelligence</option>
<option>Smart Education</option>
<option>Health Tech</option>
<option>Agriculture</option>

</select>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option value="">Select Category</option>
<option>Software</option>
<option>Hardware</option>
<option>Miscellaneous</option>

</select>

<input
type="date"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
/>

<button onClick={handleSubmit}>
Add Problem
</button>

</div>

</div>

);

}

export default AddProblem;