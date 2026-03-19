import { useCallback, useEffect, useRef, useState } from "react";

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCounterAnimation(target: number, duration: number = 2000) {
  const ref = useRef<HTMLElement | null>(null);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
          animate();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [animate]);

  return { ref, count, isVisible };
}
