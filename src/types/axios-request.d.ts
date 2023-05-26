export type BaseRequest<P = Record<string, any>, D = Record<string, any>> = {
  /**
   * Using AbortController to cancel request
   *
   * @type {AbortSignal}
   */
  params?: P;
  data?: D;
  signal?: AbortSignal;
};

export type BaseResponse<D = Record<string, any>> = {
  statusCode: number;
  errorCode: number;
  message: string;
  data?: D;
};
