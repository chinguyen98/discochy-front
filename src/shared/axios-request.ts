import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { WS_API } from '~/configs';

interface AxiosCustomConfigOptions extends AxiosRequestConfig {
  data?: Record<string, any>;
  params?: Record<string, any>;
}

const instance = axios.create({
  baseURL: WS_API,
  timeout: 50000,
  // transformRequest: [(data) => JSON.stringify(data)],
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  // },
  validateStatus: (status) => {
    return true;
  },
});

instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = 'useAuthStore.getState().accessToken';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.errorCode === 1) {
      return Promise.reject(response.data.message);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const clean = (obj: any) => {
  if (!obj) {
    return obj;
  }
  const data = { ...obj };
  for (const propName in data) {
    if ([null, undefined, 'null', 'undefined'].includes(data[propName])) {
      delete data[propName];
    }
  }
  return JSON.stringify(data) === '{}' ? null : data;
};

const axiosHandling = <R = any>(options: AxiosCustomConfigOptions): Promise<R> => {
  const data = clean(options.data);
  const params = clean(options.params);
  const promise: any = new Promise((resolve, reject) => {
    instance({
      ...options,
      data,
      params,
    })
      .then((response: Pick<AxiosResponse<R>, 'data'>) => resolve(response.data))
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

export const multipart = <R = any>(url: string, form_data: any, processingCallback?: any): Promise<R> => {
  const promise: any = new Promise((resolve, _) => {
    instance
      .post(url, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoyLCJwYXJ0bmVyX3VzZXJfaWQiOiI1MjUwMTkiLCJtYWpvcl9pZCI6bnVsbCwibmFtZSI6Ik5n4buNYyBUZXN0MiIsImlhdCI6MTY4NDg5OTg4M30.kEpxQYNKbUvWAw3mx7zpO4VJhfR-pPH___yKSTiSve0',
        },
        onUploadProgress: ({ loaded, total }) => {
          if (total) {
            const percent = Math.floor((loaded * 100) / total);
            if (processingCallback) {
              processingCallback(percent);
            }
          }
        },
      })
      .then((response) => resolve(response.data));
  });
  return promise;
};

export default axiosHandling;
