import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLoaderData } from '@tanstack/react-router';
import { Heart, MessageSquareText, PencilLine } from 'lucide-react';

const BoardPage = () => {
  const posts = useLoaderData({
    from: '/_auth/Board/_boardlayout/$boardName/',
  });
  return (
    <main className="flex min-h-screen w-full justify-center bg-white">
      <div className="relative w-[428px] bg-white">
        <section className="flex flex-col gap-1">
          {posts.map((post, index) => (
            <>
              <Card key={post.id} className="border-none shadow-none">
                <CardContent className="p-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm text-[#222222]">{post.title}</h3>
                      <p className="mb-1 text-xs text-[#666666]">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#666666]">
                          {post.profiles?.user_name}
                        </span>
                        <span className="text-[#a7a7a7]">1일전</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        <Heart className="size-4" />
                        <span className="text-xs text-[#666666]">0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquareText className="size-4" />
                        <span className="text-xs text-[#666666]">0</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {index !== posts.length - 1 && <Separator />}
            </>
          ))}
        </section>
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2">
          <Button className="rounded-full border border-[#f5c6c2] bg-[#f88585] px-8 py-3 text-white">
            <span>글쓰기</span>
            <PencilLine />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BoardPage;
