import React from 'react';
import {SafeAreaView} from 'react-native';

import {Text} from './src/components/Text/Text';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';
import {Button} from './src/components/Button/Button';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Text preset="headingLarge">CoffStack</Text>
        <Button preset="primary" title="Acessar" marginBottom="s12" />
        <Button preset="outline" title="Acessar" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
