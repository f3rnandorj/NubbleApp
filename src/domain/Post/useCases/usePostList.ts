import {QueryKeys, usePaginatedList} from '@infra';

import {Post, postService} from '@domain';

export function usePostList() {
  return usePaginatedList<Post>([QueryKeys.PostList], postService.getList);
}
