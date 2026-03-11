import { motion } from 'motion/react';
import { Activity, Users, Smile, Star } from 'lucide-react';

interface CapabilitiesProps {
  t: any;
}

export default function Capabilities({ t }: CapabilitiesProps) {
  const icons = [Activity, Users, Smile, Star];

  return (
    <section id="capabilities" className="py-24 bg-dark-bg relative border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 tracking-tight">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((item: any, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-[#1c1c1e] rounded-[32px] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-electric-blue/10 to-transparent rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-[18px] flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors shadow-inner backdrop-blur-sm">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
