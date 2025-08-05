'use server'

import PdfParse from "pdf-parse";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { imagekit } from "../imagekit";

export const uploadPDFMain = async (formData: FormData) => {
  try {
    const file = formData.get('pdf') as File;
    if (!file) throw new Error('No file provided');

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: '/pdfs/',
    });
    console.log('PDF uploaded to ImageKit:', uploadResult);

    const pdfData = await PdfParse(buffer);
    const pdfText = pdfData.text;

  const prompt = `
You are Ava, an expert document intelligence assistant for real estate contracts. Your job is to deeply analyze the content of this PDF and extract structured, complete, and clean JSON data — only based on what is explicitly written in the document.

Output exactly in the following format (valid JSON, no markdown or annotations):

{
  "accordion": [
    { "question": "string", "answer": "string", "page": number }
  ],
  "tables": [
    {
      "title": "string",
      "headers": ["string", ...],
      "rows": [["string", ...]],
      "page": number
    }
  ],
  "timeline": [
    {
      "milestone": "string",
      "date": "YYYY-MM-DD" | "TBD",
      "description": "string",
      "page": number
    }
  ],
  "summary": "Short summary of the document in plain, simple language — 3 to 5 sentences.",
  "tasks": [
    {
      "title": "string",
      "dueDate": "YYYY-MM-DD" | "TBD",
      "priority": "High" | "Medium" | "Low",
      "linkedMilestone": "string",
      "page": number
    }
  ],
  "deadlines": [
    {
      "name": "string",
      "deadline": "YYYY-MM-DD" | "TBD",
      "relatedTask": "string",
      "page": number
    }
  ]
}

Guidelines:
- Include deadlines like offer acceptance, inspection period, closing, financing contingency, etc.
- If a date is missing, shown as blank, or says “{Insert Date}” or similar — use "TBD" as its value.
- Do not skip timeline or deadline entries if a date is missing.
- Prefer precise language from the document. Do not paraphrase legal terms.
- Include page numbers if they can be determined from the context.
- Group all items correctly under their schema fields.
- Return an empty array for any section not found.
- Do not include markdown, triple backticks, or extra notes.

Now extract structured data from the following PDF content:
${pdfText}
`



    const response = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
      abortSignal: AbortSignal.timeout(30000), // 30 second timeout
    });

    const rawText = response.text.trim()
    const cleanedText = rawText.replace(/^```json|^```|```$/gim, '').trim()
    const structuredData = JSON.parse(cleanedText)
    console.log(structuredData)

    return { success: true, url: uploadResult.url, structuredData };

  } catch (error: any) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error during PDF processing:', message);
    throw new Error(`JSON parse error: ${message}`);
  }
};
