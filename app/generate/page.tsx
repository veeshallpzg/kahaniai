"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const genres = [
  { value: "horror", label: "Horror (डरावनी)", labelHindi: "डरावनी" },
  { value: "romance", label: "Romance (रोमांटिक)", labelHindi: "रोमांटिक" },
  { value: "thriller", label: "Thriller (रोमांचक)", labelHindi: "रोमांचक" },
  { value: "mythology", label: "Mythology (पौराणिक)", labelHindi: "पौराणिक" },
  { value: "crime", label: "Crime (अपराध)", labelHindi: "अपराध" },
  { value: "scifi", label: "Sci-Fi (विज्ञान कथा)", labelHindi: "विज्ञान कथा" },
  { value: "illusion", label: "Illusion (भ्रम)", labelHindi: "भ्रम" },
  { value: "paranormal", label: "Paranormal (अलौकिक)", labelHindi: "अलौकिक" },
  { value: "comedy", label: "Comedy (कॉमेडी)", labelHindi: "कॉमेडी" },
  { value: "suspense", label: "Suspense (रहस्य)", labelHindi: "रहस्य" },
  { value: "supernatural", label: "Supernatural (असामान्य)", labelHindi: "असामान्य" },
  { value: "conspiracy", label: "Conspiracy (षड्यंत्र)", labelHindi: "षड्यंत्र" },
];

const WORDS_PER_MINUTE = 140;

export default function GeneratePage() {
  const { isSignedIn, user } = useUser();
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");
  const [error, setError] = useState("");
  const [credits, setCredits] = useState<number | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [checkingCredits, setCheckingCredits] = useState(false);

  const estimatedWords = duration * WORDS_PER_MINUTE;

  // Fetch user credits on mount
  useEffect(() => {
    if (isSignedIn && user) {
      fetchCredits();
    }
  }, [isSignedIn, user]);

  const fetchCredits = async () => {
    try {
      const response = await fetch("/api/user/credits");
      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits);
      }
    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genre) return;

    // Check credits before generating
    if (isSignedIn && user) {
      setCheckingCredits(true);
      try {
        const creditCheck = await fetch("/api/user/credits");
        const creditData = await creditCheck.json();
        
        if (creditData.plan !== "pro" && creditData.credits <= 0) {
          setShowUpgradeModal(true);
          setCheckingCredits(false);
          return;
        }
      } catch (err) {
        console.error("Error checking credits:", err);
      }
      setCheckingCredits(false);
    }

    setIsLoading(true);
    setError("");
    setGeneratedStory("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genre, duration }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate story");
      }

      // Refresh credits after successful generation
      fetchCredits();

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let story = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        story += decoder.decode(value, { stream: true });
        setGeneratedStory(story);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-charcoal-200 border border-gold rounded-3xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-3xl">💎</span>
              </div>
              <h2 className="text-2xl font-bold text-offwhite mb-2 font-hindi">
                Credits Exhausted!
              </h2>
              <p className="text-offwhite/60 mb-6 font-hindi">
                आपके सभी credits खत्म हो गए हैं। Pro plan में upgrade करें और enjoy करें unlimited stories!
              </p>
              <div className="space-y-3">
                <a
                  href="/pricing"
                  className="block w-full py-3 px-6 rounded-xl bg-gold text-charcoal font-semibold font-hindi hover:bg-gold-400 transition-all duration-300 gold-glow text-center"
                >
                  Pro में Upgrade करें - ₹299/mo
                </a>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="block w-full py-3 px-6 rounded-xl bg-transparent border border-gold/30 text-gold font-semibold font-hindi hover:bg-gold/10 transition-all duration-300"
                >
                  बाद में
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mb-4 font-hindi">
              <span className="gold-gradient-text">Generate</span> कहानी
            </h1>
            <p className="text-offwhite/60 text-lg font-hindi">
              अपनी पॉडकास्ट के लिए एक compelling कहानी बनाएं
            </p>
          </div>

          {/* Credits Display */}
          {isSignedIn && credits !== null && (
            <div className="mb-6 p-4 bg-charcoal-200/50 rounded-xl border border-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gold text-2xl">💎</span>
                <div>
                  <p className="text-offwhite/60 text-sm font-hindi">Your Credits</p>
                  <p className="text-offwhite font-bold font-hindi">
                    {credits === Infinity ? "∞ Unlimited" : credits}
                  </p>
                </div>
              </div>
              <a
                href="/pricing"
                className="text-gold text-sm font-hindi hover:underline"
              >
                Upgrade to Pro
              </a>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-charcoal-200/50 rounded-3xl p-8 sm:p-10 border border-gold/10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Genre Select */}
              <div className="space-y-3">
                <label
                  htmlFor="genre"
                  className="block text-offwhite font-medium font-hindi"
                >
                  Genre (शैली) <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-charcoal border border-gold/20 
                               text-offwhite font-hindi appearance-none cursor-pointer
                               focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30
                               transition-all duration-300"
                  >
                    <option value="" disabled className="bg-charcoal">
                      Select Genre (शैली चुनें)
                    </option>
                    {genres.map((g) => (
                      <option
                        key={g.value}
                        value={g.value}
                        className="bg-charcoal py-2"
                      >
                        {g.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="space-y-3">
                <label
                  htmlFor="duration"
                  className="block text-offwhite font-medium font-hindi"
                >
                  Duration (अवधि) <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    id="duration"
                    min="10"
                    max="60"
                    step="5"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer
                               bg-charcoal border border-gold/20
                               focus:outline-none focus:ring-2 focus:ring-gold/30"
                    style={{
                      background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((duration - 10) / 50) * 100}%, #1f1f1f ${((duration - 10) / 50) * 100}%, #1f1f1f 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-offwhite/50 text-sm font-hindi">10 min</span>
                  <span className="text-gold font-bold text-xl font-hindi">
                    {duration} minutes
                  </span>
                  <span className="text-offwhite/50 text-sm font-hindi">60 min</span>
                </div>
              </div>

              {/* Estimated Word Count */}
              <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 text-center">
                <p className="text-offwhite/60 text-sm mb-2 font-hindi">
                  Estimated Word Count
                </p>
                <p className="text-3xl font-bold text-gold font-hindi">
                  {estimatedWords.toLocaleString()} words
                </p>
                <p className="text-offwhite/40 text-xs mt-2 font-hindi">
                  ({duration} min × {WORDS_PER_MINUTE} words/min)
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!genre || isLoading || checkingCredits}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg font-hindi
                            flex items-center justify-center gap-3
                            transition-all duration-300
                            ${
                              !genre || isLoading || checkingCredits
                                ? "bg-gold/30 text-charcoal/50 cursor-not-allowed"
                                : "bg-gold text-charcoal hover:bg-gold-400 gold-glow hover:scale-[1.02]"
                            }
                            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal
                            disabled:cursor-not-allowed disabled:hover:scale-100 disabled:gold-glow-none`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-6 h-6 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                    <span>Generating Story...</span>
                  </>
                ) : checkingCredits ? (
                  <span>Checking Credits...</span>
                ) : (
                  <>
                    <span>Generate Script</span>
                    <span>(Generate कहानी)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm font-hindi">{error}</p>
            </div>
          )}

          {/* Generated Story Display */}
          {(generatedStory || isLoading) && (
            <div className="mt-8">
              <div className="bg-charcoal-200/50 rounded-3xl p-8 border border-gold/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gold font-hindi">
                    आपकी कहानी (Your Story)
                  </h2>
                  {isLoading && (
                    <span className="flex items-center gap-2 text-offwhite/50 text-sm">
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      Writing...
                    </span>
                  )}
                </div>
                <div className="prose prose-invert max-w-none">
                  <div 
                    className="text-offwhite/90 leading-relaxed whitespace-pre-wrap" 
                    style={{ 
                      fontFamily: 'var(--font-hindi)',
                      fontSize: '1.1rem',
                      lineHeight: '1.9',
                      direction: 'ltr',
                      textAlign: 'left'
                    }}
                  >
                    {generatedStory || (
                      <span className="text-offwhite/30 italic font-hindi">
                        कहानी लिखी जा रही है...
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Word Count */}
              {generatedStory && (
                <p className="mt-4 text-center text-offwhite/40 text-sm font-hindi">
                  Total words: ~{generatedStory.split(/\s+/).filter(Boolean).length}
                </p>
              )}
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-10 p-6 bg-charcoal-200/30 rounded-2xl border border-gold/5">
            <h3 className="text-gold font-semibold mb-3 font-hindi">Tips</h3>
            <ul className="space-y-2 text-offwhite/50 text-sm font-hindi">
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span>डरावनी कहानियों के लिए 30-45 minutes अच्छा है</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span>रोमांटिक stories 20-30 minutes में perfect हैं</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span>Thriller के लिए longer duration बेहतर है</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
