import React from 'react';

import {Button, Text, Screen, FormTextInput} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {useResetNavigationSuccess} from '@hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@routes';
import {useForm} from 'react-hook-form';

import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from './forgotPasswordSchema';

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordScreen'
>;

export function ForgotPasswordScreen({}: ScreenProps) {
  const {reset} = useResetNavigationSuccess();
  const {control, formState, handleSubmit} = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  function submitForm(formData: ForgotPasswordSchema) {
    console.log(formData);
    reset({
      title: `Enviamos as instruções ${'\n'}para seu e-mail!`,
      description:
        'Clique no link enviado no  seu e-mail para recuperar sua senha',
      icon: {
        name: 'messageRound',
        color: 'primary',
      },
    });
  }

  return (
    <Screen canGoBack>
      <Text>Esqueci minha senha </Text>
      <Text preset="paragraphLarge" mb="s32">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's40'}}
      />

      <Button
        onPress={handleSubmit(submitForm)}
        title="Recuperar senha"
        disabled={!formState.isValid}
      />
    </Screen>
  );
}
