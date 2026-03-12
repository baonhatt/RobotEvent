import { Language } from '../i18n';
import { Bot, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

export default function Header({ lang, setLang, t }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.robots, href: '#robots' },
    { name: t.about, href: '#about' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${isScrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <Bot className="w-8 h-8 text-electric-blue group-hover:animate-pulse" />
          <span className="text-2xl font-display font-bold tracking-wider text-white">
            ROBOT<span className="text-electric-blue glow-text">EVENT</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center bg-white/5 backdrop-blur-lg rounded-full p-1 border border-white/10">
            <button
              onClick={() => setLang('EN')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${lang === 'EN' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('VN')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${lang === 'VN' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
            >
              VN
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-electric-blue"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-lg border-b border-electric-blue/20 py-4 px-4 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-electric-blue transition-colors uppercase tracking-widest block py-2"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-800">
              <button
                onClick={() => { setLang('EN'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${lang === 'EN' ? 'bg-electric-blue text-dark-bg' : 'bg-card-bg text-gray-400'
                  }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => { setLang('VN'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${lang === 'VN' ? 'bg-electric-blue text-dark-bg' : 'bg-card-bg text-gray-400'
                  }`}
              >
                TIẾNG VIỆT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
