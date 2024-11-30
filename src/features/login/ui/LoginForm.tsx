import { Button } from '@/components/ui/button';
import { useRouter } from '@tanstack/react-router';
import supabaseClient from 'shared/supabase';

const LoginForm = () => {
  const { navigate } = useRouter();

  const onLogin = async () => {
    const data = await supabaseClient.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (data.error) {
      throw new Error('로그인 실패');
    }
  };

  return (
    <div>
      <div className="relative w-[428px] bg-white">
        <img
          className="mx-auto mt-[127px] h-[78px] w-[198px] cursor-pointer"
          alt="Logo"
          src="https://c.animaapp.com/WpQpY7aW/img/group-1417.svg"
          onClick={() => navigate({ to: '/' })}
        />

        <form className="mt-[130px] space-y-[18px] px-[19px] text-sm text-neutral-700">
          <Button
            type="submit"
            data-action="login"
            onClick={onLogin}
            className="h-[50px] w-full cursor-pointer rounded-[50px] bg-[#fee500] font-bold text-neutral-700"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_8307_22760)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.00002 0.600098C4.02917 0.600098 0 3.71306 0 7.55238C0 9.94012 1.5584 12.0451 3.93152 13.2971L2.93303 16.9446C2.84481 17.2669 3.21341 17.5238 3.49646 17.337L7.87334 14.4483C8.2427 14.4839 8.61808 14.5047 9.00002 14.5047C13.9705 14.5047 17.9999 11.3919 17.9999 7.55238C17.9999 3.71306 13.9705 0.600098 9.00002 0.600098Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_8307_22760">
                  <rect width="17.9999" height="18" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            카카오로 로그인하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
