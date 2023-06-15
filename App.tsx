import React from 'react';
import {SafeAreaView} from 'react-native';

import {Text} from './src/components/Text/Text';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Text preset="headingLarge">hello world t</Text>
      <Text>hello world t</Text>
      <Text>hello world t</Text>
    </SafeAreaView>
  );
}

export default App;
