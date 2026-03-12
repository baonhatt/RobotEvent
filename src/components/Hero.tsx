import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import heroImg from '../assets/img/robo-hero-new.png';

interface HeroProps {
  t: any;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Glow orbs: smaller on mobile to save GPU */}
        <div className="absolute top-1/4 left-1/4 w-75 h-75 sm:w-150 sm:h-150 bg-electric-blue/20 rounded-full blur-[60px] sm:blur-[120px] opacity-60 mix-blend-screen motion-safe:animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 hidden sm:block w-200 h-200 bg-electric-blue/10 rounded-full blur-[150px] opacity-40 mix-blend-screen"></div>
        {/* Background image hidden on mobile – saves a network request & compositing cost */}
        <div className="absolute inset-0 hidden sm:block bg-[url('https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&q=40&w=1280&h=720&blur=10')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/60 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-sm font-medium mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse shadow-[0_0_10px_#00f0ff]"></span>
            Next-Gen Robotics
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-display font-semibold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            {t.tagline.split(' ').map((word: string, i: number) => (
              <span key={i} className={i === 1 || i === 2 ? 'glow-text' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a
              href="#robots"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric-blue text-dark-bg font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]"
            >
              <span className="relative z-10">{t.cta}</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              {t.contactUs}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
            {/* Background Glowing Portal Effect */}
            <div className="absolute inset-4 rounded-full bg-linear-to-tr from-electric-blue/20 to-purple-500/10 blur-[80px] motion-safe:animate-pulse"></div>

            {/* Decorative circles - strictly behind the robot */}
            <div className="absolute inset-0 border border-electric-blue/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-12 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-24 border border-electric-blue/30 rounded-full"></div>

            {/* Floating Robot Image - Pops Out */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-30 w-[120%] h-[120%] -mt-20 filter drop-shadow-[0_20px_50px_rgba(0,240,255,0.4)]"
            >
              <img
                src={heroImg}
                alt="RobotEvent - Cho thuê Robot sự kiện chuyên nghiệp"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Shadow beneath the robot for depth */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/40 blur-xl rounded-[100%] z-20"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
