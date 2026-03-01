import { useParams, useNavigate } from "react-router-dom";
import problemData from "../data/problemData";

function ProblemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const problem = problemData.find(
    (item) => item.id === parseInt(id)
  );

  if (!problem) {
    return <h2 style={{ padding: "80px" }}>Problem Not Found</h2>;
  }

  return (
    <div className="ps-details">
      <h2>{problem.title}</h2>

      <div className="ps-meta">
        <p><strong>Organization:</strong> {problem.org}</p>
        <p><strong>Category:</strong> {problem.category}</p>
        <p><strong>Theme:</strong> {problem.theme}</p>
        <p><strong>Deadline:</strong> {problem.deadline}</p>
      </div>

      <div className="ps-description">
        <h3>Problem Description</h3>
        <p>{problem.description}</p>
      </div>

      <button
        className="apply-btn"
        onClick={() => navigate(`/apply/${id}`)}
      >
        Apply
      </button>
    </div>
  );
}

export default ProblemDetails;