import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./application.css";
import problemData from "../data/problemData";
import { extractPPTText } from "../utils/pptParser";
import { evaluateSubmission } from "../utils/gemini";

function Application() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [solution,setSolution] = useState("");
  const [file,setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [members,setMembers] = useState([
    {
      name:"",
      email:"",
      mobile:"",
      gender:"",
      college:"",
      course:"",
      rollno:""
    }
  ]);

  /* ADD MEMBER */

  const addMember = () => {

    if(members.length >= 5){
      alert("Maximum 5 Members Allowed");
      return;
    }

    setMembers([
      ...members,
      {
        name:"",
        email:"",
        mobile:"",
        gender:"",
        college:"",
        course:"",
        rollno:""
      }
    ]);

  };

  /* UPDATE MEMBER FIELD */

  const handleChange = (index,field,value) => {

    const temp = [...members];
    temp[index][field] = value;
    setMembers(temp);

  };

  /* FILE VALIDATION */

  const handleFileChange = (e) => {

    const selected = e.target.files[0];

    if(!selected) return;

    const name = selected.name.toLowerCase();

    if(!name.endsWith(".pptx")){
      alert("Only PPTX files are supported for AI slide-text extraction");
      e.target.value = "";
      return;
    }

    setFile(selected);

  };

  /* CHECK MEMBER DETAILS */

  const allMembersFilled = () => {

    for(let m of members){

      if(
        m.name.trim()==="" ||
        m.email.trim()==="" ||
        m.mobile.trim()==="" ||
        m.gender==="" ||
        m.college.trim()==="" ||
        m.course.trim()==="" ||
        m.rollno.trim()===""
      ){
        return false;
      }

    }

    return true;

  };

  /* FORM VALIDATION */

  const isFormValid = () => {

    return(
      members.length > 0 &&
      allMembersFilled() &&
      solution.trim() !== "" &&
      file !== null
    );

  };

  /* SUBMIT APPLICATION */

  const submitForm = async () => {

    if(isSubmitting){
      return;
    }

    if(!allMembersFilled()){
      alert("Please fill ALL member details");
      return;
    }

    if(solution.trim()===""){
      alert("Please enter Abstract");
      return;
    }

    if(file===null){
      alert("Please upload PPT");
      return;
    }

    setIsSubmitting(true);

    try{
      /* ---------- Update Problem Submission Count ---------- */

      const problem = problemData.find(p => p.id === parseInt(id, 10));
      const problemStatement = problem?.title || "Unknown Problem";

      if(problem){
        problem.submissions = problem.submissions + 1;
      }

      let pptText = "";
      let parserError = "";

      try{
        pptText = (await extractPPTText(file)).slice(0,12000);
      }catch(error){
        parserError = error?.message || "Could not extract slide text.";
      }

      let aiReport = null;
      let aiStatus = "Failed";
      let aiError = "";

      if(!parserError){
        try{
          aiReport = await evaluateSubmission({
            teamName: members[0].name || "Unknown Team",
            problemStatement,
            abstract: solution,
            pptContent: pptText
          });
          aiStatus = "Completed";
        }catch(error){
          aiError = error?.message || "AI evaluation failed.";
        }
      } else {
        aiError = "PPT text extraction failed, so AI evaluation could not be completed.";
      }

      const finalAiError = [parserError, aiError].filter(Boolean).join(" | ");

      /* ---------- Store submission for evaluator dashboard ---------- */

      const existing = JSON.parse(localStorage.getItem("submissions")) || [];

      const newSubmission = {
        id: Date.now(),
        problemId: Number(id),
        problemStatement,
        leader: members[0].name,
        college: members[0].college,
        abstract: solution,
        pptFileName: file.name,
        pptText,
        aiReport,
        aiStatus,
        aiError: finalAiError,
        score: aiReport ? aiReport.overallScore : "-",
        status: aiReport ? "AI Reviewed" : "Pending AI Review",
        submittedAt: new Date().toISOString()
      };

      existing.push(newSubmission);
      localStorage.setItem("submissions", JSON.stringify(existing));

      /* ---------- Redirect ---------- */

      navigate("/confirmation",{
        state:{
          members:members,
          solution:solution,
          problemStatement,
          aiReport,
          aiStatus,
          aiError: finalAiError
        }
      });
    } finally {
      setIsSubmitting(false);
    }

  };


  return(

    <div className="applicationPage">

      <h2 className="teamTitle">
        Team Members Details
      </h2>

      <table className="teamTable">

        <thead>

          <tr>
            <th>Field</th>

            {members.map((m,index)=>(
              <th key={index}>
                {index===0 ? "Leader" : "Member " + (index+1)}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {/* NAME */}

          <tr>

            <td className="fieldColumn">Name</td>

            {members.map((m,index)=>(
              <td key={index}>
                <input
                  placeholder="Full Name"
                  value={m.name}
                  onChange={(e)=>handleChange(index,"name",e.target.value)}
                />
              </td>
            ))}

          </tr>


          {/* EMAIL */}

          <tr>

            <td className="fieldColumn">Email</td>

            {members.map((m,index)=>(
              <td key={index}>
                <input
                  placeholder="Email"
                  value={m.email}
                  onChange={(e)=>handleChange(index,"email",e.target.value)}
                />
              </td>
            ))}

          </tr>


          {/* MOBILE */}

          <tr>

            <td className="fieldColumn">Mobile</td>

            {members.map((m,index)=>(
              <td key={index}>
                <input
                  placeholder="Mobile"
                  value={m.mobile}
                  onChange={(e)=>handleChange(index,"mobile",e.target.value)}
                />
              </td>
            ))}

          </tr>


          {/* GENDER */}

          <tr>

            <td className="fieldColumn">Gender</td>

            {members.map((m,index)=>(
              <td key={index}>
                <select
                  value={m.gender}
                  onChange={(e)=>handleChange(index,"gender",e.target.value)}
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </td>
            ))}

          </tr>


          {/* COLLEGE */}

          <tr>

            <td className="fieldColumn">College Name</td>

            {members.map((m,index)=>(
              <td key={index}>
                <input
                  placeholder="College Name"
                  value={m.college}
                  onChange={(e)=>handleChange(index,"college",e.target.value)}
                />
              </td>
            ))}

          </tr>


          {/* COURSE */}

          <tr>

            <td className="fieldColumn">Course</td>

            {members.map((m,index)=>(
              <td key={index}>
                <input
                  placeholder="Course (Branch)"
                  value={m.course}
                  onChange={(e)=>handleChange(index,"course",e.target.value)}
                />
              </td>
            ))}

          </tr>


          {/* ROLL NUMBER */}

          <tr>

            <td className="fieldColumn">Roll No</td>

            {members.map((m,index)=>(
              <td key={index}>
                <input
                  placeholder="Roll Number"
                  value={m.rollno}
                  onChange={(e)=>handleChange(index,"rollno",e.target.value)}
                />
              </td>
            ))}

          </tr>

        </tbody>

      </table>


      <div className="addMemberDiv">

        <button
          className="addBtn"
          onClick={addMember}
        >
          + Add Member
        </button>

      </div>


      <div className="leaderNote">
        Note: First Member is Team Leader. Recommended to include at least one female member.
      </div>


      <div className="solutionBox">

        <h3>Abstract (0–5000 Words)</h3>

        <textarea
          maxLength="5000"
          placeholder="Enter Abstract Here"
          onChange={(e)=>setSolution(e.target.value)}
        />

      </div>


      <div className="uploadWrapper">

        <h3>Upload PPT</h3>

        <input
          className="fileInput"
          type="file"
          accept=".pptx"
          onChange={handleFileChange}
        />

        <p className="pptNote">
          PPTX must follow the given template format
        </p>

      </div>


      <button
        className="submitBtn"
        onClick={submitForm}
        disabled={!isFormValid() || isSubmitting}
      >
        {isSubmitting ? "Submitting and running AI evaluation..." : "Submit Application"}
      </button>

    </div>

  );

}

export default Application;
