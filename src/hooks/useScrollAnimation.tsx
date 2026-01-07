// src/hooks/useScrollAnimation.tsx
import { useEffect, useRef, useState } from 'react';
import { useLenisContext } from '@/context/LenisContext';

export const useScrollAnimation = (options = { threshold: 0.1, triggerOnce: true }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce) observer.unobserve(element);
      }
    }, { threshold: options.threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.triggerOnce]);

  return { elementRef, isVisible };
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const lenis = useLenisContext();
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: any) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setProgress(e.progress * 100);
      });
    };

    lenis.on('scroll', handleScroll);
    return () => {
      lenis.off('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lenis]);

  return progress;
};