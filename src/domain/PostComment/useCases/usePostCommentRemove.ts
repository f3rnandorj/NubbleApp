import {MutationOptions, useMutation} from '@infra';

import {postCommentService} from '@domain';

export function usePostCommentRemove(option?: MutationOptions<string>) {
  return useMutation<{postCommentId: number}, string>(
    ({postCommentId}) => postCommentService.remove(postCommentId),
    option,
  );
}
