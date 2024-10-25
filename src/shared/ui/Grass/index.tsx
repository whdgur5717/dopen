import { type ReactNode, useState } from 'react';
import { css, cx } from 'styled-system/css';
import { grid, gridItem } from 'styled-system/patterns';

export const GrassRoot = ({
  date,
  children,
}: {
  date?: Date;
  children: (currentDate: Date) => ReactNode;
}) => {
  const [currentDate] = useState(date || new Date()); //날짜 기준점

  return (
    <div className={grid({ columns: 7, gap: '5px' })}>
      {children(currentDate)}
    </div>
  );
};

export const GrassCell = ({ opacity }: { opacity: number }) => {
  return (
    <div
      className={cx(
        gridItem({}),
        css({
          width: '20px',
          height: '20px',
          backgroundColor: 'green',
          opacity,
        }),
      )}
    ></div>
  );
};

export const Grass = Object.assign(GrassRoot, {
  Cell: GrassCell,
});
