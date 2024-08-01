import { AxiosError, isAxiosError } from 'axios';

type ErrorResponseType = { message: string };

type FormErrorsType<T> = Record<keyof T, string[]>;

type ApiResponseErrors<T> = ErrorResponseType & { errors: FormErrorsType<T> };

const DEFAULT_ERROR_MESSAGE = 'Ocorreu algum um erro durante a requisição.';

export function getErrorMessage(error: AxiosError, fallback?: string) {
  if (!isAxiosError(error)) return fallback || DEFAULT_ERROR_MESSAGE;

  const errorResponse = error.response?.data as ErrorResponseType;

  if ('message' in errorResponse) return errorResponse.message;

  return DEFAULT_ERROR_MESSAGE;
}

export function getFormErrors<T>(error: AxiosError) {
  if (!isAxiosError(error) || !error.response) return {};

  const { errors: formErrors } = error.response?.data as ApiResponseErrors<T>;

  return Object.entries(formErrors)
    .map(([field, errors]) => ({
      [field]: (errors as string[])[0],
    }))
    .reduce((result, item) => {
      const key = Object.keys(item)[0];
      const value = item[key];

      result[key] = value;
      return result;
    }, {});
}
