import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section id="cta" className="relative py-32 overflow-hidden bg-black flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/20 to-secondary/10 rounded-full blur-[100px] mix-blend-screen opacity-50"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
          Join the <span className="text-primary">Tap Future.</span>
        </h2>
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
          The first batch of Aura Touch chips is limited to 10,000 units.
          Secure your priority access now.
        </p>

        <form 
          className="max-w-md mx-auto relative"
          onSubmit={(e) => { e.preventDefault(); alert("Thanks for joining the waitlist!"); }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button
              type="submit"
              className="glow-btn bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold whitespace-nowrap hover:scale-105 transition-transform"
            >
              Get Early Access
            </button>
          </div>
          <p className="text-xs text-white/40 mt-4">
            By joining, you agree to our Terms of Service and Privacy Policy. No spam, ever.
          </p>
        </form>
      </div>
    </section>
  );
}
