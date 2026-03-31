"use client";

const features = [
  {
    title: "Indian Context",
    description: "Stories deeply rooted in Indian culture, traditions, and contemporary life that resonate with your audience.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Human-like Tone",
    description: "Natural, conversational Hindi that sounds authentic and engaging, just like a real storyteller.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "Perfect Twists",
    description: "Captivating plot twists and cliffhangers that keep listeners hooked till the very end.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal relative">
      {/* Section background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-gold/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gold/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite mb-4">
            Why <span className="text-gold">KahaniAI</span>?
          </h2>
          <p className="text-offwhite/60 text-lg max-w-2xl mx-auto">
            Our AI takes your storytelling to the next level
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-charcoal-200/50 rounded-2xl p-8 border border-gold/10
                         hover:border-gold/30 transition-all duration-500
                         hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            >
              {/* Card glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-offwhite mb-2 group-hover:text-gold transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-offwhite/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent group-hover:via-gold/60 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
