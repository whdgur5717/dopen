import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RouterProvider,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from 'features/login/ui/LoginForm';
import { beforeEach, describe, expect, test } from 'vitest';

describe('로그인 테스트', () => {
  beforeEach(() => {
    const rootRoute = createRootRoute();

    const router = createRouter({
      routeTree: rootRoute,
    });

    const queryClient = new QueryClient({});
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} defaultComponent={LoginForm} />
      </QueryClientProvider>,
    );
  });
  test('아이디와 비밀번호를 입력하지 않을 경우 로그인 버튼이 비활성화 된다', () => {
    const eamilInput = screen.getByLabelText('email');
    const pwInput = screen.getByLabelText('password');
    const button = screen.getByRole('button', { name: /로그인/ });
    fireEvent.change(eamilInput, { target: { value: '' } });
    fireEvent.change(pwInput, { target: { value: '' } });
    expect(button?.disabled).toBe(true);
  });

  test('형식에 맞지 않을 경우 에러메시지가 출력된다', () => {});
});
