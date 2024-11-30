import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useRouter } from '@tanstack/react-router';
import { useSignupMutation } from 'features/signup/api/signup.mutation';
import { useSignupForm } from 'features/signup/lib/useSignupForm';
import { signupInputFields } from 'features/signup/lib/userInputList';
import type { SignupFormData } from 'features/signup/model/type';

const SignUp = () => {
  const { navigate } = useRouter();
  const { registerField, errors, handleSubmit, setError } = useSignupForm();
  const { mutate } = useSignupMutation();

  const onSignupHandler = (data: SignupFormData) => {
    mutate(data, {
      onSuccess() {
        alert('회원가입 성공');
        navigate({ to: '/' });
      },
      onError(error) {
        setError('email', { message: error.message }, { shouldFocus: true });
      },
    });
  };

  return (
    <div className="flex w-full justify-center bg-white">
      <div className="relative h-[926px] w-[428px] bg-white">
        <div className="mb-8 flex justify-center gap-2">
          <span className="text-sm text-black">이미 회원이신가요?</span>
          <Link to="/Login" className="cursor-pointer text-sm text-[#f88585]">
            로그인하기
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSignupHandler)}>
          <div className="space-y-[18px] px-5">
            {signupInputFields.map(({ name, type, placeholder }) => (
              <div key={name} className="relative">
                <Input
                  type={type}
                  placeholder={placeholder}
                  className="h-[50px] border-none bg-[#f0f0f099] text-sm placeholder:text-neutral-300"
                  {...registerField(name)}
                />
                {errors[name] && (
                  <p className="mt-2 text-sm text-pink-300">
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            ))}

            <Button className="h-[50px] w-full rounded-[50px] bg-[#f88585] text-base font-bold hover:bg-[#f88585]/90">
              가입하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
