import React from 'react';

import {Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function MyProfileScreen({}: AppTabScreenProps<'MyProfileScreen'>) {
  return (
    <Screen>
      <Text>MyProfileScreen</Text>
    </Screen>
  );
}
