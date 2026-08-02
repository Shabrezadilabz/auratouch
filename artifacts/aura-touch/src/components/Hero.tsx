import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import explodedChip from '@assets/WhatsApp_Image_2026-08-01_at_3.12.10_PM_1785646713259.jpeg';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const labels = [
    { text: 'Upper Epoxy Dome', top: '15%', left: '-10%', align: 'right', delay: 0.5 },
    { text: 'Graphic Inlay Layer', top: '32%', right: '-15%', align: 'left', delay: 0.7 },
    { text: 'NFC Chip + Coil Antenna', top: '50%', left: '-20%', align: 'right', delay: 0.9 },
    { text: 'Rigid Core Substrate', top: '68%', right: '-10%', align: 'left', delay: 1.1 },
    { text: 'Adhesive Base', top: '85%', left: '-5%', align: 'right', delay: 1.3 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-obsidian"
    >
      {/* Animated Circuit Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none circuit-pattern"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 1 }}
      />
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(192,120,90,0.1)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-widest uppercase">
            The Super-Passport
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            One Chip. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary">
              Infinite Possibilities.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-sans max-w-lg">
            The universal NFC super-passport for India. Pay, unlock doors, commute, check in, and verify identity. All with a single tap.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#cta"
              className="glow-btn bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold text-center transition-transform hover:scale-105"
            >
              Order Now
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full text-lg font-semibold border border-white/20 hover:bg-white/5 transition-colors text-center"
            >
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Right: Centerpiece Exploded View */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative h-[500px] md:h-[700px] flex items-center justify-center"
        >
          {/* Floating Image Container */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full max-w-md aspect-[3/4]"
          >
            {/* The Image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-black">
              <img
                src={explodedChip}
                alt="Aura Touch Exploded View"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            </div>

            {/* Labels overlay */}
            <div className="absolute inset-0 hidden md:block">
              {labels.map((label, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: label.align === 'left' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: label.delay, duration: 0.6 }}
                  className="absolute flex items-center gap-3"
                  style={{
                    top: label.top,
                    ...(label.left ? { left: label.left } : { right: label.right }),
                    flexDirection: label.align === 'left' ? 'row' : 'row-reverse',
                  }}
                >
                  <span className="text-xs font-mono tracking-wider text-white/80 whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                    {label.text}
                  </span>
                  <div className={`w-12 h-px bg-gradient-to-${label.align === 'left' ? 'r' : 'l'} from-primary/80 to-transparent`} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,120,90,0.8)]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
