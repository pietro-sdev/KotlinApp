import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  Button,
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import Pusher from 'pusher-js';
import * as yup from 'yup';

import { PageLoader } from '@/components/__commons';
import { CheckoutForm, CheckoutQRCode } from '@/components/Checkout';
import {
  PaymentConfirmed,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  useProcessPayment,
} from '@/core/services/orders';
import { SearchResult, useSearchInfo } from '@/core/services/search';
import { useDiscount } from '@/core/services/coupons';
import { useAuth, useSearchResults } from '@/core/providers';
import { gaConversion, getFormErrors, moneyFormat } from '@/core/utils';

import classes from './styles.module.css';

import mockResults from '../../../../json/premium_response.json';

const schema = yup.object().shape({
  name: yup.string().required('Informe o seu nome'),
  email: yup
    .string()
    .required('Informe seu e-mail')
    .email('Informe um e-mail válido'),
  document: yup.string().required('Campo Obrigatório'),
  // accept_terms: yup.boolean().oneOf([true], 'Aceite os termos para continuar'),
});

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState<string>();
  const [debounced] = useDebouncedValue(coupon, 250);
  const { user } = useAuth();
  const { data: discount } = useDiscount(debounced);
  const { results, order, setSearchResults } = useSearchResults();
  const { data: info, isLoading: loadingInfo } = useSearchInfo();
  const mutation = useProcessPayment();
  const navigate = useNavigate();

  const form = useForm<ProcessPaymentRequest>({
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      document: user ? (user.document as string) : '',
      accept_terms: true,
      plate: '',
      coupon_id: null,
    },
    validate: yupResolver(schema),
  });

  console.log(info)


  async function handleSubmit(values: ProcessPaymentRequest) {
    try {
      const { DEV } = import.meta.env;

      const { payment_id } = await mutation.mutateAsync({
        ...values,
        plate: results?.dados?.placa || '',
        coupon_id: discount?.coupon_id || null,
      });

      const thankYouPageState = {
        info,
        payment_id
      };

      // If in development, redirect to thank you page directly.
      if (DEV) {
        setSearchResults({
          results: mockResults as unknown as SearchResult,
          payment: {
            payment: {
              payment_id: payment_id,
              data: mockResults as unknown as SearchResult,
              confirmed: true,
            },
          },
          premium: true,
        });
        navigate('/muito-obrigado', { state: thankYouPageState });

        console.log('result');
      }
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }


  function listenEvents(order: ProcessPaymentResponse) {
    const { VITE_PUSHER_APP_KEY, VITE_PUSHER_APP_CLUSTER } = import.meta.env;

    const pusher = new Pusher(VITE_PUSHER_APP_KEY, {
      cluster: VITE_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('payment-confirmed');

    channel.bind('payment-event', (data: PaymentConfirmed) => {
      const { payment_id, data: results } = data.payment;

      console.log('payment')
      console.log(data)
      console.log(order)
      console.log(results)

      navigate('/muito-obrigado');

      if (payment_id === order.payment_id) {
        setSearchResults({ results, payment: data, premium: true });
        navigate('/muito-obrigado');
      }
    });
  }

  useEffect(() => {
    if (order) {
      console.log('Order detected:', order);
      listenEvents(order);
    }
  }, [order]);

  useEffect(() => {
    if (!results) {
      navigate('/');
    } else {
      gaConversion('AW-10878664178/ClSCCNDZjZQZEPL7rMMo');
    }
  }, [results]);

  if (loadingInfo) return <PageLoader />;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container className={classes.wrapper}>
        <SimpleGrid w="100%" cols={{ base: 1, md: order ? 1 : 2 }}>
          <Paper withBorder p="md">
            {order ? <CheckoutQRCode /> : <CheckoutForm form={form} />}
          </Paper>

          {!order && (
            <Paper withBorder p="md">
              <Stack>
                <Title order={3}>Pagamento</Title>
                <Table className={classes.table}>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Placa</Table.Td>
                      <Table.Th>{results?.placa}</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Subtotal</Table.Td>
                      <Table.Th>{moneyFormat(info?.price || 0)}</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <TextInput
                          placeholder="Cupom"
                          description="Possui um cupom?"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                      </Table.Td>
                      <Table.Th>
                        {moneyFormat(discount?.discount || 0)}
                      </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="lg">Total</Text>
                      </Table.Td>
                      <Table.Th>
                        <Text size="lg">
                          {moneyFormat(
                            discount ? discount.subtotal : info?.price || 0
                          )}
                        </Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                <Button type="submit" loading={mutation.isLoading}>
                  Ver todas as informações
                </Button>

                <p style={{ fontSize: '12px' }}>
                  Ao clicar no botão acima, você concorda com nossos{' '}
                  <a href="termos-de-uso">Termos de Uso</a>,{' '}
                  <a href="politica-de-privacidade">Política de privacidade</a>{' '}
                  e Política de Pagamento.
                </p>
                {/* <Alert variant="light" color="yellow">
                  Usamos suas informações para gerar o pagamento. Seus dados
                  estão seguros e não vão ser compartilhados com terceiros.
                </Alert>
                */}
              </Stack>
            </Paper>
          )}
        </SimpleGrid>
      </Container>
    </form>
  );
}
