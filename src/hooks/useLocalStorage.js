import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage){
      
      const items=JSON.parse(window.localStorage.getItem(key));
    
      return items ?? defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
    
  }, [key, state]);

  return [state, setState];
}