"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import WhyHelpperr from "@/components/WhyHelpperr";
import ProductShowcase from "@/components/ProductShowcase";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import DemoModal from "@/components/DemoModal";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Header onBookDemo={() => setDemoOpen(true)} />
      <main>
        <Hero onBookDemo={() => setDemoOpen(true)} />
        <Problem onBookDemo={() => setDemoOpen(true)} />
        <HowItWorks />
        <WhyHelpperr />
        {/* <ProductShowcase /> */}
        {/* <UseCases /> */}
        <FAQ />
        <CTA onBookDemo={() => setDemoOpen(true)} />
      </main>
      <Footer />
      <ScrollToTop />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
