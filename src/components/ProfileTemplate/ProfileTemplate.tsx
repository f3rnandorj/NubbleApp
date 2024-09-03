import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {QueryKeys} from '@infra';

import {InfinityScrollList, Screen} from '@components';
import {Post, postService, useUserGetById} from '@domain';

import {ProfileHeader} from './components/ProfileHeader';

type Props = {
  userId: number;
  isMyProfile?: boolean;
};

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS;

export function ProfileTemplate({userId, isMyProfile}: Props) {
  const {user} = useUserGetById(userId);
  const [publicationCount, setPublicationCount] = useState(0);

  function renderItem({item}: ListRenderItemInfo<Post>) {
    return (
      <Image
        source={{uri: item.imageURL}}
        style={{width: ITEM_WIDTH, height: ITEM_WIDTH}}
      />
    );
  }

  function renderListHeader() {
    if (!user) {
      return null;
    }

    return (
      <ProfileHeader
        user={user}
        isMyProfile={isMyProfile}
        publicationCount={publicationCount.toString()}
      />
    );
  }

  async function getPostList(page: number) {
    const response = await postService.getList(page, userId);
    setPublicationCount(response.meta.total);
    return response;
  }

  return (
    <Screen
      flex={1}
      noPaddingHorizontal
      style={$screen}
      canGoBack={!isMyProfile}>
      <InfinityScrollList
        queryKey={[QueryKeys.PostList, userId]}
        getList={getPostList}
        renderItem={renderItem}
        flatListProps={{
          ListHeaderComponent: renderListHeader,
          numColumns: NUM_COLUMNS,
        }}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingHorizontal: 0,
  flex: 1,
};
