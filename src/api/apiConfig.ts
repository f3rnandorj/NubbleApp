import {Platform} from 'react-native';

import {USER_IP} from '@env';
import axios from 'axios';

const baseUrl = Platform.OS === 'android' ? `${USER_IP}` : 'localhost';

export const api = axios.create({
  baseURL: `http://${baseUrl}:3333/`,
  headers: {
    Authorization:
      'Bearer MQ.AxdpwSIh7NUiUs5tRnh97YUP2Entrzus1EW852vAZMEEpTgaecAVwq3yZIsj',
  },
});
