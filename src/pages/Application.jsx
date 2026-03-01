
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./application.css";

function Application() {
  const navigate = useNavigate();

  const [solution, setSolution] = useState("");
  const [file, setFile] = useState(null);

  const [members, setMembers] = useState([
    {
      name: "",
      email: "",
      mobile: "",
      gender: "",
      college: "",
      course: "",
      rollno: "",
    },
  ]);

  /* ADD MEMBER */

  const addMember = () => {
    if (members.length >= 5) {
      alert("Maximum 5 Members Allowed");
      return;
    }

    setMembers([
      ...members,
      {
        name: "",
        email: "",
        mobile: "",
        gender: "",
        college: "",
        course: "",
        rollno: "",
      },
    ]);
  };

  /* MEMBER UPDATE */

  const handleChange = (index, field, value) => {
    const temp = [...members];

    temp[index][field] = value;

    setMembers(temp);
  };

  /* PPT VALIDATION */

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    const name = selected.name.toLowerCase();

    if (!name.endsWith(".ppt") && !name.endsWith(".pptx")) {
      alert("Only PPT files (.ppt or .pptx) allowed");

      e.target.value = "";

      return;
    }

    setFile(selected);
  };

  /* VALIDATION */

  const allMembersFilled = () => {
    for (let m of members) {
      if (
        m.name.trim() === "" ||
        m.email.trim() === "" ||
        m.mobile.trim() === "" ||
        m.gender === "" ||
        m.college.trim() === "" ||
        m.course.trim() === "" ||
        m.rollno.trim() === ""
      ) {
        return false;
      }
    }

    return true;
  };

  const isFormValid = () => {
    return (
      members.length > 0 &&
      allMembersFilled() &&
      solution.trim() !== "" &&
      file !== null
    );
  };

  /* SUBMIT */

  const submitForm = () => {
    if (!allMembersFilled()) {
      alert("Please fill ALL member details");
      return;
    }

    if (solution.trim() === "") {
      alert("Please enter Abstract");
      return;
    }

    if (file === null) {
      alert("Please upload PPT");
      return;
    }

    navigate("/confirmation", {
      state: {
        members: members,

        solution: solution,
      },
    });
  };

  return (
    <div>
      
      <div className="applicationPage">
        <h2 className="teamTitle">Team Members Details</h2>

        <table className="teamTable">
          <thead>
            <tr>
              <th>Field</th>

              {members.map((m, index) => (
                <th key={index}>
                  {index === 0 ? "Leader" : "Member " + (index + 1)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="fieldColumn">Name</td>

              {members.map((m, index) => (
                <td key={index}>
                  <input
                    placeholder="Full Name"
                    value={m.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="fieldColumn">Email</td>

              {members.map((m, index) => (
                <td key={index}>
                  <input
                    placeholder="Email"
                    value={m.email}
                    onChange={(e) =>
                      handleChange(index, "email", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="fieldColumn">Mobile</td>

              {members.map((m, index) => (
                <td key={index}>
                  <input
                    placeholder="Mobile"
                    value={m.mobile}
                    onChange={(e) =>
                      handleChange(index, "mobile", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="fieldColumn">Gender</td>

              {members.map((m, index) => (
                <td key={index}>
                  <select
                    value={m.gender}
                    onChange={(e) =>
                      handleChange(index, "gender", e.target.value)
                    }
                  >
                    <option value="">Gender</option>

                    <option>Male</option>

                    <option>Female</option>
                  </select>
                </td>
              ))}
            </tr>

            <tr>
              <td className="fieldColumn">College Name</td>

              {members.map((m, index) => (
                <td key={index}>
                  <input
                    placeholder="College Name"
                    value={m.college}
                    onChange={(e) =>
                      handleChange(index, "college", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="fieldColumn">Course (Branch)</td>

              {members.map((m, index) => (
                <td key={index}>
                  <input
                    placeholder="Ex: B.E.(CSE)"
                    value={m.course}
                    onChange={(e) =>
                      handleChange(index, "course", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="fieldColumn">Roll No</td>

              {members.map((m, index) => (
                <td key={index}>
                  <input
                    placeholder="Roll Number"
                    value={m.rollno}
                    onChange={(e) =>
                      handleChange(index, "rollno", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className="addMemberDiv">
          <button className="addBtn" onClick={addMember}>
            + Add Member
          </button>
        </div>

        <div className="leaderNote">
          Note: First Member Is Team Leader. It is recommended to include at
          least 1 female member in each team.
        </div>

        <div className="solutionBox">
          <h3>Abstract (0–5000 Words)</h3>

          <textarea
            maxLength="5000"
            placeholder="Enter Abstract Here"
            onChange={(e) => setSolution(e.target.value)}
          />
        </div>

        <div className="uploadWrapper">
          <h3>Upload PPT</h3>

          <input
            className="fileInput"
            type="file"
            accept=".ppt,.pptx"
            onChange={handleFileChange}
          />

          <p className="pptNote">
            Note: PPT must be uploaded in the given template format only.
          </p>
        </div>

        <button
          className="submitBtn"
          onClick={submitForm}
          disabled={!isFormValid()}
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}

export default Application;
