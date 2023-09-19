import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {PostComment} from '@domain';

import {postCommentService} from '../postCommentService';

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  const queryClient = useQueryClient();

  const {mutate, isLoading, isError} = useMutation<
    PostComment,
    unknown,
    {message: string}
  >({
    mutationFn: variables =>
      postCommentService.create(postId, variables.message),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId],
      });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: () => {
      if (options?.onError) {
        options?.onError(options?.errorMessage || 'Ocorreu um erro');
      }
    },
  });

  async function createComment(message: string) {
    mutate({message});
  }

  return {
    createComment,
    isLoading,
    isError,
  };
}

// const {mutate, error, loading} = useMutation<{message: string}, PostComment>(
//   ({message}) => postCommentService.create(postId, message),
//   options,
// );
