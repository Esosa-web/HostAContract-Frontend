// src/hooks/useDebounce.ts

import { useState, useEffect } from 'react';

// This custom hook takes a value and a delay time (in milliseconds).
// It returns a "debounced" version of that value, which only updates
// after the specified delay has passed without the original value changing.
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the delay.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function. If the 'value' changes before the timer
    // finishes, this function will run and cancel the pending timer.
    // A new timer is then set up with the new value.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if the value or delay changes.

  return debouncedValue;
}

export default useDebounce;