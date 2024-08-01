import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Option } from '.';
import { getErrorMessage, showError, showSuccess } from '@/core/utils';
import optionsService from './options.service';
import { queryClient } from '@/core/config/react-query';

export function useOptions() {
  return useQuery<Option[], AxiosError>(
    ['options'],
    () => optionsService.list(),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useGetOption(key?: string) {
  return useQuery<any | false, AxiosError>(
    ['getOption', key],
    () => optionsService.getOption(key),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useUpdateOptions() {
  return useMutation(optionsService.update, {
    onSuccess(data) {
      queryClient.invalidateQueries(['options']);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
