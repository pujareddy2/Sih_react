
import { useLocation } from "react-router-dom";
import "./confirmation.css";

function Confirmation() {
  const location = useLocation();
  

  const members = location.state?.members || [];
  const solution = location.state?.solution || "";

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
      </div>
    </div>
  );
}

export default Confirmation;
