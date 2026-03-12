import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

interface PhoneButtonProps {
  phone: string;
}

export default function PhoneButton({ phone }: PhoneButtonProps) {
  return (
    <motion.a
      href={`tel:${phone.replace(/\s+/g, '')}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        rotate: [0, -10, 10, -10, 10, 0],
      }}
      transition={{
        rotate: {
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2
        },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-8 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all group cursor-pointer"
      aria-label="Call us"
    >
      {/* Wave effect around the button */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></div>
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10 [animation-delay:0.5s]"></div>
      
      <Phone className="w-7 h-7 relative z-10 fill-current" />
    </motion.a>
  );
}
