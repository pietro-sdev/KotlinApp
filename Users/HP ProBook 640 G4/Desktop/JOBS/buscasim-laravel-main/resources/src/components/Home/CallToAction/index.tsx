import { SearchForm } from '@/components/Search/Form';
import { Center, Container, Stack, Text, Title } from '@mantine/core';

export function CallToAction() {
  return (
    <Center p="xl" bg="blue.7" c="white">
      <Container>
        <Stack>
          <Title order={2}>Faça agora uma consulta</Title>
          <Text>Pesquise uma placa e tenha acesso a diversas informações.</Text>
          <SearchForm />
        </Stack>
      </Container>
    </Center>
  );
}
