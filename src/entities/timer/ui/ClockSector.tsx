import { useClockContext } from './context';
import { degreesToRadians, getMinuteDegree, getSectorPath } from './timer.util';

// interface ColoredSectorProps extends ComponentProps<'path'> {
//   currentDegree: number;
//   fill: string;
// }

export const ColoredSector = () => {
  const { r, time } = useClockContext();

  const minuteDegree = getMinuteDegree(time % 3600); //시간 제외

  return (
    <path
      d={getSectorPath(r, r, r - 10, 0, degreesToRadians(minuteDegree))} // 0도부터 분침 각도까지
      fill="rgba(255, 0, 0, 0.3)"
    />
  );
};
