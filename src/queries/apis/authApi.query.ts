import { useMutation } from '@tanstack/react-query';
import { SignupApiReq, signupApi } from '~/apis/auth.api';
import { LOCAL_STORAGE_KEY } from '~/shared/constants';

const prefixQueryKey = 'chat';

const authApiQueryKeys = {
  signup: [`${prefixQueryKey}/sign-up`] as const,
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
    cacheTime: 30000,
  });
