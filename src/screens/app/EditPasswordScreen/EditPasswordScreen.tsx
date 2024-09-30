import React from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Button, FormPasswordInput, Screen} from '@components';
import {useAuthUpdatePassword} from '@domain';
import {AppScreenProps} from '@routes';

import {EditPasswordSchema, editPasswordSchema} from './editPasswordSchema';

const defaultValues: EditPasswordSchema = {
  currentPassword: '',
  newPassword: '',
  confirmedPassword: '',
};

export function EditPasswordScreen({}: AppScreenProps<'EditPasswordScreen'>) {
  const {isLoading, updatePassword} = useAuthUpdatePassword();

  const {control, formState, handleSubmit} = useForm<EditPasswordSchema>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <Screen canGoBack scrollable title="Alterar Senha">
      <FormPasswordInput
        control={control}
        name="currentPassword"
        label="Senha Atual"
        placeholder="Digite sua senha atual"
        boxProps={{mb: 's20'}}
      />
      <FormPasswordInput
        control={control}
        name="newPassword"
        label="Nova Senha"
        placeholder="Digite sua nova senha"
        boxProps={{mb: 's20'}}
      />
      <FormPasswordInput
        control={control}
        name="confirmedPassword"
        label="Confirmar Senha"
        placeholder="Confirme sua nova senha"
        boxProps={{mb: 's20'}}
      />

      <Button
        title="Salvar Alterações"
        disabled={!formState.isValid}
        loading={isLoading}
        onPress={handleSubmit(updatePassword)}
        mt="s40"
      />
    </Screen>
  );
}
