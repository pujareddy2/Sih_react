import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role !== "Team Leader") {
      alert("Only Team Leader can apply");
      return;
    }

    navigate("/apply/1"); // temporary id, later we pass real id
  };

  return (
    <div className="login-container-page">
      <h1 className="login-title">SIH Portal Login</h1>

      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <select required onChange={(e) => setRole(e.target.value)}>
            <option value="">Select User Role</option>
            <option>Super Admin</option>
            <option>Review Committee Personnel</option>
            <option>Problem Statement Creators/Challengers</option>
            <option>College/Institute Spoc</option>
            <option>Team Leader</option>
            <option>Evaluator</option>
          </select>

          <p className="forgot">Forgot Your Password?</p>

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;