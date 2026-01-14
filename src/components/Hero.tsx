// src/components/Hero.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import GlareHover from "./GlareHover"; 
import { useLenis } from "@/hooks/useLenis";

const Hero = () => {
  const lenis = useLenis();

  const scrollToContact = () => {
    // Scrolls to the contact section with a smooth transition
    lenis?.scrollTo("#contact", { offset: -120, duration: 1.2 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden
                 bg-gradient-to-b
                 from-background/90   /* top – dark background */
                 via-primary/30       /* middle – primary tint */
                 to-background/90"    /* bottom – dark again */
    >
      {/* ---------------------------------------------------------- */}
      {/* Profile Image / Bitmoji Optimized for SEO */}
      {/* ---------------------------------------------------------- */}
      <div className="absolute right-20 top-1/3 -translate-y-1/4">
        <img 
          src="/bitmoji.png" 
          alt="Vanshika Jangam - UI/UX and Frontend Developer" 
          className="w-96 h-auto drop-shadow-2xl" 
        />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Main Content */}
      {/* ---------------------------------------------------------- */}
      <div className="relative z-10 max-w-3xl px-4 ml-10 text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {/* Main Name Heading for Search Engine Crawlers */}
          <span className="block text-foreground">Hi, I'm Vanshika Jangam!</span>
          <span className="block text-lavender">
            I Transform Ideas into Engaging Experiences
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-6 text-muted-foreground">
          Discover a passionate and dedicated **UI/UX developer**, driven by the
          vision of crafting impactful and user-centric experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={scrollToContact}
          >
            Let's Connect
          </Button>

          <Button
            variant="outline"
            className="border-lavender text-lavender hover:bg-lavender/10 font-semibold"
          >
            Download CV
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Bottom-right “Get in Touch” link */}
      {/* ---------------------------------------------------------- */}
      <GlareHover
        width="auto"
        height="auto"
        background="transparent"
        borderRadius="8px"
        borderColor="transparent"
        glareColor="#ffffff"
        glareOpacity={0.3}
        glareSize={200}
        transitionDuration={500}
        className="inline-flex"
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToContact();
          }}
          className="absolute bottom-10 right-10
                     bg-primary text-primary-foreground
                     px-5 py-2.5 rounded-lg
                     hover:bg-primary/90
                     font-medium transition-colors"
        >
          Get in Touch
        </a>
      </GlareHover>
    </section>
  );
};

export default Hero;