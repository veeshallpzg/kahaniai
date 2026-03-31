import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { supabase } from "@/lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const genreLabels: Record<string, string> = {
  horror: "डरावनी",
  romance: "रोमांटिक",
  thriller: "रोमांचक",
  mythology: "पौराणिक",
  crime: "अपराध",
  scifi: "विज्ञान कथा",
  illusion: "भ्रम",
  paranormal: "अलौकिक",
  comedy: "कॉमेडी",
  suspense: "रहस्य",
  supernatural: "असामान्य",
  conspiracy: "षड्यंत्र",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { genre, duration } = body;
    const userId = request.headers.get("x-user-id") || "anonymous";

    if (!genre || !duration) {
      return NextResponse.json(
        { error: "Genre and duration are required" },
        { status: 400 }
      );
    }

    const targetWords = duration * 140;
    const genreHindi = genreLabels[genre] || genre;

    const systemPrompt = `You are 'Kahani-kaar', a master storyteller from Mumbai/Delhi, India. You MUST write the ENTIRE story in Devanagari script (हिंदी में). Write in natural Hindi using Hindi script (अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ, क, ख, ग, etc.). NOT in Roman English.

STRICT RULES:
1. NEVER use AI phrases like "निष्कर्षतः", "इसलिए", "अतः", "अंततः", "सारांशतः" at sentence starts
2. MUST include Indian cultural references: chai, auto-rickshaw, shaadi, monsoon, railway station, samosa, temples, gully cricket, etc.
3. MUST have at least ONE major plot twist in the MIDDLE of the story (around 50-60% mark)
4. MUST end with a CLIFFHANGER QUESTION for the next episode (e.g., "Kya Vikram ne woh cheez dhundh li? Next episode mein pata chalega!")
5. Sound like a friend telling a story at a chai tapri, NOT a formal essay

Target: ${targetWords} words. Make it viral-worthy with drama, tension, and unexpected twists.`;

    const userMessage = `एक ${genreHindi} कहानी लिखो जो ${duration} मिनट की हो। पूरी कहानी हिंदी में Devanagari script में लिखो, Roman English में नहीं। Viral-worthy story चाहिए जिसमें अनपेक्षित मोड़ हो।`;

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 1.0,
      max_tokens: Math.min(targetWords * 2, 8192),
      stream: true,
    });

    let fullStory = "";

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              fullStory += content;
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    // Save to Supabase after stream completes
    const response = new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });

    // Create a copy of the response body for saving
    const reader = response.body?.getReader();
    if (reader) {
      // This is just for the stream, save happens after
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
    }

    // Save story to Supabase (non-blocking)
    if (fullStory && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const wordCount = fullStory.split(/\s+/).filter(Boolean).length;
      await supabase.from("stories").insert({
        user_id: userId,
        genre: genre,
        genre_hindi: genreHindi,
        duration: duration,
        script_content: fullStory,
        word_count: wordCount,
      });
    }

    // Re-create the stream for the response
    const stream2 = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 1.0,
      max_tokens: Math.min(targetWords * 2, 8192),
      stream: true,
    });

    const readable2 = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream2) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable2, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: unknown) {
    console.error("Generation error:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "API key is missing. Please set GROQ_API_KEY in your environment." },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: `Generation failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
