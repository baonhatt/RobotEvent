import { motion } from 'motion/react';
import { Target, Lightbulb } from 'lucide-react';

interface AboutProps {
  t: any;
}

export default function About({ t }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-card-bg relative border-t border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 tracking-tight">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-10 bg-[#1c1c1e] rounded-[32px] border border-white/5 hover:border-white/20 transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-electric-blue/10 to-transparent rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[20px] flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors backdrop-blur-sm shadow-inner">
              <Target className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-display font-semibold text-white mb-4 tracking-tight">
              Our Mission
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed font-normal">
              {t.mission}
            </p>
          </motion.div>

          {/* Focus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-10 bg-[#1c1c1e] rounded-[32px] border border-white/5 hover:border-white/20 transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[20px] flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors backdrop-blur-sm shadow-inner">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-display font-semibold text-white mb-4 tracking-tight">
              Our Focus
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed font-normal">
              {t.focus}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
