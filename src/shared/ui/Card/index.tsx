import React from 'react';
import { Avatar } from 'shared/ui/avatar';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Root = ({ children }: CardProps) => {
  return (
    <div
      className={flex({
        flexDir: 'column',
        padding: '6',
        gap: '5',
      })}
    >
      {children}
    </div>
  );
};

export const Header = ({
  src,
  main,
  sub,
}: {
  src: string;
  main: string;
  sub: string;
}) => {
  return (
    <div className={flex({ gap: '3', alignItems: 'center' })}>
      <Avatar src={src} size="2xl" cursor="pointer" />
      <span
        className={css({
          textStyle: '2xl',
        })}
      >
        {main}
      </span>
      <span
        className={css({
          textStyle: 'xl',
        })}
      >
        {sub}
      </span>
    </div>
  );
};

export const Content = ({ src, content }: { src: string; content: string }) => {
  return (
    <div
      className={flex({
        flexDir: 'column',
        gap: '5',
      })}
    >
      <img src={src} />
      <div
        className={css({
          textStyle: '2xl',
        })}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

const Card = Object.assign(Root, { Header, Content });

export default Card;
