import { Bot, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  t: any;
  nav: any;
}

export default function Footer({ t, nav }: FooterProps) {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  const navLinks = [
    { name: nav.home, href: '#home' },
    { name: nav.robots, href: '#robots' },
    { name: nav.about, href: '#about' },
    { name: nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-dark-bg border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-6">
            <a href="#home" className="flex items-center gap-2 group">
              <Bot className="w-8 h-8 text-electric-blue group-hover:animate-pulse" />
              <span className="text-2xl font-display font-bold tracking-wider text-white">
                ROBOT<span className="text-electric-blue glow-text">EVENT</span>
              </span>
            </a>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">
              {t.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-6">{t.links}</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-electric-blue transition-colors uppercase tracking-widest text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-6">{t.social}</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-card-bg border border-gray-800 flex items-center justify-center text-gray-400 hover:text-electric-blue hover:border-electric-blue/50 hover:bg-electric-blue/10 transition-all duration-300 glow-box"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm font-light tracking-wide">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
