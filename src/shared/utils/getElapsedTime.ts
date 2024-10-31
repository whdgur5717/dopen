export const getElapsedTime = (from: Date, to: Date) => {
  const diff = from.getTime() - to.getTime(); //ms 기준
  const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
  return formatter.format(Math.round(diff / (1000 * 60 * 60 * 24)), 'days');
};
