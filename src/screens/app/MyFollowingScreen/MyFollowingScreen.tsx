import React from 'react';

import {QueryKeys} from '@infra';

import {UserListTemplate} from '@components';
import {followService} from '@domain';
import {AppScreenProps} from '@routes';

export function MyFollowingScreen({}: AppScreenProps<'MyFollowingScreen'>) {
  return (
    <UserListTemplate
      screenTitle="Seguindo"
      emptyMessage="Você ainda não está seguindo ninguém"
      totalText="seguindo"
      queryKey={QueryKeys.MyFollowingList}
      getUserList={followService.geMyFollowingList}
      button={{
        title: 'Seguindo',
        onPress: followUser => console.log({followUser}),
      }}
    />
  );
}
