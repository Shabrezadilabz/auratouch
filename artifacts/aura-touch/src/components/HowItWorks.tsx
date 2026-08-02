import { motion } from 'framer-motion';
import { Smartphone, ScanLine, RadioReceiver, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: 'Stick it anywhere',
    desc: 'Apply the Aura Touch chip to your phone back, case, or favorite accessory. Its aerospace-grade adhesive holds firm.',
  },
  {
    icon: ScanLine,
    title: 'Pair in seconds',
    desc: 'Open the Aura Touch app and scan the unique QR code or use Bluetooth to securely link the chip to your identity.',
  },
  {
    icon: RadioReceiver,
    title: 'Tap to interact',
    desc: 'Hold your device near any compatible NFC reader—at stores, hotels, metro stations, or events.',
  },
  {
    icon: CheckCircle2,
    title: 'Instant verification',
    desc: 'Pay, unlock, or check-in instantly. Manage all your permissions and cards directly in the app.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-black to-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Effortless Setup. <span className="text-secondary">Seamless Life.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-primary flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(192,120,90,0.2)] relative z-10">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-5xl font-display font-bold text-white/5 absolute top-0 -z-10 -translate-y-1/2">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
