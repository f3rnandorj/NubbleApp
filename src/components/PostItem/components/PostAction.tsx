import React from 'react';

import {Box, Icon, IconProps, Text, TouchableOpacityBox} from '@components';
import {Post} from '@domain';

type Props = Pick<Post, 'reactionCount' | 'commentCount' | 'favoriteCount'>;

export function PostAction({
  reactionCount,
  commentCount,
  favoriteCount,
}: Props) {
  function likePost() {
    //TODO:
  }

  function navigateToComments() {
    //TODO:
  }

  function favoritePost() {
    //TODO:
  }

  return (
    <Box flexDirection="row" mt="s16">
      <Item
        marked={false}
        icon={{
          default: 'heart',
          marked: 'heartFill',
        }}
        onPress={likePost}
        count={reactionCount}
      />
      <Item
        marked={false}
        icon={{
          default: 'comment',
          marked: 'comment',
        }}
        onPress={navigateToComments}
        count={commentCount}
      />
      <Item
        marked={false}
        icon={{
          default: 'bookmark',
          marked: 'bookmarkFill',
        }}
        onPress={favoritePost}
        count={favoriteCount}
      />
    </Box>
  );
}

interface ItemProps {
  onPress: () => void;
  marked: boolean;
  count: number;
  icon: {
    default: IconProps['name'];
    marked: IconProps['name'];
  };
}

function Item({onPress, icon, marked, count}: ItemProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
      onPress={onPress}
      mr="s24">
      <Icon
        name={marked ? icon.marked : icon.default}
        color={marked ? 'marked' : undefined}
      />
      {count > 0 && (
        <Text preset="paragraphSmall" ml="s4">
          {count}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
