import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What devices are compatible with Aura Touch?',
    a: 'Aura Touch works with any smartphone that has an NFC reader (virtually all iPhones from iPhone XR onwards, and most modern Android devices). You do not need to charge the chip; it draws micro-power directly from the reader.',
  },
  {
    q: 'Is my data safe if I lose my phone?',
    a: 'Absolutely. The Aura Touch chip stores encrypted references, not raw data. You can instantly freeze or wipe your chip remotely through the web portal or another authenticated device if lost.',
  },
  {
    q: 'Can one chip replace all my cards?',
    a: 'Yes. The Aura Touch super-passport app lets you digitize and store credit cards, transit passes, hotel keys, and loyalty cards, dynamically selecting which one to transmit based on the reader you tap.',
  },
  {
    q: 'Does it work internationally?',
    a: 'Yes. As long as the terminal supports standard NFC protocols (like Visa payWave, Mastercard PayPass, or standard NFC access control), Aura Touch will function globally.',
  },
  {
    q: 'How do I order?',
    a: 'We are currently accepting pre-orders for our limited Founder’s Edition batch. Scroll down to join the waitlist and secure your spot.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-zinc-900">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">
          Questions? <span className="text-primary">Answers.</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-white/10 rounded-2xl bg-black/40 overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                {openIndex === idx ? (
                  <Minus className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-white/50 shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-white/60 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
