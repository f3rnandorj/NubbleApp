import {dateUtils} from '@utils';

import {PostComment, PostCommentApi} from './postCommentTypes';

function toPostComment(postCommentAPI: PostCommentApi): PostComment {
  return {
    id: postCommentAPI.id,
    message: postCommentAPI.message,
    createdAt: postCommentAPI.created_at,
    createdAtRelative: dateUtils.formatRelative(postCommentAPI.created_at),
    author: {
      id: postCommentAPI.user.id,
      name: postCommentAPI.user.full_name,
      profileUrl: postCommentAPI.user.profile_url,
      userName: postCommentAPI.user.username,
    },
  };
}

export const postCommentAdapter = {
  toPostComment,
};
