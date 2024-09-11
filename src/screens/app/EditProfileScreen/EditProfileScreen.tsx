import React from 'react';

import {Button, Screen} from '@components';
import {useUserGetById} from '@domain';
import {AppScreenProps} from '@routes';

import {EditProfileForm} from './components/EditProfileForm';
import {EditProfileHeader} from './components/EditProfileHeader';

export function EditProfileScreen({
  route,
}: AppScreenProps<'EditProfileScreen'>) {
  const {user} = useUserGetById(route.params.userId);

  function submitForm() {
    //TODO:
  }

  return (
    <Screen canGoBack scrollable title="Editar Perfil">
      <EditProfileHeader user={user} />
      {user && <EditProfileForm user={user} />}

      <Button mt="s40" title="Salvar Alterações" onPress={submitForm} />
    </Screen>
  );
}
