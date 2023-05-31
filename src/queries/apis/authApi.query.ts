import { useMutation } from '@tanstack/react-query';
import { SigninApiReq, SignupApiReq, signinApi, signupApi } from '~/apis/auth.api';
import { LOCAL_STORAGE_KEY } from '~/shared/constants';

const prefixQueryKey = 'chat';

const authApiQueryKeys = {
  signup: [`${prefixQueryKey}/sign-up`] as const,
  signin: [`${prefixQueryKey}/sign-in`] as const,
};

export const useSignupApiMutation = () =>
  useMutation({
    mutationKey: authApiQueryKeys.signup,
    mutationFn: async (data: SignupApiReq) => {
      const res = await signupApi(data);
      if (res.data?.accessToken) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res.data.accessToken);
      }
      return res.data;
    },
  });

export const useSigninApiMutation = () =>
  useMutation({
    mutationKey: authApiQueryKeys.signin,
    mutationFn: async (data: SigninApiReq) => {
      const res = await signinApi(data);
      if (res.data?.accessToken) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res.data.accessToken);
      }
      return res.data;
    },
  });
