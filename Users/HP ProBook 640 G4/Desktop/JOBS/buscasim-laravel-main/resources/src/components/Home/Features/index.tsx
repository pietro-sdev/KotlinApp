import { Text, Title, Container, SimpleGrid } from '@mantine/core';
import { IconCarSuv, IconTable, IconUserDollar } from '@tabler/icons-react';
import { Feature } from './feature';
import classes from './styles.module.css';

export function Features() {
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        Saiba todas as informações importantes sobre o veículo
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Obtenha um relatório detalhado com a marca, modelo, ano, valor de
          mercado entre outras informações relevantes.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features.map((feature, index) => (
          <Feature {...feature} key={index} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export const features = [
  {
    icon: IconCarSuv,
    title: 'Informações do veículo',
    description:
      'Consiga informações sobre a cor, modelo, categoria e muito mais sobre o veículo.',
  },
  {
    icon: IconTable,
    title: 'Tabela FIPE',
    description:
      'Utilize as informações da tabela FIPE para consultar o valor de mercado do veículo.',
  },
  {
    icon: IconUserDollar,
    title: 'Situação Financeira',
    description:
      'Consulte a situação financeira do veículo para tomar a melhor decisão.',
  },
];
