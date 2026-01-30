// src/pages/Index.tsx

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import AnimatedSection from "@/components/AnimatedSection";
// ⭐️ NEW IMPORT
import ScrollSlideRobot from "@/components/ScrollSlideRobot"; 
import TechStack from "@/components/TechStack"; 

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ⭐️ ADD THE NEW COMPONENT HERE AS A FIXED OVERLAY */}
      <ScrollSlideRobot />
      
      <ScrollProgressBar />
      <CustomCursor />
      <Navigation />
      <AnimatedSection animation="fadeInUp" threshold={0.15}>
        <Hero />
      </AnimatedSection>
      <AnimatedSection animation="fadeInScale" threshold={0.15}>
        <About />
      </AnimatedSection>
      <AnimatedSection animation="slideInRight" threshold={0.15}>
        <Projects />
      </AnimatedSection>
      <AnimatedSection animation="fadeInUp" threshold={0.15}>
        <TechStack />
      </AnimatedSection>
      <AnimatedSection animation="slideInLeft" threshold={0.15}>
        <Education />
      </AnimatedSection>
      <AnimatedSection animation="fadeInUp" threshold={0.15}>
        <Contact />
      </AnimatedSection>
      <AnimatedSection animation="fadeInUp" threshold={0.1}>
        <Footer />
      </AnimatedSection>

      <a
        href="https://wa.me/6359338919?text=Hi%20Vanshika!%20I%20saw%20your%20portfolio."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 flex items-center justify-center transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M19.11 17.67c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.21-.38.24-.7.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.86-1.77-2.18-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.22-.32.33-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.79-1.02-2.45-.27-.65-.55-.56-.74-.57-.19-.01-.41-.01-.63-.01-.22 0-.57.08-.86.41-.3.32-1.13 1.11-1.13 2.71 0 1.6 1.16 3.14 1.32 3.36.16.22 2.28 3.48 5.52 4.87.77.33 1.38.53 1.85.68.78.25 1.49.21 2.05.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.29-.21-.61-.37z"/>
          <path d="M27.1 4.9C24.2 2 20.4.5 16.4.5S8.6 2 5.7 4.9C2.8 7.8 1.3 11.6 1.3 15.6c0 3 .9 5.8 2.6 8.2L1.5 31l7.4-2.4c2.3 1.3 4.9 2 7.6 2 4 0 7.8-1.5 10.7-4.4 2.9-2.9 4.4-6.7 4.4-10.7 0-4-1.5-7.8-4.4-10.6zM16.4 28.8c-2.5 0-4.9-.7-7-2.1l-.5-.3-4.4 1.4 1.4-4.3-.3-.5c-1.6-2.1-2.5-4.7-2.5-7.4 0-6.8 5.5-12.3 12.3-12.3 3.3 0 6.4 1.3 8.7 3.6 2.3 2.3 3.6 5.4 3.6 8.7 0 6.8-5.5 12.3-12.3 12.3z"/>
        </svg>
      </a>
    </div>
  );
};

export default Index;