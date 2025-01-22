"use client";

import { cn } from "@/utils/classNameMerge";
import Lenis from "lenis";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const ScrollWrapper = ({ children, className }: Props) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: scrollContainerRef.current ?? undefined, // Custom scroll wrapper
      duration: 1.2, // Scroll duration (seconds)
      orientation: "horizontal",
      gestureOrientation: "both",
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    });

    const onScroll = (time: number) => {
      lenis.raf(time); // Update Lenis on every animation frame
    };

    requestAnimationFrame(function animate(time) {
      onScroll(time);
      requestAnimationFrame(animate);
    });

    return () => {
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className={cn("overflow-hidden ", className)}>
      {children}
    </div>
  );
};

export default ScrollWrapper;
