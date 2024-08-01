import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/core/providers';
import { LoginResponse } from '.';
import { getErrorMessage, showError } from '@/core/utils';
import authService from './auth.service';
import { queryClient } from '@/core/config/react-query';

export function useLogin() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  return useMutation(authService.login, {
    onSuccess(data) {
      onLogin(data, () => navigate('/app'));
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useRegister() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  return useMutation(authService.register, {
    onSuccess(data) {
      onLogin(data, () =>
        navigate(`/pagamento`, { state: { plate: data.plate } })
      );
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useLogout() {
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  return useMutation(authService.logout, {
    onSuccess() {
      onLogout(() => navigate('/'));
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useForgot() {
  return useMutation(authService.forgot, {
    onSuccess() {
      console.log('Notification');
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useVerify(token?: string) {
  const navigate = useNavigate();

  return useQuery<LoginResponse, AxiosError>(
    ['verifyToken', token],
    () => authService.verifyToken(token),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
        navigate('/');
      },
    }
  );
}

export function useReset() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  return useMutation(authService.reset, {
    onSuccess(data) {
      onLogin(data, () => navigate('/app'));
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useCustomerLogin() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  return useMutation(authService.customerLogin, {
    onSuccess(data) {
      queryClient.invalidateQueries(['orders']);
      onLogin(data, () => navigate('/minhas-consultas'));
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
