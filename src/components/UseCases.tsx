import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import unitreeG1 from '../assets/img/unitree-g1.webp';

interface UseCasesProps {
  t: any;
}

export default function UseCases({ t }: UseCasesProps) {
  return (
    <section id="use-cases" className="py-24 bg-dark-bg relative border-t border-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/eventtech/1920/1080?blur=10')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
              {t.subtitle}
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-semibold text-white mb-8 tracking-tight leading-tight">
              {t.title}
            </h2>

            <div className="space-y-6">
              {t.items.map((item: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0 shadow-sm backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xl text-gray-400 font-normal leading-relaxed group-hover:text-white transition-colors">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            <button className="mt-12 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
              {t.cta}
            </button>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl group">
              <img
                src={unitreeG1}
                alt="Unitree G1 Robot"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Floating UI Element */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[24px] p-6 flex items-center justify-between shadow-2xl">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-1">{t.statLabel}</p>
                  <p className="text-3xl font-display font-semibold text-white tracking-tight">+300%</p>
                </div>
                <div className="w-16 h-16 rounded-full border-[3px] border-white/10 border-t-white animate-spin"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
