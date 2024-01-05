import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import MessagePage from '@/pages/MessagePage';
import MessageListPage from '@/pages/MessageListPage';
import PageLayout from '@/components/PageLayout';
import ErrorPage from '@/pages/404Page';
import SearchPage from '@/pages/SearchPage';
import BoardEnterPage from '@/pages/BoardEnterPage';
import BoardPage from '@/pages/BoardPage';
import UpdateUserInfo from '@/pages/MyPage/UpdateUserInfo';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/account" element={<UpdateUserInfo />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/message" element={<MessageListPage />} />
          <Route path="/message/:userId" element={<MessagePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/board" element={<BoardEnterPage />}>
            <Route path=":boardName" element={<BoardPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
