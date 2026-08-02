import { motion } from 'framer-motion';
import { Bed, ShoppingBag, Stethoscope, Bus, GraduationCap, Mic2 } from 'lucide-react';

const partners = [
  { name: 'Hospitality', icon: Bed },
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Transport', icon: Bus },
  { name: 'Education', icon: GraduationCap },
  { name: 'Events', icon: Mic2 },
];

export default function PartnersSection() {
  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
          Universal Compatibility
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, idx) => {
            const Icon = partner.icon;
            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all group"
            >
              <Icon className="w-10 h-10 text-white/40 mb-4 group-hover:text-primary transition-colors" strokeWidth={1.5} />
              <span className="text-sm font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors">
                {partner.name}
              </span>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
