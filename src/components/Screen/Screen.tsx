import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import {Box, Icon, TouchableOpacityBox, Text, BoxProps} from '@components';
import {useAppSafeArea, useAppTheme} from '@hooks';
import {useNavigation} from '@react-navigation/native';

import {ScrollViewContainer, ViewContainer} from './components/ScreenContainer';

interface ScreenProps extends BoxProps {
  children: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
}

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
  style,
  ...boxProps
}: ScreenProps) {
  const {top, bottom} = useAppSafeArea();
  const {colors} = useAppTheme();
  const navigation = useNavigation();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal="s24"
          style={[{paddingTop: top, paddingBottom: bottom}, style]}
          {...boxProps}>
          {canGoBack && (
            <TouchableOpacityBox
              onPress={navigation.goBack}
              mb="s24"
              flexDirection="row">
              <Icon name="arrowLeft" color="primary" />
              <Text preset="paragraphMedium" semiBold ml="s8">
                Voltar
              </Text>
            </TouchableOpacityBox>
          )}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
