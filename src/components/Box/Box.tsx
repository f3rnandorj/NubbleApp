import {
  createBox,
  createRestyleComponent,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';
import {Theme} from '../../theme/theme';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export const Box = createBox<Theme>();
export type SRBoxProps = React.ComponentProps<typeof Box>;

export type TouchableOpacityBoxProps = TouchableOpacityProps &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [spacing, spacingShorthand, layout, backgroundColor, border],
  TouchableOpacity,
);
