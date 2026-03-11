import { motion } from 'motion/react';
import { Mail, Phone, Send } from 'lucide-react';

interface ContactProps {
  t: any;
}

export default function Contact({ t }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-dark-bg relative border-t border-gray-800 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 tracking-tight">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
              Connect With Us
            </div>
            
            <h3 className="text-4xl md:text-5xl font-display font-semibold text-white leading-tight tracking-tight">
              Ready to rent the future?
            </h3>
            
            <p className="text-gray-400 text-lg font-normal leading-relaxed">
              Reach out to our team to discuss your event requirements, get a quote, or schedule a demo of our robotic fleet.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6 group p-4 rounded-[24px] bg-[#1c1c1e] border border-white/5 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[18px] flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-inner backdrop-blur-sm">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1 tracking-wide">Email</p>
                  <a href={`mailto:${t.info.email}`} className="text-xl text-white font-semibold hover:text-electric-blue transition-colors">
                    {t.info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group p-4 rounded-[24px] bg-[#1c1c1e] border border-white/5 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[18px] flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-inner backdrop-blur-sm">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1 tracking-wide">Phone</p>
                  <a href={`tel:${t.info.phone}`} className="text-xl text-white font-semibold hover:text-electric-blue transition-colors">
                    {t.info.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#1c1c1e] p-8 md:p-12 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-electric-blue/10 to-transparent rounded-bl-[150px] -z-10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-400 mb-2 tracking-wide">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-400 mb-2 tracking-wide">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-400 mb-2 tracking-wide">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 transition-all duration-300 resize-none"
                  placeholder="Tell us about your event..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              >
                <span className="relative z-10 text-[15px]">{t.form.submit}</span>
                <Send className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
