"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  demo: string;
  image: string;
}

interface ThreeDCarouselProps {
  projects: Project[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

export const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  projects,
  autoRotate = false,
  autoRotateInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-rotate functionality
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, autoRotateInterval, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCardPosition = (index: number) => {
    const total = projects.length;
    let position = index - currentIndex;

    // Normalize position to be between -total/2 and total/2
    if (position > total / 2) position -= total;
    if (position < -total / 2) position += total;

    return position;
  };

  const getCardStyle = (position: number) => {
    const isCenter = position === 0;
    const isLeft = position < 0;
    const isRight = position > 0;

    // Calculate distance-based properties
    const absPosition = Math.abs(position);
    const scale = isCenter ? 1 : Math.max(0.75, 1 - absPosition * 0.15);
    const blur = isCenter ? 0 : Math.min(absPosition * 3, 8);
    const opacity = isCenter ? 1 : Math.max(0.4, 1 - absPosition * 0.3);
    const zIndex = isCenter ? 20 : 10 - absPosition;
    
    // Calculate translateX based on position
    let translateX = position * 320; // Base spacing
    
    // Calculate rotateY for 3D effect
    let rotateY = 0;
    if (isLeft) {
      rotateY = Math.min(Math.abs(position) * 25, 45);
    } else if (isRight) {
      rotateY = -Math.min(Math.abs(position) * 25, 45);
    }

    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      filter: `blur(${blur}px)`,
      opacity,
      zIndex,
      pointerEvents: isCenter ? ("auto" as const) : ("none" as const),
    };
  };

  return (
    <div 
      className="relative w-full py-12 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]">
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, index) => {
            const position = getCardPosition(index);
            const isVisible = Math.abs(position) <= 2; // Only render nearby cards

            if (!isVisible) return null;

            const style = getCardStyle(position);
            const isCenter = position === 0;

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  ...style,
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={{
                  transform: style.transform,
                  filter: style.filter,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <Card
                  className={cn(
                    "w-[380px] glass-effect border-accent/20 overflow-hidden backdrop-blur-sm transition-all duration-300",
                    isCenter && "shadow-2xl shadow-accent/30 border-accent/40 hover:scale-105"
                  )}
                >
                  {/* Project Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-heading font-bold gradient-text line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 min-h-[4.5rem]">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          className="text-xs px-2.5 py-0.5 bg-primary-foreground/10 border border-primary-foreground/30 font-medium text-primary-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge className="text-xs px-2.5 py-0.5 bg-accent/20 border border-accent/40">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-accent hover:bg-accent/80 text-primary-foreground"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-accent/50 hover:bg-accent/20"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 pointer-events-none z-30">
        <Button
          size="icon"
          variant="outline"
          className="pointer-events-auto bg-background/80 backdrop-blur-sm border-accent/30 hover:bg-accent/20 hover:border-accent/50 shadow-xl"
          onClick={handlePrev}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="pointer-events-auto bg-background/80 backdrop-blur-sm border-accent/30 hover:bg-accent/20 hover:border-accent/50 shadow-xl"
          onClick={handleNext}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 bg-accent"
                : "w-2 bg-accent/30 hover:bg-accent/50"
            )}
          />
        ))}
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="text-center mt-6 text-muted-foreground text-sm">
        Use arrow keys or click buttons to navigate
      </div>
    </div>
  );
};

export default ThreeDCarousel;
