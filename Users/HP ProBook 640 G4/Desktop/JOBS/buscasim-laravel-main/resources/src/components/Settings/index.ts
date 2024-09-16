import { UseFormReturnType } from '@mantine/form';
import { OptionsRequest } from '@/core/services/options';

export interface OptionsFormProps {
  form: UseFormReturnType<OptionsRequest>;
}

export * from './APIPlacas';
export * from './MercadoPago';
export * from './Price';
export * from './GoogleAds';
export * from './AnyCar';
