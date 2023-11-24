import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {useSearchHistory, useSearchHistoryService} from '@services';

import {Box, Icon, ProfileUser, Text} from '@components';
import {User} from '@domain';

export function SearchHistory() {
  const userList = useSearchHistory();
  const {removeUser} = useSearchHistoryService();

  function renderItem({item}: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        avatarProps={{size: 48}}
        user={item}
        RightComponent={
          <Icon
            name="trash"
            color="primary"
            onPress={() => removeUser(item.id)}
          />
        }
      />
    );
  }

  return (
    <Box>
      <FlatList
        data={userList}
        keyExtractor={item => item.username}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text mb="s16" preset="headingMedium">
            Buscas recentes
          </Text>
        }
      />
    </Box>
  );
}
