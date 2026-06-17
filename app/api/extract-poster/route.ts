import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    const response =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `
Read this event poster and extract:

- title
- description
- venue
- category
- start_date
- end_date
- start_time
- end_time

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT wrap the response in \`\`\`json.
4. Dates must be in YYYY-MM-DD format.
5. Times must be in HH:MM format (24-hour format).
6. If the poster explicitly mentions a year, use that exact year.
7. If the poster does NOT mention a year, assume the current year is 2026.
8. If end_date is not mentioned, use start_date.
9. If end_time is not mentioned, use start_time.
10. Category must be one of:
   - Workshop
   - Hackathon
   - Placement
   - Seminar
   - Club Event
   - Sports

Examples:

June 15 → 2026-06-15
March 23 → 2026-03-23
June 15, 2027 → 2027-06-15
7 PM → 19:00
8:30 PM → 20:30

Return JSON in exactly this format:

{
  "title": "",
  "description": "",
  "venue": "",
  "category": "",
  "start_date": "",
  "end_date": "",
  "start_time": "",
  "end_time": ""
}
                `,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      });

    return NextResponse.json({
      result:
        response.choices[0]?.message?.content,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to extract poster data",
      },
      {
        status: 500,
      }
    );
  }
}