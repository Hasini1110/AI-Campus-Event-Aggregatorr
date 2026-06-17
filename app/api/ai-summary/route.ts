import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Summarize this event in 2-3 lines: ${description}`,
        },
      ],
      max_tokens: 100,
    });

    return NextResponse.json({
      summary:
        response.choices[0]?.message?.content,
    });
  } catch (error) {
    console.log("OPENAI ERROR:");
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}