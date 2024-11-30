import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useRouter } from '@tanstack/react-router';
import { useLoginMutation } from 'features/login/api/login.mutation';
import { LoginFormData } from 'features/login/model/type';
import { LockIcon, MailCheckIcon } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';

import { loginInputFields } from '../lib/loginInputFields';
import { useLoginForm } from '../lib/useLoginForm';

const LoginForm = () => {
  const {
    navigate,
    state: { location },
    history,
  } = useRouter();

  const { registerField, errors, setError, handleSubmit, isSubmitting } =
    useLoginForm();

  const navigateLocation = () => {
    alert('로그인 성공');
    const searchParams = new URLSearchParams(location.href);
    const redirectUrl = searchParams.get('redirect') || '/';
    navigate({ to: redirectUrl });
  };

  const { mutate } = useLoginMutation();

  const onLogin: SubmitHandler<LoginFormData> = async (data) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigateLocation();
        },
        onError: (error) => {
          console.log(error);
          if (error.response?.status === 400) {
            setError(
              'password',
              { message: '비밀번호를 확인해주세요.' },
              { shouldFocus: true },
            );
          }
        },
      },
    );
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

        <form
          className="mt-[130px] space-y-[18px] px-[19px] text-sm text-neutral-700"
          onSubmit={handleSubmit(onLogin)}
        >
          {loginInputFields.map(({ name, type, placeholder }) => (
            <div key={name} className="relative">
              <Input
                className="h-[50px] rounded-[5px] bg-[#f0f0f099] pl-[15px]"
                type={type}
                placeholder={placeholder}
                {...registerField(name)}
              />
              {name === 'email' ? (
                <MailCheckIcon className="absolute right-[15px] top-1/2 size-5 -translate-y-1/2" />
              ) : (
                <LockIcon className="absolute right-[15px] top-1/2 size-5 -translate-y-1/2" />
              )}
              {errors[name] && (
                <p
                  className="mt-2 text-left text-sm text-[#f88585]"
                  data-testid={name + 'errormessage'}
                >
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}
          <div className="ml-[18px] flex items-center gap-2">
            <Checkbox
              id="emailRemember"
              className="size-5 bg-[#f88585]"
              {...registerField('keepLoggedIn')}
            />
            <label
              htmlFor="emailRemember"
              className="font-['Noto_Sans_KR'] text-xs text-[#666666]"
            >
              아이디 저장하기
            </label>
          </div>
          <Button
            type="submit"
            data-action="login"
            disabled={isSubmitting}
            className="h-[50px] w-full cursor-pointer rounded-[50px] bg-[#f88585] font-bold text-white"
          >
            로그인
          </Button>
          <Button
            type="button"
            data-action="signin"
            onClick={() => history.back()}
            className="h-[50px] w-full rounded-[50px] bg-[#f5c6c2] font-bold text-white"
          >
            회원가입 하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
