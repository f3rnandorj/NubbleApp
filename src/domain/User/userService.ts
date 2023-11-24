import {apiAdapter} from '@api';
import {Page} from '@types';

import {userAdapter} from './userAdapter';
import {userAPI} from './userApi';
import {User} from './userTypes';

async function getById(id: number): Promise<User> {
  const userApi = await userAPI.getById(id.toString());

  return userAdapter.toUser(userApi);
}

async function searchUser(search: string): Promise<Page<User>> {
  const userApiPage = await userAPI.getList(search);

  return apiAdapter.toPageModel(userApiPage, userAdapter.toUser);
}

export const userService = {
  getById,
  searchUser,
};
