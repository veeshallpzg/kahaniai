"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-gold/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center">
              <span className="text-charcoal font-bold text-sm">K</span>
            </div>
            <span className="text-sm text-offwhite/60">
              © {currentYear}{" "}
              <span className="text-gold">KahaniAI</span>. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-offwhite/50">
            <a
              href="#"
              className="hover:text-gold transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-gold transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-gold transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
