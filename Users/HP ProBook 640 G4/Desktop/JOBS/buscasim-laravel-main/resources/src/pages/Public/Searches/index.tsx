import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Center, Container, Stack, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { SearchesList, SearchesLoginForm } from '@/components/Searches';
import { CustomerLoginRequest, useCustomerLogin } from '@/core/services/auth';
import { useOrders } from '@/core/services/orders';
import { useAuth } from '@/core/providers';
import { getFormErrors } from '@/core/utils';
import { BaseQuery } from '@/core/types';

const schema = yup.object().shape({
  email: yup.string().required('Campo Obrigatório').email('Informe um e-mail válido'),
  document: yup.string().required('Campo Obrigatório'),
});

export default function MySearchsPage() {
  const [params, setParams] = useState<BaseQuery>();
  const { data, isLoading } = useOrders(params);
  const mutation = useCustomerLogin();
  const { user } = useAuth();

  const form = useForm<CustomerLoginRequest>({
    initialValues: {
      email: '',
      document: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: CustomerLoginRequest) {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  const handleToggleFavorite = async (orderId: number, userId: number, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await axios.delete(`/api/orders/${orderId}/favorite`, { data: { user_id: userId } });
        toast.success('Pedido removido dos favoritos');
      } else {
        await axios.post(`/api/orders/${orderId}/favorite`, { user_id: userId });
        toast.success('Pedido adicionado aos favoritos');
      }
      // Optionally reload orders
      setParams({ ...params }); // Trigger a reload of orders
    } catch (error) {
      toast.error('Error toggling favorite');
      console.error('Error toggling favorite:', error);
    }
  };

  if (!user)
    return (
      <Center h="calc(100% - 180px)">
        <Container>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <SearchesLoginForm form={form} loading={mutation.isLoading} />
          </form>
        </Container>
      </Center>
    );

  return (
    <Container h="calc(100% - 180px)">
      <Stack>
        <Title>Meus pedidos</Title>
        <SearchesList
          data={data}
          loading={isLoading}
          onPaginate={(page) => setParams((params) => ({ ...params, page }))}
          onToggleFavorite={handleToggleFavorite}
        />
      </Stack>
    </Container>
  );
}
