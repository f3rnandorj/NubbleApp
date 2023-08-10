import {USER_IP} from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: `http://${USER_IP}:3333/`,
  headers: {
    Authorization:
      'Bearer Ng.323X1yzO9KxcXSLDsKMglLFNzlk4Ccmxd6n8IRT8kszbghKJ7aVKsnc9Yd4m',
  },
});
