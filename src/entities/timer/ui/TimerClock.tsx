import { useRef, useState } from 'react';
import { useInterval } from 'shared/hook/useInterval';
import { BrowserStorageModel } from 'shared/utils/StorageModel';

import Clock from './ClockRoot';
import { ClockProvder } from './context';
import { getMinuteDegree } from './timer.util';

class TimerStorageModel extends BrowserStorageModel<'timer_start'> {
  private readonly timer = 'timer_start';
  constructor() {
    super();
  }
  getItem(): Date {
    const data = this.get(this.timer);
    if (!data) {
      return new Date();
    } else {
      return new Date(JSON.parse(data));
    }
  }
  setItem(date: string) {
    this.set(this.timer, date);
  }
}

interface TimerClockProps {
  size?: number;
  hourHandColor?: string;
  minuteHandColor?: string;
  secondHandColor?: string;
  faceColor?: string;
  markersColor?: string;
  defaultValue?: number;
}

export default function TimerClock({
  size = 300,
  defaultValue = 0,
}: TimerClockProps) {
  const storage = useRef(new TimerStorageModel());

  const [time, setTime] = useState(defaultValue || 0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setTime((_time) => _time + 1);
    },
    1000,
    isRunning,
  );

  const r = size / 2;

  const minuteDegrees = getMinuteDegree(time);

  const onTimerStart = () => {
    if (isRunning) {
      return;
    }
    storage.current.setItem(JSON.stringify(new Date()));
    setIsRunning(true);
  };

  const onTimerEnd = async () => {
    setIsRunning(false);
    //TODO : 시작시간과 끝나는시간 계산해서 서버에 요청하기
    // const startTime = storage.current.getItem();
    // const endTime = new Date();
    // const diff = differenceInMilliseconds(endTime, startTime);
  };

  // const handleClick = (event: React.PointerEvent<SVGSVGElement>) => {
  //   const svg = event.currentTarget; // 클릭된 SVG 요소 참조
  //   const rect = svg.getBoundingClientRect();

  //   // 클릭한 위치의 SVG 내부 좌표 계산
  //   const clickX = event.clientX - rect.left;
  //   const clickY = event.clientY - rect.top;

  //   // 원의 중심 좌표
  //   const centerX = rect.width / 2;
  //   const centerY = rect.height / 2;

  //   // 중심에서 클릭한 위치까지의 상대적인 x, y 차이 계산
  //   const deltaX = clickX - centerX;
  //   const deltaY = centerY - clickY; // y 축은 아래로 증가하기 때문에 중심에서 뺌

  //   // 각도 계산 (라디안 단위)
  //   let angleRadians = Math.atan2(deltaY, deltaX);

  //   // 기준점을 12시 방향으로 변경 (270도, 즉 -90도 라디안)
  //   angleRadians -= Math.PI / 2;

  //   // 각도를 도(degree)로 변환
  //   let angleDegrees = (angleRadians * 180) / Math.PI;

  //   if (angleDegrees > 0 && angleDegrees <= 90) {
  //     angleDegrees = 360 - angleDegrees;
  //   }
  //   // 분 단위 각도를 초로 변환하여 설정 (한 바퀴가 360도이므로 60분 -> 360도, 1분은 6도)
  //   const seconds = (Math.abs(angleDegrees) / 6) * 60;

  //   function convertToMinuteUnits(seconds: number): number {
  //     const minutes = Math.floor(seconds / 60); // 분으로 변환 (소수점 아래 버림)
  //     const result = minutes * 60; // 분을 다시 초로 변환
  //     return result;
  //   }

  //   setTime(convertToMinuteUnits(seconds));
  // };

  return (
    <ClockProvder r={r} minuteDegree={minuteDegrees} time={time}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Clock size={size} time={time}>
          <Clock.Face fill="white" stroke="black" strokeWidth={5} />
          <Clock.Sector />
          <Clock.Hand />
          <Clock.Markers />
          <circle cx={size / 2} cy={size / 2} r="5" fill="black" />
        </Clock>
        <button onClick={onTimerStart}>시작</button>
        <button onClick={onTimerEnd}>정지</button>
        <p>
          {Math.floor(time / 60)} : {time % 60}
        </p>
      </div>
    </ClockProvder>
  );
}
