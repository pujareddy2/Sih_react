import JSZip from "jszip";

function decodeXmlEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

export async function extractPPTText(file) {
  if (!file) {
    throw new Error("No PPT file provided.");
  }

  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith(".ppt")) {
    throw new Error("Legacy .ppt files are not supported for text extraction. Please upload .pptx.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const slideFiles = Object.keys(zip.files)
    .filter(path => /^ppt\/slides\/slide\d+\.xml$/i.test(path))
    .sort((a, b) => {
      const aNum = Number(a.match(/slide(\d+)\.xml/i)?.[1] || 0);
      const bNum = Number(b.match(/slide(\d+)\.xml/i)?.[1] || 0);
      return aNum - bNum;
    });

  if (slideFiles.length === 0) {
    throw new Error("No slide XML files found in PPTX.");
  }

  const slideTexts = await Promise.all(
    slideFiles.map(async slidePath => {
      const xml = await zip.files[slidePath].async("string");
      const matches = [...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)];
      const textParts = matches.map(match => decodeXmlEntities(match[1]).trim()).filter(Boolean);
      return textParts.join("\n");
    })
  );

  return slideTexts.filter(Boolean).join("\n\n").trim();
}
