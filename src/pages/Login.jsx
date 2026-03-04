import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if(email.trim()==="" || password.trim()===""){
      alert("Please enter Email and Password");
      return;
    }

    /* Evaluator Login */

    if(role === "Evaluator"){

      if(
        email === "160623733160@gmail.com" &&
        password === "160623733160"
      ){
        navigate("/evaluator");
      }
      else{
        alert("Invalid Evaluator Credentials");
      }

      return;
    }

    /* User / Student Login */

    if(role === "User"){
      navigate("/problems");
      return;
    }

    alert("Please select a role");

  };


  return (

    <div className="login-container-page">

      <h1 className="login-title">
        TS-MSME Portal Login
      </h1>

      <div className="login-box">

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >

            <option value="">
              Please Select User Role
            </option>

            <option value="User">
              User
            </option>

            <option value="Evaluator">
              Evaluator
            </option>

          </select>

          <p className="forgot">
            Forgot Your Password?
          </p>

          <button
            type="submit"
            className="submit-btn"
          >
            Submit
          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;