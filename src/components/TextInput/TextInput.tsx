import React, {useRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import {useAppTheme} from '@hooks';

import {Box, BoxProps, PressableBox} from '../Box/Box';
import {$fontFamily, $fontSizes, Text} from '../Text/Text';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  LeftComponent?: React.ReactElement;
  RightComponent?: React.ReactElement;
  boxProps?: BoxProps;
  containerProps?: BoxProps;
}

export function TextInput({
  label,
  errorMessage,
  LeftComponent,
  RightComponent,
  boxProps,
  containerProps,
  ...rnTextInputProps
}: TextInputProps) {
  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    flexDirection: 'row',
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : 'gray4',
    padding: 's16',
    borderRadius: 's12',
  };

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <PressableBox onPress={focusInput}>
        {label && (
          <Text preset="paragraphMedium" marginBottom="s4">
            {label}
          </Text>
        )}
        <Box {...$textInputContainer} {...containerProps}>
          {LeftComponent && (
            <Box justifyContent="center" mr="s16">
              {LeftComponent}
            </Box>
          )}
          <RNTextInput
            autoCapitalize="none"
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            style={[{color: colors.backgroundContrast}, $textInputStyle]}
            {...rnTextInputProps}
          />
          {RightComponent && (
            <Box justifyContent="center" ml="s16">
              {RightComponent}
            </Box>
          )}
        </Box>

        {errorMessage && (
          <Text preset="paragraphSmall" bold color="error">
            {errorMessage}
          </Text>
        )}
      </PressableBox>
    </Box>
  );
}

export const $textInputStyle: TextStyle = {
  flexGrow: 1,
  flexShrink: 1,
  padding: 0,
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
