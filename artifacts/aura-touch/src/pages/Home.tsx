import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueSection from '@/components/ValueSection';
import HowItWorks from '@/components/HowItWorks';
import SecuritySection from '@/components/SecuritySection';
import PartnersSection from '@/components/PartnersSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export default function Home() {
  // Enforce dark mode on the whole document to be safe, since default is dark
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <ValueSection />
        <HowItWorks />
        <SecuritySection />
        <PartnersSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
