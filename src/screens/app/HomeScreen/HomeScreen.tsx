import React, {useRef} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {useScrollToTop} from '@react-navigation/native';

import {PostItem, Screen} from '@components';
import {Post, usePostList} from '@domain';
import {AppTabScreenProps} from '@routes';

import {HomeEmpty} from './components/HomeEmpty';
import {HomeHeader} from './components/HomeHeader';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {
    refresh,
    list: postList,
    loading,
    error,
    fetchNextPage,
  } = usePostList();

  const flatListRef = useRef<FlatList<Post>>(null);
  useScrollToTop(flatListRef);

  function rederItem({item}: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }

  return (
    <Screen style={$screen}>
      <FlatList
        ref={flatListRef}
        keyExtractor={item => item.id.toString()}
        data={postList}
        renderItem={rederItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: postList.length === 0 ? 1 : undefined}}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        ListHeaderComponent={<HomeHeader />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <HomeEmpty error={error} loading={loading} refetch={refresh} />
        }
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingHorizontal: 0,
  flex: 1,
};
