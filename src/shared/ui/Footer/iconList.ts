import {
  MdHome,
  MdOutlineMessage,
  MdOutlineTimer,
  MdPersonOutline,
} from 'react-icons/md';

export const iconList = [
  {
    icon: MdHome,
    text: '홈',
    path: '/',
    routeMatch: '',
  },
  {
    icon: MdOutlineTimer,
    text: '타이머',
    path: '/timer',
  },
  {
    icon: MdOutlineMessage,
    text: '게시판',
    path: '/board',
  },
  {
    icon: MdPersonOutline,
    text: '내정보',
    path: '/mypage',
  },
] as const;
