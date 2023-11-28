import {api, PageApi} from '@api';

import {UserAPI} from './userTypes';

export const USER_PATH = 'users';

async function getById(userId: string): Promise<UserAPI> {
  const response = await api.get(`${USER_PATH}/${userId}`);

  return response.data;
}

async function getList(search: string): Promise<PageApi<UserAPI>> {
  const response = await api.get<PageApi<UserAPI>>(`${USER_PATH}`, {
    params: {search},
  });

  return response.data;
}

export const userAPI = {
  getById,
  getList,
};
