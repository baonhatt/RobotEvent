import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Eye, Shield, Mail, Phone, MapPin, X, ExternalLink } from 'lucide-react';

interface ShowcaseProps {
  t: any;
  contactT: any; // Added to pass contact translations
}

export default function Showcase({ t, contactT }: ShowcaseProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState<any>(null);

  const robotImages = [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600&h=800",
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=600&h=800"
  ];

  const icons = [Cpu, Zap, Eye, Shield];

  const handleViewSpecs = (robot: any) => {
    setSelectedRobot(robot);
    setIsPopupOpen(true);
  };

  return (
    <section id="robots" className="py-24 bg-card-bg relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/circuit/1920/1080?blur=10')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 tracking-tight glow-text">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-electric-blue mx-auto rounded-full shadow-[0_0_10px_rgba(0,240,255,0.4)]"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {t.robots.map((robot: any, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative bg-[#1c1c1e] rounded-[32px] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[340px]"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10"></div>
                  <img
                    src={robotImages[index]}
                    alt={robot.name}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Tech Overlay */}
                  <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative z-20 -mt-10 bg-linear-to-t from-[#0a192f] via-[#0a192f] to-transparent pt-12">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-2xl font-display font-semibold text-white tracking-tight group-hover:text-electric-blue transition-colors">
                      {robot.name}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium">{robot.duration}</span>
                  </div>

                  {/* Pricing Pill */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-bold mb-4">
                    {robot.price}
                  </div>

                  <p className="text-gray-400 text-sm mb-6 font-normal leading-relaxed line-clamp-2">
                    {robot.desc}
                  </p>

                  {/* Abilities */}
                  <div className="space-y-3">
                    {robot.abilities.map((ability: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                        <div className="w-1.5 h-1.5 bg-electric-blue rounded-full shadow-[0_0_5px_#00f0ff]"></div>
                        {ability}
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewSpecs(robot)}
                    className="mt-8 w-full py-3.5 bg-electric-blue/10 border border-electric-blue/30 rounded-full text-sm font-semibold text-white hover:bg-electric-blue hover:text-dark-bg transition-all duration-300 backdrop-blur-sm group/btn flex items-center justify-center gap-2"
                  >
                    {t.viewSpecs}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Contact Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-dark-bg border border-white/10 rounded-[40px] shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] -ml-16 -mb-16"></div>

              <div className="p-8 sm:p-12 relative z-10">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-bold mb-4">
                    {t.modal.inquiry}
                  </div>
                  <h3 className="text-3xl font-display font-semibold text-white mb-2 leading-tight">
                    {t.modal.interest} {selectedRobot?.name}?
                  </h3>
                  <p className="text-gray-400">{t.modal.description}</p>
                </div>

                <div className="space-y-6">
                  <div className="group flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-all hover:bg-electric-blue/5">
                    <div className="w-14 h-14 rounded-2xl bg-electric-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-widest">{t.modal.call}</p>
                      <p className="text-xl font-semibold text-white">{contactT.info.phone}</p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-all hover:bg-electric-blue/5">
                    <div className="w-14 h-14 rounded-2xl bg-electric-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-widest">{t.modal.email}</p>
                      <p className="text-xl font-semibold text-white">{contactT.info.email}</p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-all hover:bg-electric-blue/5">
                    <div className="w-14 h-14 rounded-2xl bg-electric-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-widest">{t.modal.visit}</p>
                      <p className="text-lg font-semibold text-white leading-tight">{contactT.info.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col gap-4">
                  <a
                    href={`tel:${contactT.info.phone.replace(/\s+/g, '')}`}
                    className="w-full py-4 bg-electric-blue text-dark-bg font-bold rounded-2xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
                  >
                    {t.modal.button}
                  </a>
                  <p className="text-center text-xs text-gray-600">{t.modal.availability}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
