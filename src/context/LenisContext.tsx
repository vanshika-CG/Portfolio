// src/context/LenisContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis'; // Updated official import

type LenisContextType = Lenis | null;
const LenisContext = createContext<LenisContextType>(null);

export const useLenisContext = () => useContext(LenisContext);

export const LenisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1, // Smooth linear interpolation
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
};