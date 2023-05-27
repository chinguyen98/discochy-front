import { useMutation } from '@tanstack/react-query';
import { SignupApiReq, signupApi } from '~/apis/auth.api';

const prefixQueryKey = 'chat';

const authApiQueryKeys = {
  signup: [`${prefixQueryKey}/sign-up`] as const,
};

export const useSignupApiMutation = () =>
  useMutation({
    mutationKey: authApiQueryKeys.signup,
    mutationFn: async (data: SignupApiReq) => {
      const res = await signupApi(data);
      return res.data;
    },
  });
