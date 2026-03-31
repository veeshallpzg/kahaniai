"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Story {
  id: string;
  genre: string;
  genre_hindi: string;
  duration: number;
  script_content: string;
  word_count: number;
  created_at: string;
}

export default function DashboardPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/stories", {
        headers: {
          "x-user-id": "demo-user", // In production, use actual user auth
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }

      const data = await response.json();
      setStories(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load stories");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain; charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGenreEmoji = (genre: string) => {
    const emojis: Record<string, string> = {
      horror: "👻",
      romance: "💕",
      thriller: "😱",
      mythology: "🙏",
      crime: "🔍",
      scifi: "🚀",
      illusion: "🎭",
      paranormal: "👁️",
      comedy: "😂",
      suspense: "🤔",
      supernatural: "✨",
      conspiracy: "🕵️",
    };
    return emojis[genre] || "📖";
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mb-4 font-hindi">
              <span className="gold-gradient-text">Dashboard</span> - मेरी कहानियां
            </h1>
            <p className="text-offwhite/60 text-lg font-hindi">
              आपकी पिछली कहानियां यहाँ देखें
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <p className="text-red-400 font-hindi">{error}</p>
              <button
                onClick={fetchStories}
                className="mt-4 px-6 py-2 bg-gold text-charcoal rounded-lg font-hindi hover:bg-gold-400 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && stories.length === 0 && (
            <div className="bg-charcoal-200/50 rounded-3xl p-12 border border-gold/10 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-offwhite mb-4 font-hindi">
                कोई कहानी नहीं मिली
              </h2>
              <p className="text-offwhite/60 mb-6 font-hindi">
                अभी तक आपने कोई कहानी नहीं बनाई है। पहली कहानी बनाएं!
              </p>
              <a
                href="/generate"
                className="inline-block px-8 py-3 bg-gold text-charcoal rounded-xl font-semibold font-hindi hover:bg-gold-400 transition-colors gold-glow"
              >
                कहानी बनाएं
              </a>
            </div>
          )}

          {/* Stories List */}
          {!isLoading && !error && stories.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-offwhite/60 font-hindi">
                  कुल {stories.length} कहानियां
                </p>
                <a
                  href="/generate"
                  className="px-6 py-2 bg-gold text-charcoal rounded-lg font-semibold font-hindi hover:bg-gold-400 transition-colors text-sm"
                >
                  + नई कहानी
                </a>
              </div>

              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-charcoal-200/50 rounded-3xl p-6 sm:p-8 border border-gold/10 hover:border-gold/30 transition-all duration-300"
                >
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getGenreEmoji(story.genre)}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gold font-hindi">
                          {story.genre_hindi}
                        </h3>
                        <p className="text-offwhite/50 text-sm font-hindi">
                          {story.duration} min • {story.word_count} words
                        </p>
                      </div>
                    </div>
                    <span className="text-offwhite/40 text-xs font-hindi">
                      {formatDate(story.created_at)}
                    </span>
                  </div>

                  {/* Story Preview */}
                  <div className="bg-charcoal rounded-xl p-4 mb-4 max-h-48 overflow-hidden relative">
                    <p className="text-offwhite/80 text-sm font-hindi leading-relaxed line-clamp-6">
                      {story.script_content}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-charcoal-200/90 to-transparent" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => copyToClipboard(story.script_content, story.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 text-gold rounded-lg font-hindi text-sm hover:bg-gold/20 transition-colors"
                    >
                      {copiedId === story.id ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        downloadText(
                          story.script_content,
                          `${story.genre}-story-${new Date(story.created_at).toISOString().split("T")[0]}.txt`
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 text-gold rounded-lg font-hindi text-sm hover:bg-gold/20 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download TXT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
