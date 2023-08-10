import {api, PageApi, PageParams} from '@api';

import {PostAPI} from './postTypes';

async function getList(params?: PageParams): Promise<PageApi<PostAPI>> {
  const response = await api.get<PageApi<PostAPI>>('user/post', {
    params,
  });

  return response.data;
}

export const postApi = {
  getList,
};
