import { Text, Title, Container, SimpleGrid } from '@mantine/core';
import { Feature } from './feature';
import classes from './styles.module.css';


export type FeaturesProprs = {
  title?: string;
  description?: string;
  features: {
    icon: any;
    title: string;
    description: string;
  }[];
}

export function Features({title , description ,  features }:FeaturesProprs) {
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        {title}
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>
      <br />

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

export const DefautFeatures = [
  {
    icon: 'IconCarSuv',
    title: 'Informações do veículo',
    description:
      'Consiga informações sobre a cor, modelo, categoria e muito mais sobre o veículo.',
  },
  {
    icon: 'IconTable',
    title: 'Tabela FIPE',
    description:
      'Utilize as informações da tabela FIPE para consultar o valor de mercado do veículo.',
  },
  {
    icon: 'IconUserDollar',
    title: 'Situação Financeira',
    description:
      'Consulte a situação financeira do veículo para tomar a melhor decisão.',
  },
];
