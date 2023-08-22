import {api, PageApi, PageParams} from '@api';

import {PostCommentApi} from './postCommentTypes';

const PATH = 'user/post_comment';

async function getList(
  post_id: number,
  pageParams?: PageParams,
): Promise<PageApi<PostCommentApi>> {
  const response = await api.get<PageApi<PostCommentApi>>(PATH, {
    params: {
      post_id,
      ...pageParams,
    },
  });

  return response.data;
}

async function create(
  post_id: number,
  message: string,
): Promise<PostCommentApi> {
  const response = await api.post<PostCommentApi>(PATH, {
    post_id,
    message,
  });

  return response.data;
}

async function remove(postCommentId: number): Promise<{message: string}> {
  const response = await api.delete<{message: string}>(
    `${PATH}/${postCommentId}`,
  );

  return response.data;
}

export const postCommentApi = {
  getList,
  create,
  remove,
};
