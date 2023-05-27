import axios from '~/shared/axios-request';
import { BaseRequest, BaseResponse } from '~/types/axios-request';

const prefix = '/auth';

/* Signup api  */

export type SignupApiReqParams = {
  email: string;
  username: string;
  password: string;
  phone_number: string;
  date_of_birth: string;
};

export type SignupApiReq = BaseRequest<SignupApiReqParams>;

export type SignupApiResData = {
  accessToken: string;
};

export type SignupApiRes = BaseResponse<SignupApiResData>;

export const signupApi = (req: SignupApiReq) => {
  return axios<SignupApiRes>({
    url: `${prefix}/sign-up`,
    method: 'POST',
    data: req.data,
    signal: req.signal,
  });
};

/* Signup api  */
