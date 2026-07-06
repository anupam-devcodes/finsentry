import ai from "../config/gemini.config.js";
import AppError from "../utils/app-error.js";
import { aiReceiptExtractionSchema } from "../validators/ai-receipt.validator.js";

const RECEIPT_SCAN_PROMPT = `
You are a financial receipt extraction assistant.

Your job is to read the receipt image, identify visible line items, classify them into financial spending categories, and return reviewable transaction drafts.

Return ONLY valid JSON.
Do not return markdown.
Do not wrap response in triple backticks.
Do not add explanation.

Required JSON shape:
{
  "transactions": [
    {
      "type": "expense",
      "amount": number,
      "category": "Food | Grocery | Clothing | Travel | Shopping | Bills | Rent | Entertainment | Healthcare | Education | Other",
      "description": "short useful description",
      "date": "YYYY-MM-DD",
      "paymentMethod": "cash | card | upi | bank_transfer | wallet | other",
      "merchant": "merchant or shop name if visible",
      "confidence": number between 0 and 1
    }
  ],
  "receiptSummary": "short summary of what was extracted and how items were grouped"
}

Important category meanings:
- Food: restaurant meals, snacks, cooked food, takeaway, cafe, dining.
- Grocery: edible grocery items, supermarket food staples, fruits, vegetables, dairy, packaged food.
- Clothing: clothes, shoes, apparel, fashion items.
- Shopping: household supplies, toiletries, baby wipes, toilet paper, cosmetics, electronics, general non-food retail items.
- Bills: electricity, water, internet, phone, subscriptions, utilities.
- Healthcare: medicines, pharmacy, medical items.
- Education: books, stationery, courses, school or study items.
- Travel: fuel, taxi, public transport, hotel, flights, parking.
- Entertainment: movies, games, events, leisure.
- Rent: rent or accommodation rent.
- Other: only when no category clearly fits.

Rules:
- type must always be "expense".
- First identify the visible receipt line items internally.
- Classify each visible line item into one of the allowed categories.
- Then group line items by category.
- Return one transaction draft per category group.
- If all meaningful items belong to one category, return one transaction only.
- If a supermarket receipt contains both edible grocery items and non-food household/personal-care items, do NOT merge everything into Grocery. Split Grocery and Shopping.
- If a receipt contains clothing, medicine, electronics, stationery, household items, or bills along with groceries/food, return separate category-wise transactions.
- Do not create one transaction for every tiny item. Group by category.
- Use the final payable amount if the receipt belongs to one category.
- For multi-category receipts, split the amount category-wise as accurately as possible from visible item prices.
- The sum of extracted transactions should approximately match the receipt total.
- If item prices are unreadable but categories are clear, estimate category-wise split conservatively.
- If category separation is genuinely unclear, return one transaction with the best matching category.
- If date is unclear, use today's date.
- If payment method is unclear, use "other".
- Keep descriptions short and useful.
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

const normalizeAiResponseShape = (parsedAiData) => {
  if (Array.isArray(parsedAiData)) {
    return {
      transactions: parsedAiData,
      receiptSummary: "",
    };
  }

  if (parsedAiData?.transactions) {
    return parsedAiData;
  }

  return {
    transactions: [parsedAiData],
    receiptSummary: "",
  };
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
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
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
  const normalizedAiData = normalizeAiResponseShape(parsedAiData);

  const validationResult = aiReceiptExtractionSchema.safeParse(normalizedAiData);

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
    receiptSummary: extractedData.receiptSummary,
    transactions: extractedData.transactions.map((transaction) => ({
      type: "expense",
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date: formatDateOnly(transaction.date),
      paymentMethod: transaction.paymentMethod,
      merchant: transaction.merchant,
      confidence: transaction.confidence,
    })),
  };
};