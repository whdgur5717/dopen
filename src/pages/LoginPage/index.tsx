import LoginDivider from 'features/login/ui/LoginDivider';
import LoginForm from 'features/login/ui/LoginForm';
import LoginLogoTitle from 'features/login/ui/LoginLogoTitle';

const LoginPage = () => {
  return (
    <>
      <LoginLogoTitle />
      <LoginForm />
      <LoginDivider />
    </>
  );
};

export default LoginPage;
