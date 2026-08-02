import { motion, Variants } from 'framer-motion';
import { CreditCard, Key, Train, Ticket, HeartPulse, Gift, CalendarCheck, Utensils } from 'lucide-react';
import menuChipsImg from '@assets/WhatsApp_Image_2026-08-02_at_12.51.21_AM_1785646713257.jpeg';

const capabilities = [
  { icon: CreditCard, title: 'Payments', desc: 'Tap to pay anywhere flawlessly.' },
  { icon: Key, title: 'Hotel & Airbnb', desc: 'Tap to unlock your room instantly.' },
  { icon: Train, title: 'Metro & Transport', desc: 'Tap to commute without delay.' },
  { icon: Ticket, title: 'Bookings & Tickets', desc: 'Tap to enter venues and cinemas.' },
  { icon: HeartPulse, title: 'Healthcare ID', desc: 'Tap to verify medical records.' },
  { icon: Gift, title: 'Loyalty & Rewards', desc: 'Tap to earn and redeem points.' },
  { icon: CalendarCheck, title: 'Event Check-In', desc: 'Tap to attend campus & corporate events.' },
  { icon: Utensils, title: 'Smart Menu', desc: 'Tap to view digital menus effortlessly.' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ValueSection() {
  return (
    <section id="features" className="py-24 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            One Tap. <span className="text-primary">Infinite Possibilities.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Replace your wallet, keys, and passes with a single, elegant microchip.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {capabilities.slice(0, 4).map((cap, i) => {
              const Icon = cap.icon;
              return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all cursor-default"
              >
                <Icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 group-hover:text-secondary transition-all duration-300" />
                <h3 className="text-xl font-semibold mb-2">{cap.title}</h3>
                <p className="text-white/60 text-sm">{cap.desc}</p>
              </motion.div>
              );
            })}
          </motion.div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-square hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
            <img
              src={menuChipsImg}
              alt="Aura Touch chips in use"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {capabilities.slice(4, 8).map((cap, i) => {
              const Icon = cap.icon;
              return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-secondary/50 transition-all cursor-default"
              >
                <Icon className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                <h3 className="text-xl font-semibold mb-2">{cap.title}</h3>
                <p className="text-white/60 text-sm">{cap.desc}</p>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
