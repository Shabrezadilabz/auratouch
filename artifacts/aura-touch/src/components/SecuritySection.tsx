import { motion } from 'framer-motion';
import { ShieldCheck, LockKeyhole, EyeOff } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 bg-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(15,240,192,0.1)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Animated Shield Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Pulsing rings */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-secondary"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute inset-0 rounded-full border border-secondary"
            />
            <ShieldCheck className="w-32 h-32 text-secondary relative z-10 drop-shadow-[0_0_30px_rgba(15,240,192,0.5)]" strokeWidth={1} />
          </div>
        </motion.div>

        {/* Copy */}
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Your data. <br/>
            <span className="text-white/50">Your control.</span>
          </h2>
          
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-4"
            >
              <div className="mt-1 bg-white/5 p-3 rounded-xl h-fit">
                <LockKeyhole className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Military-grade AES-256 encryption secures every transaction and data transfer. Your information is unreadable to anyone without your explicit key.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              <div className="mt-1 bg-white/5 p-3 rounded-xl h-fit">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Permission-Based Sharing</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  You decide what to share and when. Grant temporary access to a hotel room or share a specific payment method—revoke it instantly from the app.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <div className="mt-1 bg-white/5 p-3 rounded-xl h-fit">
                <EyeOff className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Zero Data Sold. Ever.</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We are a hardware and infrastructure company, not an ad network. Your behavioral data is never harvested, aggregated, or sold.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
