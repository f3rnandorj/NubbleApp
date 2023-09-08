import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, Text} from '@components';
import {Post} from '@domain';

type Props = Pick<Post, 'author' | 'text' | 'commentCount' | 'id'>;

export function PostBottom({author, commentCount, text, id}: Props) {
  const commentText = getCommentText(commentCount);

  const navigation = useNavigation();

  function navigationToPostComment() {
    navigation.navigate('PostCommentScreen', {
      postId: id,
      postAuthorId: author.id,
    });
  }

  return (
    <Box mt="s16">
      <Text preset="paragraphMedium" bold>
        {author.userName}
      </Text>

      <Text preset="paragraphMedium" color="gray1">
        {text}
      </Text>

      <Text
        onPress={navigationToPostComment}
        preset="paragraphSmall"
        bold
        color="primary"
        mt="s8">
        {commentText}
      </Text>
    </Box>
  );
}

function getCommentText(commentCount: number): string | null {
  if (commentCount === 0) {
    return null;
  } else if (commentCount === 1) {
    return 'ver comentário';
  } else {
    return `ver ${commentCount} comentários`;
  }
}
