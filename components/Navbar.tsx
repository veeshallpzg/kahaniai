"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center">
              <span className="text-charcoal font-bold text-xl font-hindi">क</span>
            </div>
            <span className="text-xl font-bold text-offwhite font-hindi">
              Kahani<span className="text-gold">AI</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="px-4 py-2 text-offwhite/70 hover:text-gold transition-colors font-hindi text-sm"
            >
              Dashboard
            </a>
            <a
              href="/generate"
              className="px-5 py-2 rounded-lg bg-gold text-charcoal font-medium hover:bg-gold-400 transition-all duration-300 font-hindi text-sm"
            >
              Generate
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
