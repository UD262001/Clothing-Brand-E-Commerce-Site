import { useEffect, useState,useRef } from "react";

const useDebounce = (value, delay = 500) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  const firstRender = useRef(true)

  useEffect(() => {

    if (firstRender.current) {
      firstRender.current=false
      return
    }

    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;