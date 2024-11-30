// components/layouts/MainLayout.tsx
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRouter } from '@tanstack/react-router';
import {
  BellDotIcon,
  Home,
  MailCheckIcon,
  MoonIcon,
  SearchCheckIcon,
  Timer,
  User2Icon,
} from 'lucide-react';

const navigationItems = [
  { icon: Home, label: '홈', active: true, nagivate: '/' },
  { icon: Timer, label: '타이머', nagivate: '/timer' },
  { icon: User2Icon, label: '내정보', nagivate: '/login' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { navigate } = useRouter();

  return (
    <div className="relative h-[926px] w-[428px] bg-white">
      <header className="flex items-center justify-between p-5">
        <img
          className="h-[51px]"
          alt="Logo"
          src="https://c.animaapp.com/dVZx0erv/img/group-1417.svg"
        />
        <div className="flex items-center gap-4">
          <MoonIcon className="size-6" />
          <MailCheckIcon className="size-6" />
          <SearchCheckIcon className="size-6" />
          <div className="relative">
            <BellDotIcon className="size-6" />
            <Badge className="absolute -right-1 -top-1 flex size-4 items-center justify-center bg-red-500">
              2
            </Badge>
          </div>
        </div>
      </header>

      <Separator className="mx-5" />

      <main>{children}</main>

      <nav className="fixed bottom-0 w-[428px] border-t border-[#d9d9d9] bg-[#f9f9f9]">
        <div className="flex justify-around py-5">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center"
              onClick={() => navigate({ to: item.nagivate })}
            >
              <item.icon className="size-6" />
              <span
                className={`mt-2 text-[10px] font-semibold ${
                  item.active ? 'text-[#f88585]' : 'text-[#222222]'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
