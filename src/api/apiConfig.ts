import {USER_IP} from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: `http://${USER_IP}:3333/`,
  headers: {
    Authorization:
      'Bearer Mw.8SifWifClQC0qI60HhOyMo9zYvKwsy4o_tFiNUMB6YZoiIdWMwHxkbrItVTb',
  },
});
