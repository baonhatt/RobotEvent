import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  t: any;
}

export default function Contact({ t }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '');
  const apiPath = (import.meta.env.VITE_CONTACT_API_PATH || '/api/contact').trim();
  const normalizedApiPath = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
  const contactApiUrl = `${apiBaseUrl}${normalizedApiPath}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setSubmitError('');

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const raw = await response.text();
      const data = raw
        ? (() => {
            try {
              return JSON.parse(raw);
            } catch {
              return { error: raw };
            }
          })()
        : {};

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '', phone: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              {t.connect}
            </div>
            
            <h3 className="text-4xl md:text-5xl font-display font-semibold text-white leading-tight tracking-tight">
              {t.tagline}
            </h3>
            
            <p className="text-gray-400 text-lg font-normal leading-relaxed">
              {t.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6 group p-4 rounded-[24px] bg-[#1c1c1e] border border-white/5 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[18px] flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-inner backdrop-blur-sm">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1 tracking-wide">{t.info.emailLabel}</p>
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
                  <p className="text-sm text-gray-400 font-medium mb-1 tracking-wide">{t.info.phoneLabel}</p>
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
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{t.form.success}</h4>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-400 mb-2 tracking-wide">
                        {t.form.name}
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 transition-all duration-300"
                        placeholder={t.placeholders.name}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-400 mb-2 tracking-wide">
                        {t.form.phone}
                      </label>
                      <input
                        required
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 transition-all duration-300"
                        placeholder={t.placeholders.phone}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-400 mb-2 tracking-wide">
                        {t.form.email}
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 transition-all duration-300"
                        placeholder={t.placeholders.email}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-400 mb-2 tracking-wide">
                        {t.form.message}
                      </label>
                      <textarea
                        required
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 transition-all duration-300 resize-y"
                        placeholder={t.placeholders.message}
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 text-[15px]">
                        {isSubmitting ? (t.form.sending || 'Sending...') : t.form.submit}
                      </span>
                      {!isSubmitting && <Send className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </button>

                    {submitError && (
                      <p className="text-red-400 text-sm font-medium" role="alert">
                        {submitError}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
