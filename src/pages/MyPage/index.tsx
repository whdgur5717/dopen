import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { authQueries } from 'entities/auth/api/auth.queries';
import { loginStorageModel } from 'features/login/model/LoginStorageModel';
import { useLogOutMutation } from 'features/logout/mutation';

import MyPageListItem from './MyPageListItem';
import { MYPAGE_LIST } from './myPageList';

const MyPage = () => {
  const navigator = useNavigate();
  const menuListBg = useColorModeValue('#fff', '#1c1c1c');

  const { mutate } = useLogOutMutation();

  const onLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        loginStorageModel.removeToken();
      },
    });
  };

  const {
    data: { _username, _image },
  } = useSuspenseQuery({
    ...authQueries.auth(),
  });

  return (
    <Flex w="100%" flex="1" flexDir="column" m="0 auto">
      <Box padding="20px" flex="1">
        <Box
          width="fit-content"
          margin="15px auto 0"
          cursor="pointer"
          textAlign="center"
          onClick={() => navigator({ to: `/${_username}` })}
        >
          <Box>
            <Avatar w="118px" h="118px" src={_image || ''} />
          </Box>
          <ProfileName>{_username}</ProfileName>
        </Box>
        {MYPAGE_LIST.map((mypage, index) => {
          return (
            <MyPageUl key={index} menuListBg={menuListBg}>
              {mypage.map(({ icon, title, href }, index) => {
                return (
                  <MyPageListItem
                    key={index}
                    icon={icon}
                    title={title}
                    href={href}
                    username={_username}
                  />
                );
              })}
            </MyPageUl>
          );
        })}
        <MyPageUl menuListBg={menuListBg}>
          <li onClick={() => onLogout()}>
            <Text as="strong" fontSize="lg" color="pink.400">
              로그아웃
            </Text>
          </li>
        </MyPageUl>
      </Box>
    </Flex>
  );
};

const ProfileName = styled.strong`
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;
`;

const MyPageUl = styled.ul<{ menuListBg?: '#fff' | '#1c1c1c' }>`
  background-color: ${({ menuListBg }) => menuListBg};
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
