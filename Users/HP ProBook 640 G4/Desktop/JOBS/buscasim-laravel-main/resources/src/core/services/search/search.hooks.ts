import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useSearchResults } from '@/core/providers';
import { getErrorMessage, showError } from '@/core/utils';
import searchService from './search.service';
import { SearchInformation } from '.';
import { useState } from 'react';
import { Modal } from '@mantine/core';

export function useSearch() {
  const navigate = useNavigate();
  const { setSearchResults } = useSearchResults();
  const [noResultsModalOpen, setNoResultsModalOpen] = useState(false);

  return useMutation(searchService.search, {
    onSuccess(results) {
      console.log('Resultados recebidos:', results); // Depurar resultados recebidos
      if (!results || !isValidResults(results)) {
        console.log('Chegou!');
        setNoResultsModalOpen(true);
      } else {
        setSearchResults({ results, order: null, payment: null, premium: false });
        navigate(`/resultados`);
      }
    },
    onError(error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      // Tratar erro aqui, se necessário
    },
  });
}

export function useSearchInfo() {
  return useQuery<SearchInformation, AxiosError>(
    ['search.info'],
    () => searchService.info(),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

function isValidResults(results) {
  return results && Object.keys(results).length > 0;
}
