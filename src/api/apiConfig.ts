import {Platform} from 'react-native';

import {USER_IP} from '@env';
import axios, {AxiosError} from 'axios';

import {authService} from '@domain';

import {AuthCredentials} from '../domain/Auth/authTypes';

type CustomAxiosConfig = AxiosError['config'] & {sent: boolean};

type InterceptorProps = {
  authCredentials: AuthCredentials | null;
  removeCredentials: () => Promise<void>;
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
};

const baseUrl = Platform.OS === 'android' ? `${USER_IP}` : 'localhost';

export const api = axios.create({
  baseURL: `http://${baseUrl}:3333/`,
});

export function registerInterceptor({
  authCredentials,
  removeCredentials,
  saveCredentials,
}: InterceptorProps) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async (responseError: AxiosError) => {
      const status = responseError?.response?.status;

      const failedRequest = responseError?.config as CustomAxiosConfig;
      const hasNotRefreshToken = !authCredentials?.refreshToken;
      const isRefreshTokenRequest =
        authService.isRefreshTokenRequest(failedRequest);

      if (status === 401 && failedRequest) {
        if (
          hasNotRefreshToken ||
          isRefreshTokenRequest ||
          failedRequest.sent === true
        ) {
          removeCredentials();
          return Promise.reject(responseError);
        }

        failedRequest.sent = true;

        const newAuthCredentials = await authService.authenticateByRefreshToken(
          authCredentials?.refreshToken,
        );

        saveCredentials(newAuthCredentials);

        failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`;

        return api(failedRequest);
      }

      return Promise.reject(responseError);
    },
  );

  return () => api.interceptors.response.eject(interceptor);
}
