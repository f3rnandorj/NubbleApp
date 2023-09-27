import React from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
  ActivityIndicator,
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {useAuthSignUp} from '@domain';
import {useResetNavigationSuccess} from '@hooks';
import {AuthScreenProps, AuthStackParamList} from '@routes';

import {SignUpSchema, signUpSchema} from './signUpSchema';
import {useAsyncValidation} from './useAsyncValidation';

const resetParam: AuthStackParamList['SuccessScreen'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: {
    name: 'checkRound',
    color: 'success',
  },
};

const defaultValues: SignUpSchema = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  username: '',
};

export function SignUpScreen({}: AuthScreenProps<'SignUpScreen'>) {
  const {reset} = useResetNavigationSuccess();
  const {signUp, isLoading} = useAuthSignUp({
    onSuccess: () => reset(resetParam),
  });
  const {control, formState, handleSubmit, watch, getFieldState} =
    useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
      defaultValues,
      mode: 'onChange',
    });

  function submitForm(formData: SignUpSchema) {
    signUp(formData);
  }

  const {usernameValidation, emailValidation} = useAsyncValidation({
    watch,
    getFieldState,
  });

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s32">
        Criar uma conta
      </Text>

      <FormTextInput
        control={control}
        name="username"
        label="Seu username"
        placeholder="@"
        boxProps={{mb: 's20'}}
        errorMessage={usernameValidation.errorMessage}
        RightComponent={
          usernameValidation.isFetching ? (
            <ActivityIndicator size="small" />
          ) : undefined
        }
      />

      <FormTextInput
        control={control}
        name="firstName"
        label="Nome"
        autoCapitalize="words"
        placeholder="Digite seu nome"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        control={control}
        name="lastName"
        label="Sobrenome"
        autoCapitalize="words"
        placeholder="Digite seu sobrenome"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's20'}}
        errorMessage={emailValidation.errorMessage}
        RightComponent={
          emailValidation.isFetching ? (
            <ActivityIndicator size="small" />
          ) : undefined
        }
      />

      <FormPasswordInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{mb: 's48'}}
      />

      <Button
        disabled={
          !formState.isValid ||
          usernameValidation.notReady ||
          emailValidation.notReady
        }
        loading={isLoading}
        title="Criar uma conta"
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
