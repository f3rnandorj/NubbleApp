import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, BoxProps, Icon, Text, TouchableOpacityBox} from '@components';

import {ScreenProps} from '../Screen';

type Props = Pick<ScreenProps, 'title' | 'canGoBack' | 'HeaderComponent'> &
  BoxProps;

const ICON_SIZE = 20;

export function ScreenHeader({
  canGoBack,
  title,
  HeaderComponent,
  ...boxProps
}: Props) {
  const navigation = useNavigation();

  const showBackLabel = !title && !HeaderComponent;

  if (!title && !HeaderComponent && !canGoBack) {
    return null;
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s24"
      {...boxProps}>
      {canGoBack && (
        <TouchableOpacityBox
          testID="screen-back-button"
          onPress={navigation.goBack}
          flexDirection="row"
          mr="s10"
          alignItems="center">
          <Icon size={ICON_SIZE} name="arrowLeft" color="primary" />

          {showBackLabel && (
            <Text preset="paragraphMedium" semiBold ml="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {HeaderComponent}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  );
}
