import ai from "../config/gemini.config.js";
import AppError from "../utils/app-error.js";
import { aiReceiptExtractionSchema } from "../validators/ai-receipt.validator.js";

const RECEIPT_SCAN_PROMPT = `
You are a financial receipt extraction assistant.

Read the receipt image and extract transaction details.

Return ONLY valid JSON.
Do not return markdown.
Do not wrap response in triple backticks.
Do not add explanation.

Required JSON shape:
{
  "type": "expense",
  "amount": number,
  "category": "Food | Travel | Shopping | Bills | Rent | Entertainment | Healthcare | Education | Other",
  "description": "short useful description",
  "date": "YYYY-MM-DD",
  "paymentMethod": "cash | card | upi | bank_transfer | wallet | other",
  "merchant": "merchant or shop name if visible",
  "confidence": number between 0 and 1
}

Rules:
- type must always be "expense".
- amount must be the final payable amount.
- If date is unclear, use today's date.
- If category is unclear, use "Other".
- If payment method is unclear, use "other".
- Keep description short.
`;

const getTodayDateString = () => {
  return new Date().toISOString().split("T")[0];
};

const extractJsonFromAiText = (text) => {
  const cleanedText = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);

  const jsonText = jsonMatch ? jsonMatch[0] : cleanedText;

  try {
    return JSON.parse(jsonText);
  } catch (error) {
    throw new AppError("AI returned an invalid JSON response.", 502);
  }
};

const formatDateOnly = (date) => {
  return date.toISOString().split("T")[0];
};

export const scanReceiptImage = async (file) => {
  if (!file) {
    throw new AppError("Receipt image is required.", 400);
  }

  const base64Image = file.buffer.toString("base64");

  let response;

try {
  response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: file.mimetype,
          data: base64Image,
        },
      },
      {
        text: `${RECEIPT_SCAN_PROMPT}\nToday's date is ${getTodayDateString()}.`,
      },
    ],
    config: {
      responseMimeType: "application/json",
    },
  });
} catch (error) {
  if (error?.status === 429 || error?.message?.includes("quota")) {
    throw new AppError(
      "Gemini API quota exceeded. Please check your Gemini API key, billing, or rate limits.",
      429
    );
  }

  throw new AppError("Failed to scan receipt using Gemini AI.", 502);
}

  const aiText = response.text;

  if (!aiText) {
    throw new AppError("AI did not return any receipt data.", 502);
  }

  const parsedAiData = extractJsonFromAiText(aiText);

  const validationResult = aiReceiptExtractionSchema.safeParse(parsedAiData);

  if (!validationResult.success) {
    const error = new AppError("AI extracted receipt data is invalid.", 422);

    error.errors = validationResult.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    throw error;
  }

  const extractedData = validationResult.data;

  return {
    type: "expense",
    amount: extractedData.amount,
    category: extractedData.category,
    description: extractedData.description,
    date: formatDateOnly(extractedData.date),
    paymentMethod: extractedData.paymentMethod,
    merchant: extractedData.merchant,
    confidence: extractedData.confidence,
  };
};