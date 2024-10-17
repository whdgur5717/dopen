import { useClockContext } from './context';

export const ClockHand = () => {
  const { r, minuteDegree } = useClockContext();
  return (
    <line
      x1={r}
      y1={r}
      x2={r + r * 2 * 0.35 * Math.sin((minuteDegree * Math.PI) / 180)}
      y2={r - r * 2 * 0.35 * Math.cos((minuteDegree * Math.PI) / 180)}
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
};
