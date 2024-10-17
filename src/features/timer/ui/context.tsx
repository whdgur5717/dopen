import { createContext } from '@radix-ui/react-context';

export const [ClockProvder, useContext] = createContext<{
  r: number;
  minuteDegree: number;
  time: number;
}>('clock', {
  r: 0,
  minuteDegree: 0,
  time: 0,
});

export const useClockContext = () => useContext('clock');
