import { AuthLayout } from '../../components/layout/auth-layout';
import { FieldView, FormBuilder, FormFieldType } from 'styled-hook-form';
import { Button, Card } from 'grommet';
import { useAuth } from '../../components/auth/use-auth';
import { useRouter } from 'next/router';
import { useToast } from '@atomic-web/ui-core';

interface UserPass {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();

  const handleSignIn = ({ username, password }: UserPass) =>
    signIn(username, password).then((success: boolean) => {
      if (success) {
        addToast({
          message: 'Login Successful!',
          type: 'success',
        });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        addToast({
          message: 'Invalid Credentials!',
          type: 'warning',
        });
      }
    });

  return (
    <AuthLayout>
      <Card pad="small">
        <FormBuilder onSubmit={handleSignIn}>
          <FieldView
            name="username"
            label="User Name"
            type={FormFieldType.Text}
          />

          <FieldView
            name="password"
            label="Password"
            type={FormFieldType.Password}
          />
          <Button label="SignIn" type="submit" primary />
        </FormBuilder>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
