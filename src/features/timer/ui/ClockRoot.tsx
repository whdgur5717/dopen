import React from 'react';

import { ClockFace } from './ClockFace';
import { ClockHand } from './ClockHand';
import { ColoredSector } from './ClockSector';
import { HourMarkers } from './HourMarker';
import { ClockProvder } from './context';
import { getMinuteDegree } from './timer.util';

// ClockProvder는 컨텍스트 제공자 역할

// Clock 컴포넌트를 Root로 정의, Provider 역할 수행
const Clock = ({
  children,
  size,
  time,
}: {
  children: React.ReactNode;
  size: number;
  time: number;
}) => {
  const r = size / 2;
  const minuteDegrees = getMinuteDegree(time);

  return (
    <ClockProvder r={r} minuteDegree={minuteDegrees} time={time}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {children} {/* 이 안에 다른 시계 컴포넌트들이 들어감 */}
      </svg>
    </ClockProvder>
  );
};

// 하위 컴포넌트 정의
Clock.Face = ClockFace;
Clock.Hand = ClockHand;
Clock.Sector = ColoredSector;
Clock.Markers = HourMarkers;

export default Clock;
