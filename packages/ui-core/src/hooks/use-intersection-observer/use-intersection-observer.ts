import { useEffect } from 'react';
import { makeArrayPayload } from '../../utils/misc';

export interface UseIntersectionObserverReturn {
  entry: unknown;
  isIntersecting: boolean;
}

const useIntersectionObserver = (options : IntersectionObserverInit): UseIntersectionObserverReturn => {

    useEffect(() => {
    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      obi: IntersectionObserver
    ) => {
        entries.forEach((entry)=>{
            const treshoulds = makeArrayPayload(options.threshold); 

            const inViewport = entry.isIntersecting &&
                               treshoulds.some(t=>entry.intersectionRatio >= t);
            //@ts-ignore
            if (options.trackVisibility && typeof entry.isVisible === 'undefined'){
              //@ts-ignore 
              entry.isVisible = inViewport;
            }
                               
        })
    };

    const observer = new IntersectionObserver(handleIntersect);
  }, [options.threshold]);

  return {
    isIntersecting: true,
  };
};
