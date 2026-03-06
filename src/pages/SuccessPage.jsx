import { useState } from "react";
import EvaluateButton from "../components/EvaluateButton";

function SuccessPage() {

  const [pptFile, setPptFile] = useState(null);
  const [abstract, setAbstract] = useState("");

  const teamName = "Test Team";
  const problemStatement = "Blockchain for MSME Supply Chain Transparency";

  return (
    <div className="container mt-4">

      <h2>Application Submitted Successfully</h2>

      <h4 className="mt-4">Abstract</h4>

      <textarea
        className="form-control"
        rows="5"
        placeholder="Enter abstract..."
        onChange={(e) => setAbstract(e.target.value)}
      />

      <h4 className="mt-4">Upload PPT</h4>

      <input
        type="file"
        accept=".pptx"
        onChange={(e) => setPptFile(e.target.files[0])}
      />

      <div className="mt-4">
        <EvaluateButton
          teamName={teamName}
          problemStatement={problemStatement}
          abstract={abstract}
          pptFile={pptFile}
        />
      </div>

    </div>
  );
}

export default SuccessPage;
