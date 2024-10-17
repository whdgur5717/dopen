import { useClockContext } from './context';

interface ClockFaceProps extends React.SVGProps<SVGCircleElement> {}

export const ClockFace = ({ ...props }: ClockFaceProps) => {
  const { r } = useClockContext();
  return <circle cx={r} cy={r} r={r - 10} {...props} />;
};
