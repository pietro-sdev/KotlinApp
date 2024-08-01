import { UseFormReturnType } from '@mantine/form';
import { Checkbox, Stack, Text, TextInput, Title } from '@mantine/core';

import { AnchorLink, MaskedInput } from '@/components/__commons';
import { ProcessPaymentRequest } from '@/core/services/orders';

interface Props {
  form: UseFormReturnType<ProcessPaymentRequest>;
}

export function CheckoutForm({ form }: Props) {
  return (
    <Stack>
      <Title order={3}>Suas informações</Title>
      <TextInput
        {...form.getInputProps('name')}
        label="Seu nome"
        placeholder="Informe seu nome completo"
        withAsterisk
        autoComplete="name" // Adicione esta linha
      />

      <TextInput
        {...form.getInputProps('email')}
        label="Seu e-mail"
        placeholder="EX: exemplo@email.com"
        withAsterisk
        autoComplete="email" // Adicione esta linha, se ainda não estiver presente
      />

      <MaskedInput
        {...form.getInputProps('document')}
        mask="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        withAsterisk
      />
      {/* <Checkbox
        {...form.getInputProps('accept_terms', { type: 'checkbox' })}
        label={
          <Text>
            Aceito os termos e condições presentes na nossa{' '}
            <AnchorLink href="/politica-de-privacidade" blank>
              política de privacidade
            </AnchorLink>
          </Text>
        }
      /> */}
    </Stack>
  );
}
