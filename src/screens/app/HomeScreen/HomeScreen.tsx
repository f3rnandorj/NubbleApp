import React from 'react';

import {Button, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function HomeScreen({navigation}: AppTabScreenProps<'HomeScreen'>) {
  return (
    <Screen>
      <Text>HomeScreen</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('SettingsScreen')}
      />
    </Screen>
  );
}
