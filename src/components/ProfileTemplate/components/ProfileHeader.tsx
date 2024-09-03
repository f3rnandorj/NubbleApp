import React from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Box, Icon, ProfileAvatar, Text} from '@components';
import {User} from '@domain';

import {ProfileMetadata} from './ProfileMetadata';

type Props = {
  user: User;
  isMyProfile?: boolean;
  publicationCount: string;
};
export function ProfileHeader({user, isMyProfile, publicationCount}: Props) {
  const navigation = useNavigation();

  return (
    <Box mb="s32">
      <Box alignItems="center">
        <ProfileAvatar
          imageURL={user?.profileUrl}
          size={100}
          borderRadius={40}
        />
        <Text mt="s16" preset="headingMedium">
          {user.fullName}
        </Text>
        <Text mt="s4" preset="paragraphLarge" color="gray1">
          @{user.username}
        </Text>
      </Box>
      <ProfileMetadata
        followersCount={user.meta.followersCount}
        followingCount={user.meta.followingCount}
        publicationCount={publicationCount}
      />
      {isMyProfile && (
        <Box position="absolute" alignSelf="flex-end" paddingRight="s24">
          <Icon
            size={30}
            name="settings"
            onPress={() => navigation.navigate('SettingsScreen')}
          />
        </Box>
      )}
    </Box>
  );
}
