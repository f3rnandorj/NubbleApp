import {apiAdapter} from '@api';
import {Page} from '@types';

import {postCommentAdapter} from './postCommentAdapter';
import {postCommentApi} from './postCommentApi';
import {PostComment} from './postCommentTypes';

const PER_PAGE = 10;
async function getList(
  post_id: number,
  page: number,
): Promise<Page<PostComment>> {
  const postCommentPageApi = await postCommentApi.getList(post_id, {
    page,
    per_page: PER_PAGE,
  });

  return {
    data: postCommentPageApi.data.map(postCommentAdapter.toPostComment),
    meta: apiAdapter.toMetaDataPage(postCommentPageApi.meta),
  };
}

async function create(postId: number, message: string): Promise<PostComment> {
  const postCommentAPI = await postCommentApi.create(postId, message);

  return postCommentAdapter.toPostComment(postCommentAPI);
}

async function remove(postCommentId: number): Promise<string> {
  const response = await postCommentApi.remove(postCommentId);

  return response.message;
}
/**
 * @description user can delete the comment if is the post author or comment author
 * @param postAuthorId the id of the post author
 * @param userId the current session user id
 * @param postComment comment to be deleted
 */
function isAllowToDelete(
  postComment: PostComment,
  postAuthorId: number,
  userId: number,
): boolean {
  if (postComment.author.id === userId) {
    return true;
  }

  if (postAuthorId === userId) {
    return true;
  }

  return false;
}

export const postCommentService = {
  getList,
  create,
  remove,
  isAllowToDelete,
};
