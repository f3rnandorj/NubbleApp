import {Platform} from 'react-native';

import {USER_IP} from '@env';
import axios from 'axios';

const baseUrl = Platform.OS === 'android' ? `${USER_IP}` : 'localhost';

export const api = axios.create({
  baseURL: `http://${baseUrl}:3333/`,
});
