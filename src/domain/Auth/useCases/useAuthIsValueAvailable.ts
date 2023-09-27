// import {QueryKeys} from '@infra';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

// import {authService} from '../authService';

interface Param<T extends {length: number}> {
  value: T;
  enabled: boolean;
  queryKey: QueryKeys;
  isValueAvailableFn: (value: T) => Promise<boolean>;
}

function useAuthIsValueAvailable<T extends {length: number}>({
  value,
  enabled,
  isValueAvailableFn,
  queryKey,
}: Param<T>) {
  const debouncedValue = useDebounce(value, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => isValueAvailableFn(debouncedValue),
    retry: false,
    staleTime: 20000,
    enabled: enabled && debouncedValue.length > 0,
  });

  const isDebouncing = debouncedValue !== value;

  return {
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  };
}

export function useAuthIsUsernameAvailable({
  username,
  enabled,
}: {
  username: string;
  enabled: boolean;
}) {
  return useAuthIsValueAvailable({
    value: username,
    enabled,
    queryKey: QueryKeys.IsUsernameAvailable,
    isValueAvailableFn: authService.isUsernameAvailable,
  });
}

export function useAuthIsEmailAvailable({
  email,
  enabled,
}: {
  email: string;
  enabled: boolean;
}) {
  return useAuthIsValueAvailable({
    value: email,
    enabled,
    isValueAvailableFn: authService.isEmailAvailable,
    queryKey: QueryKeys.IsEmailAvailable,
  });
}
