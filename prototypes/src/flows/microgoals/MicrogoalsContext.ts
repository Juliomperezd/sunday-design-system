import { createContext, useContext } from 'react';

export const MicrogoalsContext = createContext<{
  completed: Set<number>;
  markComplete: (id: number) => void;
  resetAll: () => void;
}>({
  completed: new Set(),
  markComplete: () => {},
  resetAll: () => {},
});

export const useMicrogoals = () => useContext(MicrogoalsContext);
