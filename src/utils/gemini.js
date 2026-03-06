const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function clampScore(value) {
  const score = Number(value);

  if (Number.isNaN(score)) {
    return 0;
  }

  return Math.max(0, Math.min(10, Math.round(score)));
}

function parseResponseJson(rawText) {
  if (!rawText) {
    throw new Error("Empty AI response");
  }

  const cleaned = rawText.replace(/```json|```/gi, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
      throw new Error("AI response is not valid JSON");
    }

    const jsonChunk = cleaned.slice(firstBrace, lastBrace + 1);
    return JSON.parse(jsonChunk);
  }
}

function normalizeEvaluation(parsed) {
  const problemSolutionFit = clampScore(parsed.problemSolutionFit);
  const innovation = clampScore(parsed.innovation);
  const feasibility = clampScore(parsed.feasibility);
  const clarityOfExplanation = clampScore(
    parsed.clarityOfExplanation ?? parsed.clarity
  );

  const computedOverall =
    (problemSolutionFit + innovation + feasibility + clarityOfExplanation) / 4;

  const overallScore = clampScore(parsed.overallScore ?? parsed.overall ?? computedOverall);

  return {
    problemSolutionFit,
    innovation,
    feasibility,
    clarityOfExplanation,
    overallScore,
    relevance: parsed.relevance || "Unknown",
    qualificationDecision: parsed.qualificationDecision || "Needs Judge Review",
    summary: parsed.summary || "No summary returned by AI."
  };
}

export async function callGemini(systemPrompt, userMessage) {
  if (!GROQ_API_KEY) {
    throw new Error("REACT_APP_GROQ_API_KEY is missing in environment variables.");
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 1200,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data?.error?.message || "Groq API request failed.");
  }

  return data.choices?.[0]?.message?.content || "";
}

export async function evaluateSubmission({
  teamName = "Unknown Team",
  problemStatement = "",
  abstract = "",
  pptContent = ""
}) {
  const systemPrompt = `You are an expert hackathon evaluator.
You will assess whether a team solution is relevant to the problem statement and whether slide content supports the abstract.
Return ONLY valid JSON with this exact schema:
{
  "problemSolutionFit": <integer 0-10>,
  "innovation": <integer 0-10>,
  "feasibility": <integer 0-10>,
  "clarityOfExplanation": <integer 0-10>,
  "overallScore": <integer 0-10>,
  "relevance": "<Relevant | Partially Relevant | Not Relevant>",
  "qualificationDecision": "<Qualified | Borderline | Not Qualified>",
  "summary": "<2-3 concise sentences>"
}`;

  const userMessage = `Team Name:
${teamName}

Problem Statement:
${problemStatement}

Team Abstract:
${abstract}

Extracted PPT Content:
${pptContent || "No PPT text extracted."}`;

  const rawResponse = await callGemini(systemPrompt, userMessage);
  const parsed = parseResponseJson(rawResponse);

  return normalizeEvaluation(parsed);
}
