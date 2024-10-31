import { useClockContext } from './context';
import { degreesToRadians } from './timer.util';

export const HourMarkers = () => {
  const { r } = useClockContext();
  return Array.from({ length: 12 }, (_, i) => {
    const angle = degreesToRadians(i * 30);
    const markerRadius = r - 10;
    const x1 = r + (markerRadius - 10) * Math.sin(angle);
    const y1 = r - (markerRadius - 10) * Math.cos(angle);
    const x2 = r + markerRadius * Math.sin(angle);
    const y2 = r - markerRadius * Math.cos(angle);

    return (
      <g key={i}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="2"
          style={{ cursor: 'pointer' }}
        />
        <text>{i}</text>
      </g>
    );
  });
};
