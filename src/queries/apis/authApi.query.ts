import { useMutation, useQuery } from '@tanstack/react-query';
import { ProfileApiResData, SigninApiReq, SignupApiReq, profileApi, signinApi, signupApi } from '~/apis/auth.api';
import { LOCAL_STORAGE_KEY } from '~/shared/constants';

const prefixQueryKey = 'auth';

const authApiQueryKeys = {
  signup: [`${prefixQueryKey}/sign-up`] as const,
  signin: [`${prefixQueryKey}/sign-in`] as const,
  profile: [`${prefixQueryKey}/profile`] as const,
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

export const useUserProfileQuery = () =>
  useQuery<ProfileApiResData | undefined>({
    queryKey: authApiQueryKeys.profile,
    queryFn: async ({ signal }) => {
      const res = await profileApi({ signal });
      return res.data;
    },
    cacheTime: 60000,
    staleTime: Infinity,
  });
