import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';

import {PostItem, Screen} from '@components';
import {Post, postService} from '@domain';
import {AppTabScreenProps} from '@routes';

import {HomeHeader} from './components/HomeHeader';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const [postList, setPostList] = useState<Post[]>();

  function rederItem({item}: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }

  useEffect(() => {
    postService.getList().then(list => setPostList(list));
  }, []);
  return (
    <Screen style={$screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeHeader />}
        data={postList}
        keyExtractor={item => item.id}
        renderItem={rederItem}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 0,
  paddingHorizontal: 0,
};
