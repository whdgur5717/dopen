export const getMinuteDegree = (seconds: number) => {
  return (seconds / 60) * 6;
};

export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const getSectorPath = (
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
