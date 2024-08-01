import { Link } from 'react-router-dom';
import {
  Button,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useAuth } from '@/core/providers';
import classes from './styles.module.css';
import { Illustration } from './illustration';

export default function NotFoundPage() {
  const { authenticated } = useAuth();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Página não encontrada!</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            A página que você tentou acessar não existe ou não está mais
            disponível.
          </Text>
          <Group justify="center">
            <Button
              component={Link}
              to={authenticated ? '/app' : '/'}
              size="md"
              variant="primary"
              leftSection={<IconHome />}
            >
              Voltar para a Home
            </Button>
          </Group>
        </div>
      </div>
    </Container>
    // <Center className={classes.wrapper}>
    //   <Container>
    //     <Stack>
    //       <Text size={rem(96)} ta="center">
    //         404
    //       </Text>
    //       <Text c="dimmed">
    //         Oops! A página que você está tentando acessar não existe.
    //       </Text>
    //       <Button
    //         component={Link}
    //         to={authenticated ? '/app' : '/'}
    //         size="xl"
    //         variant="primary"
    //         leftSection={<IconHome />}
    //       >
    //         Voltar para a Home
    //       </Button>
    //     </Stack>
    //   </Container>
    // </Center>
  );
}
