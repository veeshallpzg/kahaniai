"use client";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        {/* Bottom left decoration */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      {/* Decorative mandala-inspired circles */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/10 rounded-full animate-pulse" />
      <div className="absolute bottom-40 right-10 w-24 h-24 border border-gold/10 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-gold/5 rounded-full animate-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse" />
          <span className="text-gold text-sm font-medium font-hindi">
            AI-Powered Storytelling
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
          <span className="font-hindi text-offwhite">
            वायरल हिंदी कहानियां,
          </span>
          <br />
          <span className="font-hindi gold-gradient-text">सेकंडों में</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-offwhite/70 mb-10 max-w-2xl mx-auto font-hindi animate-slide-up" style={{ animationDelay: "0.1s" }}>
          AI-powered scriptwriter for Indian Podcasters
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold text-charcoal font-semibold text-lg
                       hover:bg-gold-400 transition-all duration-300 gold-glow
                       focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal
                       transform hover:scale-105"
          >
            <span className="font-hindi">शुरू करें</span>
            <span className="ml-2">→</span>
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-offwhite/30 text-offwhite font-medium text-lg
                       hover:bg-offwhite/10 transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-offwhite/50 focus:ring-offset-2 focus:ring-offset-charcoal"
          >
            <span className="font-hindi">और जानें</span>
          </button>
        </div>

        {/* Stats/Social proof */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold font-hindi">10K+</div>
            <div className="text-xs sm:text-sm text-offwhite/50 font-hindi">कहानियां</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold font-hindi">500+</div>
            <div className="text-xs sm:text-sm text-offwhite/50 font-hindi">पॉडकास्टर्स</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gold font-hindi">4.9★</div>
            <div className="text-xs sm:text-sm text-offwhite/50">Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-offwhite/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-gold animate-pulse" />
        </div>
      </div>
    </section>
  );
}
