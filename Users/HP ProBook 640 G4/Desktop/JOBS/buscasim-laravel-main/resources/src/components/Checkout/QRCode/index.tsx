import {
  Button,
  CopyButton,
  Flex,
  Image,
  Input,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useSearchResults } from '@/core/providers';

export function CheckoutQRCode() {
  const { order } = useSearchResults();

  if (!order) {
    console.log('Order is not available');
    return null;
  }

  console.log('Order available:', order);

  return (
    <Stack align="center">
      <Title order={3}>Confirmação do pagamento</Title>
      <Text ta="center">
        Escaneie o QRCode ou copie o código PIX para efetuar o pagamento. As
        informações vão ser liberadas assim que o pagamento for confirmado.
      </Text>

      <Image src={`data:image/jpeg;base64,${order.qrcode}`} maw={200} alt="QR Code" />

      <Flex w="100%">
        <Input value={order.code} readOnly radius={0} flex={1} />
        <CopyButton value={order.code}>
          {({ copied, copy }) => (
            <Button color={copied ? 'teal' : 'blue'} radius={0} onClick={copy}>
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          )}
        </CopyButton>
      </Flex>
    </Stack>
  );
}
