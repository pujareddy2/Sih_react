import { Link } from "react-router-dom";
import problemData from "../data/problemData";

function ProblemStatements() {
  return (
    <>
      <div className="ps-banner">
        <h1>PROBLEM STATEMENTS</h1>
      </div>

      <div className="ps-table-container">
        <table className="ps-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Organization</th>
              <th>Problem Title</th>
              <th>Category</th>
              <th>Theme</th>
              <th>Deadline</th>
            </tr>
          </thead>

          <tbody>
            {problemData.map((ps, index) => (
              <tr key={ps.id}>
                <td>{index + 1}</td>
                <td>{ps.org}</td>
                <td>
                  <Link to={`/problems/${ps.id}`} className="ps-link">
                    {ps.title}
                  </Link>
                </td>
                <td>{ps.category}</td>
                <td>{ps.theme}</td>
                <td>{ps.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProblemStatements;