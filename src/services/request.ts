import type { RequestOptionsInit, ResponseError } from 'umi-request';
import { extend } from 'umi-request';

function errorHandler(error: ResponseError<any>) {
  if (!error.response) {
    // 请求初始化时出错或者没有响应返回的异常
    // eslint-disable-next-line no-console
    console.log(error.message);
  }

  throw error;
}

const request = extend({
  prefix: `${process.env.BASE_URL}/api`,
  timeout: 1000,
  credentials: 'omit',
  errorHandler,
});

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`,
      },
    } as RequestOptionsInit,
  };
});

export { request };
