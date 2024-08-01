import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { Page, PagesListResponse, PagesQuery } from './pages.types';
import { AxiosError } from 'axios';
import pagesServices from './pages.services';
import { queryClient } from '@/core/config/react-query';
import { getErrorMessage, showError, showSuccess } from '@/core/utils';

export function usePages(query?: PagesQuery) {
  return useQuery<PagesListResponse, AxiosError>(['pages', { ...query }], () =>
    pagesServices.list(query)
  );
}

export function usePage(id?: number) {
  const navigate = useNavigate();

  return useQuery<Page, AxiosError>(
    ['pages/detail', id],
    () => pagesServices.detail(id),
    {
      onError() {
        navigate('/pagina-nao-encontrada');
      },
    }
  );
}

export function usePageUpdate() {
  return useMutation(pagesServices.update, {
    onSuccess(data) {
      queryClient.invalidateQueries(['pages']);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function usePageCreate() {
  const navigate = useNavigate();

  const data = {
    title: "Nova Página",
    description: "Edite a descrição da sua nova página",
    slug: `/temp-${Date.now()}`,
    content: null,
    is_published: false,
  };

  return useMutation(() => pagesServices.create(data), {
    onSuccess(data) {
      queryClient.invalidateQueries(['pages']);
      showSuccess(data.message);
      navigate(`/app/paginas/edit/${data.data.id}`);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function usePageBySlug(slug?: string) {
  return useQuery<Page, AxiosError>(
    ['pages/getBySlug', slug],
    () => pagesServices.getPageBySlug(slug),
    {
      onError() {
        console.log('nao encontrado')
      },
    }
  );
}

export function usePageDelete() {
  return useMutation(
    (id: number) => pagesServices.delete(id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['pages']);
        showSuccess(data.message);
      },
      onError: (error: AxiosError) => {
        showError(getErrorMessage(error));
      },
    }
  );
}
