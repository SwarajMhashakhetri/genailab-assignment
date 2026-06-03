import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import { buildPrompt } from "@/lib/prompts";
import type { StoryId, StyleId } from "@/lib/templates";

export const runtime = "nodejs";
// 60s is the ceiling on Vercel's Hobby plan; raise to 300 on Pro if needed.
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "The illustrator isn't connected yet. Add OPENAI_API_KEY to .env.local to bring the magic to life.",
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "We couldn't read your upload. Please try again." },
      { status: 400 }
    );
  }

  const file = form.get("image");
  const story = String(form.get("story") || "") as StoryId;
  const style = String(form.get("style") || "") as StyleId;
  const name = String(form.get("name") || "").slice(0, 40);
  const age = Math.max(1, Math.min(12, Number(form.get("age") || 4)));

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Please add a photo of your child first." },
      { status: 400 }
    );
  }

  const prompt = buildPrompt({ story, style, name, age });

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const image = await toFile(
      Buffer.from(await file.arrayBuffer()),
      file.name || "child.png",
      { type: file.type || "image/png" }
    );

    const result = await openai.images.edit({
      model: "gpt-image-1",
      image,
      prompt,
      // The heart of the likeness: keep the child's face across art styles.
      input_fidelity: "high",
      quality: "high",
      size: "1024x1024",
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error("No image returned");
    }

    return NextResponse.json({ image: `data:image/png;base64,${b64}` });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown illustrator error";
    console.error("[generate] failed:", message);
    return NextResponse.json(
      {
        error:
          "Our illustrator got a little overwhelmed. Please try again in a moment.",
        detail: message,
      },
      { status: 502 }
    );
  }
}
