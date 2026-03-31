"use client";

import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mb-4 font-hindi">
              <span className="gold-gradient-text">Pricing</span> - मूल्य निर्धारण
            </h1>
            <p className="text-offwhite/60 text-lg font-hindi">
              अपनी ज़रूरत के हिसाब से प्लान चुनें
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-charcoal-200/50 rounded-3xl p-8 border border-gold/10 hover:border-gold/30 transition-all duration-300">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4 font-hindi">
                  Free
                </span>
                <h2 className="text-2xl font-bold text-offwhite mb-2 font-hindi">मुफ्त प्लान</h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gold">₹0</span>
                  <span className="text-offwhite/50">/महीना</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1 कहानी प्रतिदिन
                </li>
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  सभी 12 जॉनर
                </li>
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10-60 मिनट duration
                </li>
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dashboard access
                </li>
                <li className="flex items-center gap-3 text-offwhite/40">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Priority support
                </li>
              </ul>

              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="w-full py-3 px-6 rounded-xl bg-transparent border border-gold/50 text-gold font-semibold font-hindi hover:bg-gold/10 transition-all duration-300">
                    शुरू करें - मुफ्त
                  </button>
                </SignInButton>
              ) : (
                <div className="w-full py-3 px-6 rounded-xl bg-gold/10 border border-gold/30 text-gold font-semibold font-hindi text-center cursor-default">
                  आपका वर्तमान प्लान
                </div>
              )}
            </div>

            {/* Pro Plan */}
            <div className="bg-charcoal-200/50 rounded-3xl p-8 border-2 border-gold relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gold text-charcoal px-4 py-1 text-xs font-bold font-hindi rounded-bl-xl">
                POPULAR
              </div>

              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-sm font-medium mb-4 font-hindi">
                  PRO
                </span>
                <h2 className="text-2xl font-bold text-offwhite mb-2 font-hindi">प्रो प्लान</h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gold">₹299</span>
                  <span className="text-offwhite/50">/महीना</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <strong className="text-gold">अनलिमिटेड</strong> कहानियां
                </li>
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  सभी 12 जॉनर
                </li>
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10-60 मिनट duration
                </li>
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dashboard access
                </li>
                <li className="flex items-center gap-3 text-offwhite/80 font-hindi">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <strong className="text-gold">Priority</strong> support
                </li>
              </ul>

              <button className="w-full py-3 px-6 rounded-xl bg-gold text-charcoal font-semibold font-hindi hover:bg-gold-400 transition-all duration-300 gold-glow">
                Pro में upgrade करें
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-offwhite mb-8 font-hindi">
              अक्सर पूछे जाने वाले सवाल
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-charcoal-200/30 rounded-xl p-6">
                <h3 className="text-gold font-semibold mb-2 font-hindi">क्रेडिट कैसे काम करते हैं?</h3>
                <p className="text-offwhite/60 text-sm font-hindi">
                  हर बार जब आप एक कहानी generate करते हैं, तो एक credit use होता है। Free plan में आपको 1 credit मिलता है प्रतिदिन।
                </p>
              </div>
              <div className="bg-charcoal-200/30 rounded-xl p-6">
                <h3 className="text-gold font-semibold mb-2 font-hindi">क्या मैं अपना credit बचा सकता हूं?</h3>
                <p className="text-offwhite/60 text-sm font-hindi">
                  नहीं, daily credits रात 12 बजे reset हो जाते हैं। Pro plan में unlimited access है।
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
