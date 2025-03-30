import { useEffect, useRef } from 'react';

const useInfiniteScrollObserver = (
  observerCallback: IntersectionObserverCallback,
  observerOptions: IntersectionObserverInit,
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback, observerOptions);

    if (lastContentRef.current) {
      observer.current.observe(lastContentRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [observerCallback, observerOptions]);

  return { lastContentRef };
};

export default useInfiniteScrollObserver;
