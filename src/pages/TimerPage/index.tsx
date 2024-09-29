import { useMemo, useState } from 'react';
import { useInterval } from 'shared/hook/useInterval';

interface AnalogClockProps {
  size?: number;
  hourHandColor?: string;
  minuteHandColor?: string;
  secondHandColor?: string;
  faceColor?: string;
  markersColor?: string;
  defaultValue: number;
}

const degree = (seconds: number) => {
  const getMinuteDegree = () => {
    return (seconds / 60) * 6;
  };

  return { getMinuteDegree };
};

const getSectorPath = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = {
    x: cx + r * Math.sin(startAngle),
    y: cy - r * Math.cos(startAngle),
  };
  const end = {
    x: cx + r * Math.sin(endAngle),
    y: cy - r * Math.cos(endAngle),
  };
  const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
};

export default function AnalogClock({
  size = 400,
  minuteHandColor = 'black',
  faceColor = 'white',
  markersColor = 'black',
  defaultValue,
}: AnalogClockProps) {
  const [time, setTime] = useState(defaultValue || 0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setTime((_time) => _time - 1);
    },
    1000,
    time > 0 && isRunning,
  );

  const d = useMemo(() => degree(time), [time]);
  const r = size / 2;

  const minuteDegrees = d.getMinuteDegree();

  const clockFace = (
    <circle
      cx={r}
      cy={r}
      r={r - 5}
      fill={faceColor}
      stroke={markersColor}
      strokeWidth="2"
    />
  );

  // 0분부터 현재 분침 위치까지 색칠하기
  const coloredSector = (
    <path
      d={getSectorPath(r, r, r - 5, 0, (minuteDegrees * Math.PI) / 180)} // 0도부터 분침 각도까지
      fill="rgba(255, 0, 0, 0.3)" // 색상 및 투명도 설정
    />
  );

  const hourMarkers = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 * Math.PI) / 180;
    const markerRadius = r * 0.9;
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
          stroke={markersColor}
          strokeWidth="2"
          onPointerDown={() => {
            setTime(i * 60); // 마커 클릭 시 시간을 초 단위로 설정
          }}
          style={{ cursor: 'pointer' }}
        />
      </g>
    );
  });

  const minuteHand = (
    <line
      x1={r}
      y1={r}
      x2={r + size * 0.35 * Math.sin((minuteDegrees * Math.PI) / 180)}
      y2={r - size * 0.35 * Math.cos((minuteDegrees * Math.PI) / 180)}
      stroke={minuteHandColor}
      strokeWidth="3"
      strokeLinecap="round"
    />
  );

  const handleClick = (event: React.PointerEvent<SVGSVGElement>) => {
    const svg = event.currentTarget; // 클릭된 SVG 요소 참조
    const rect = svg.getBoundingClientRect();

    // 클릭한 위치의 SVG 내부 좌표 계산
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // 원의 중심 좌표
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 중심에서 클릭한 위치까지의 상대적인 x, y 차이 계산
    const deltaX = clickX - centerX;
    const deltaY = centerY - clickY; // y 축은 아래로 증가하기 때문에 중심에서 뺌

    // 각도 계산 (라디안 단위)
    let angleRadians = Math.atan2(deltaY, deltaX);

    // 기준점을 12시 방향으로 변경 (270도, 즉 -90도 라디안)
    angleRadians -= Math.PI / 2;

    // 각도를 도(degree)로 변환
    let angleDegrees = (angleRadians * 180) / Math.PI;

    if (angleDegrees > 0 && angleDegrees <= 90) {
      angleDegrees = 360 - angleDegrees;
    }
    // 분 단위 각도를 초로 변환하여 설정 (한 바퀴가 360도이므로 60분 -> 360도, 1분은 6도)
    const seconds = (Math.abs(angleDegrees) / 6) * 60;

    setTime(seconds);
  };

  return (
    <div>
      <svg width={size} height={size} onPointerUp={(e) => handleClick(e)}>
        {clockFace}
        {coloredSector}
        {hourMarkers}
        {minuteHand}
        <circle cx={r} cy={r} r="5" fill={markersColor} />
      </svg>
      <button onClick={() => setIsRunning(true)}>시작</button>
      <button onClick={() => setIsRunning(false)}>정지</button>
      <p>{time}초</p>
    </div>
  );
}
