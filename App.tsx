import React from 'react';
import {View} from 'react-native';

import {Text} from './src/components/Text/Text';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';
import {Button} from './src/components/Button/Button';
import {TextInput} from './src/components/TextInput/TextInput';
import {Icon} from './src/components/Icon/Icon';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: 'white',
        }}>
        <Text marginBottom="s8" preset="headingLarge">
          Olá
        </Text>
        <Text marginBottom="s40" preset="paragraphLarge">
          Digite seu e-mail e senha para entrar
        </Text>

        <TextInput
          errorMessage="texto de error"
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{mb: 's20'}}
        />

        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          RightComponent={<Icon name="eyeOff" color="gray2" />}
          boxProps={{mb: 's10'}}
        />

        <Text preset="paragraphSmall" color="primary" bold>
          Esqueci minha senha
        </Text>

        <Button mt="s48" title="Entrar" />
        <Button mt="s12" title="Criar uma conta" preset="outline" />
      </View>
    </ThemeProvider>
  );
}

export default App;
