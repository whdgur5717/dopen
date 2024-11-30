import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Link } from '@tanstack/react-router';
import { useSession } from 'entities/auth/SessionContext';

const boardItems = [
  { title: '인증 & 회고 게시판', content: '냐옹이가 냐옹냐옹 놀고 있습니다.' },
  { title: '자유게시판', content: '냐옹이가 냐옹냐옹 놀고 있습니다.' },
  { title: '정보공유 게시판', content: '냐옹이가 냐옹냐옹 놀고 있습니다.' },
];

const MainPage = () => {
  const { session, signOut } = useSession();

  return (
    <div className="relative h-[926px] w-[428px] bg-white">
      <div className="flex gap-5 p-5">
        <Avatar className="size-[118px]">
          <AvatarImage src={session?.user.user_metadata.avatar_url || ''} />
          <AvatarFallback />
        </Avatar>
        <div className="flex items-center justify-center gap-5">
          {session === null ? (
            <div className="flex flex-col">
              <Button asChild>
                <Link to="/Login">로그인</Link>
              </Button>
              <p className="text-sm text-[#a7a7a7]">
                가장 바쁜 사람이 가장 많은 시간을 갖는다.
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 text-[22px]">
                <span className="font-bold text-[#f88585]">
                  {session.user.user_metadata.user_name}
                </span>
                <span className="text-[#222222]">님 안녕하세요 !</span>
              </div>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <h3 className="text-xl font-bold">크리스마스</h3>
            <p className="text-base">2023.12.25</p>
          </div>
          <span className="text-xl font-bold">D-7</span>
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent></DialogContent>
      </Dialog>

      <div className="space-y-5 p-5">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-bold">2023년 12월</h3>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[22px] font-medium">게시판</h3>
            <div className="flex items-center text-[#666666]">
              <span>더 보기</span>
              <img
                className="size-4"
                alt="Arrow"
                src="https://c.animaapp.com/dVZx0erv/img/vuesax-linear-arrow-right.svg"
              />
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-4">
            {boardItems.map((item, index) => (
              <div key={index} className="flex justify-between gap-4">
                <span className="text-[15px] font-medium">{item.title}</span>
                <span className="text-xs font-medium">{item.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={() => signOut()} className="w-full">
        로그아웃
      </Button>
    </div>
  );
};

export default MainPage;
