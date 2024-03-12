import React from 'react';

import {Box, PressableBox} from '../Box/Box';

export interface RadioButtonProps {
  isSelected: boolean;
  onPress: () => void;
}

export function RadioButton({isSelected, onPress}: RadioButtonProps) {
  return (
    <PressableBox
      hitSlop={10}
      onPress={onPress}
      alignItems="center"
      justifyContent="center"
      height={20}
      width={20}
      borderWidth={isSelected ? 2 : 1}
      borderRadius="s12"
      borderColor={isSelected ? 'primary' : 'onBackgroundGray2'}>
      <Box
        bg={isSelected ? 'primary' : undefined}
        height={12}
        width={12}
        borderRadius="s12"
      />
    </PressableBox>
  );
}
