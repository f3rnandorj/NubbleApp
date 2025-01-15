import React, {useMemo} from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, PressableBox, Text} from '@components';

type Props = {
  followersCount: string;
  followingCount: string;
  publicationCount: string;
  isMyProfile?: boolean;
};
export function ProfileMetadata({
  followersCount,
  followingCount,
  publicationCount,
  isMyProfile,
}: Props) {
  const navigation = useNavigation();

  const items: ItemType[] = useMemo(
    () => [
      {value: publicationCount.toString(), label: 'Publicações'},
      {
        label: 'Seguidores',
        value: followersCount,
        onPress: () => navigation.navigate('MyFollowersScreen'),
      },
      {
        label: 'Seguindo',
        value: followingCount,
        onPress: () => navigation.navigate('MyFollowingScreen'),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [followersCount, followingCount, publicationCount],
  );

  return (
    <Box>
      <Box
        mt="s24"
        flexDirection="row"
        justifyContent="space-between"
        style={{columnGap: 34}}
        alignSelf="center">
        {items.map(item => (
          <Item isMyProfile={isMyProfile} key={item.label} {...item} />
        ))}
      </Box>
    </Box>
  );
}

type ItemType = {
  value: string;
  label: string;
  onPress?: () => void;
};

function Item({
  value,
  label,
  onPress,
  isMyProfile,
}: ItemType & {isMyProfile?: boolean}) {
  return (
    <PressableBox onPress={onPress} alignItems="center" disabled={!isMyProfile}>
      <Text preset="headingSmall">{value}</Text>
      <Text preset="paragraphSmall">{label}</Text>
    </PressableBox>
  );
}
