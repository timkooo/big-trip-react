import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const SERVER_URL = 'https://17.ecmascript.pages.academy/big-trip';
const TIMEOUT = 5000;

export const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIMEOUT,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }
    config.headers['Authorization'] = 'Basic fsdfa5325jkl25';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (
//       error.response &&
//       error.response.status === StatusCodeMapping.UNAUTHORIZED
//     ) {
//       if (
//         error.response.config.url !== `/${AppRoutes.Login}`
//       ) {
//         toast.warn(error.response.data.error, {
//           toastId: 'authorization',
//         });
//       }
//     }
//     if (
//       error.response &&
//       error.response.status === StatusCodeMapping.NOT_FOUND
//     ) {
//       if (
//         error.response.config.url !== APIRoutes.Places &&
//         error.response.config.url !== APIRoutes.Login
//       ) {
//         history.replace(AppRoutes.PageNotFound);
//       }
//       if (error.response.config.url === APIRoutes.Places) {
//         toast.warn('Не удалось получить данные от сервера', {
//           toastId: 'bad_request',
//         });
//       }
//     }
//     if (
//       error.response &&
//       error.response.status === StatusCodeMapping.BAD_REQUEST
//     ) {
//       toast.warn(error.response.data.error, {
//         toastId: 'bad_request',
//       });
//     }
//     throw error;
//   }
// );
