import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Text, Avatar } from '@chakra-ui/react';
import { FaUserCircle, FaClipboardList, FaPen } from 'react-icons/fa';
import { logOut } from '@/apis/authentication';
import { removeItem } from '@/utils/storage';
import { LOGIN_TOKEN } from '@/constants/user';
import MyPageListItem from './MyPageListItem';
import { DEFAULT_WIDTH } from '@/constants/style';

const myPageList = [
  [
    {
      icon: FaUserCircle,
      title: '회원정보 수정',
      href: '/mypage/account',
    },
  ],
  [
    {
      icon: FaClipboardList,
      title: '내가 작성한 게시글 보기',
      href: '/mypage/myboardlist',
    },
    {
      icon: FaPen,
      title: '내가 작성한 댓글 보기',
      href: '/mypage/mycommentlist',
    },
  ],
];

const MyPage = () => {
  const navigator = useNavigate();

  const onLogOut = () => {
    logOut();
    removeItem(LOGIN_TOKEN);
    navigator('/', { replace: true });
  };

  return (
    <Box
      maxW={DEFAULT_WIDTH}
      m="0 auto"
      border="1px solid"
      textAlign="center"
      padding="0 20px"
    >
      <Box>
        <Box mt={15}>
          <Avatar
            size="118px"
            name="프로필 이미지"
            src="https://via.placeholder.com/118x118"
          />
        </Box>
        <ProfileName>공부하는 민수</ProfileName>
      </Box>
      {myPageList.map((mypage, index) => {
        return (
          <MyPageUl key={index}>
            {mypage.map(({ icon, title, href }, index) => {
              return (
                <MyPageListItem
                  key={index}
                  icon={icon}
                  title={title}
                  href={href}
                />
              );
            })}
          </MyPageUl>
        );
      })}
      <MyPageUl>
        <li onClick={onLogOut}>
          <Text as="strong" fontSize="lg" color="pink.400">
            로그아웃
          </Text>
        </li>
      </MyPageUl>
    </Box>
  );
};

const ProfileName = styled.strong`
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const MyPageUl = styled.ul`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: rgba(17, 12, 46, 0.05) 0px 1px 100px 0px;
  margin-top: 20px;
  & > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 65px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default MyPage;