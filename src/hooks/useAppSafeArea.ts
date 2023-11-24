import {Platform} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAppTheme} from '@hooks';

export function useAppSafeArea() {
  const {top, bottom} = useSafeAreaInsets();
  const {spacing} = useAppTheme();

  const iosStatusBarHeightOldVersions = Platform.OS === 'ios' && top ? 20 : 0;

  return {
    top: Math.max(top, spacing.s20 + iosStatusBarHeightOldVersions),
    bottom: Math.max(bottom, spacing.s20),
  };
}
