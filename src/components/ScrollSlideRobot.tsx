import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import robotAnimation from './../../public/animation/Robot says hello.json';
import { cn } from '@/lib/utils';
import { useLenis } from '@/hooks/useLenis';

// Settings (you can adjust these)
const SCROLL_THRESHOLD = 500; // Scroll position to trigger the robot (in pixels)
const DURATION = 3000; // Duration the robot stays visible (3000ms = 3 seconds)

const ScrollSlideRobot: React.FC = () => {
  // isLocked: Controls eligibility to show the animation again until reset.
  const [isLocked, setIsLocked] = useState(false);
  // isRobotVisible: Controls the visibility and exit animation.
  const [isRobotVisible, setIsRobotVisible] = useState(false);
  
  const lenis = useLenis();

  // --- 1. Scroll Logic (Trigger and Reset) ---
  // This useEffect handles only when to show and when to reset/hide the animation
  useEffect(() => {
    const handleScroll = () => {
      // Use Lenis scroll if available, fallback to window.scrollY
      const currentScroll = lenis?.scroll !== undefined ? lenis.scroll : window.scrollY;

      // Trigger Logic: Show robot only once past the threshold if not locked
      if (currentScroll > SCROLL_THRESHOLD && !isLocked) {
        setIsLocked(true); 
        setIsRobotVisible(true); // Show robot
      }
      
      // Reset Logic: Unlock and hide when scrolling back up (e.g., into the Hero Section)
      if (currentScroll < SCROLL_THRESHOLD / 2 && isLocked) {
        setIsLocked(false);
        setIsRobotVisible(false);
      }
    };

    // Attach scroll listener to Lenis and window
    if (lenis) {
        const lenisListener = () => handleScroll();
        lenis.on('scroll', lenisListener);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            lenis.off('scroll', lenisListener);
            window.removeEventListener('scroll', handleScroll);
        };
    } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }
    
  }, [isLocked, lenis]);


  // --- 2. Timing Logic (Timed Exit) ---
  // This separate useEffect handles the 3-second delay, running only when visibility changes
  useEffect(() => {
    let timeoutId: number | undefined;

    if (isRobotVisible) {
      // Start the timer when the robot becomes visible
      timeoutId = setTimeout(() => {
        setIsRobotVisible(false); // Hide the robot after DURATION (3 seconds)
      }, DURATION) as unknown as number;
    }

    // Cleanup: Clear the timeout if the component unmounts OR if 
    // isRobotVisible changes (e.g., user scrolls back up before 3s)
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRobotVisible]); // Key: Only depends on isRobotVisible

  // Framer Motion variants remain the same
  const variants = {
    hidden: { x: '100%', opacity: 0.8, rotate: 5, transition: { duration: 0.5, ease: 'easeOut' } },
    visible: { x: '0%', opacity: 1, rotate: 0, transition: { duration: 0.8, type: 'spring', damping: 15, stiffness: 100 } },
  };

  return (
    // Main overlay container (z-index 100)
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
      <AnimatePresence>
        {isRobotVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className={cn(
              "fixed right-0 top-1/2 -translate-y-1/2",
              "size-32 md:size-40",
              "bg-background/90 rounded-full border border-accent/30 shadow-2xl shadow-accent/50",
              "pointer-events-none flex items-center justify-center p-1"
            )}
          >
            {/* Lottie Animation Container (fills the motion.div) */}
            <div className="w-full h-full">
              <Lottie 
                animationData={robotAnimation} 
                loop={true}
                autoplay={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollSlideRobot;