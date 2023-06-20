import React from 'react';

import {Text} from '../../../components/Text/Text';
import {Button} from '../../../components/Button/Button';
import {TextInput} from '../../../components/TextInput/TextInput';
import {Icon} from '../../../components/Icon/Icon';
import {Screen} from '../../../components/Screen/Screen';

export function LoginScreen() {
  return (
    <Screen>
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
    </Screen>
  );
}
