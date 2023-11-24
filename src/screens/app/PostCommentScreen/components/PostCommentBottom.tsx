import React from 'react';

import {Text, PressableBox} from '@components';

interface Props {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export function PostCommentBottom({fetchNextPage, hasNextPage}: Props) {
  if (hasNextPage) {
    return (
      <PressableBox onPress={fetchNextPage}>
        <Text bold color="primary" textAlign="center">
          Ver mais
        </Text>
      </PressableBox>
    );
  }

  return null;
}
