import React from 'react';

import {SimpleLogo} from '@brand';
import {useNavigation} from '@react-navigation/native';

import {Box, BoxProps, Icon} from '@components';

import {useAppSafeArea} from './../../../../hooks/useAppSafeArea';

export function HomeHeader() {
  const {top} = useAppSafeArea();

  const navigation = useNavigation();

  function navigateToSearchScreen() {
    navigation.navigate('SearchScreen');
  }

  return (
    <Box {...$wrapper} style={{marginTop: top}}>
      <SimpleLogo width={70} />

      <Box flexDirection="row">
        <Icon
          onPress={navigateToSearchScreen}
          name="search"
          style={{paddingRight: 24}}
        />
        <Icon onPress={() => {}} name="bell" style={{marginRight: 24}} />
        <Icon onPress={() => {}} name="comment" />
      </Box>
    </Box>
  );
}

const $wrapper: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  pb: 's24',
  paddingHorizontal: 's24',
};
