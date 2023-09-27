import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {ActivityIndicator, Box} from '@components';

import {useAuthCredentials} from '../services/authCredentials/useAuthCredentials';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export function Router() {
  const {authCredentials, isLoading} = useAuthCredentials();

  if (isLoading) {
    return (
      <Box flex={1} bg="background" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <NavigationContainer>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
