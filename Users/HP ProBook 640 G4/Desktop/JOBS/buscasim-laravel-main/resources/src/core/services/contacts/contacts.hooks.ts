import { useMutation, useQuery } from 'react-query';
import { ContactListQuery, ContactListResponse } from '.';
import { AxiosError } from 'axios';
import { getErrorMessage, showError, showSuccess } from '@/core/utils';
import contactsService from './contacts.service';
import { queryClient } from '@/core/config/react-query';

export function useContacts(query?: ContactListQuery) {
  return useQuery<ContactListResponse, AxiosError>(
    ['contacts', { ...query }],
    () => contactsService.list({ ...query }),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useCreateContact() {
  return useMutation(contactsService.create, {
    onSuccess(data) {
      queryClient.invalidateQueries(['contacts']);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useRemoveContact() {
  return useMutation(contactsService.remove, {
    onSuccess(data) {
      queryClient.invalidateQueries(['contacts']);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
