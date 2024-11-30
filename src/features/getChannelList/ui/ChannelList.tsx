import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { ArrowLeftCircleIcon } from 'lucide-react';

const ChannelList = () => {
  const navigate = useNavigate();
  const boardItems = [
    {
      title: '인증 & 회고 게시판',
      id: 1,
    },
    { title: '자유 게시판', id: 2 },
    { title: '정보공유 게시판', id: 3 },
  ];

  const { data: channelListData } = useQuery(channelQueries.channelList());

  return (
    <div className="flex flex-row justify-center bg-white">
      <div className="relative h-[926px] w-[428px] bg-white">
        <main className="px-5">
          <Card className="border-none shadow-none">
            <CardContent className="space-y-[30px] p-0">
              {channelListData?.map((channel, index) => (
                <div
                  key={channel.id}
                  onClick={() =>
                    navigate({ to: `/Board/${channel.board_name}` })
                  }
                >
                  <div className="flex cursor-pointer items-center justify-between py-2">
                    <span className="text-xl font-medium text-black">
                      {channel.display}
                    </span>
                    <ArrowLeftCircleIcon className="rotate-180" />
                  </div>
                  {index < boardItems.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ChannelList;
