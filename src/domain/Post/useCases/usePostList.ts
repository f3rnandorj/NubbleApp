import {usePaginatedList} from '@infra';

import {Post, postService} from '@domain';

export function usePostList() {
  return usePaginatedList<Post>(postService.getList);
}
