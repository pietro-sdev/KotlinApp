import {
  Container,
  Group,
  Burger,
  Image,
  Drawer,
  Stack,
  Divider,
  Button,
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

import { AnchorLink } from '@/components/__commons';
import classes from './styles.module.css';

import logo from '@/assets/logo.svg';
import { useAuth } from '@/core/providers';
import { IconUserCircle } from '@tabler/icons-react';

interface Props {
  opened: boolean;
  toggle: VoidFunction;
}

const links = [
  { link: '/perguntas-frequentes', label: 'Perguntas Frequentes' },
  { link: '/contato', label: 'Contato' },
  { link: '/minhas-consultas', label: 'Minhas Consultas', className: classes.pulse },
];

export function PublicHeader({ opened, toggle }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  const items = links.map((link) => (
    <AnchorLink
      key={link.link}
      href={link.link}
      className={`${classes.link} ${link.className || ''}`}
      data-active={link.link === location.pathname || undefined}
    >
      {link.label}
    </AnchorLink>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <AnchorLink href="/">
          <Image src={logo} width={100} height={48} />
        </AnchorLink>
        <Group visibleFrom="xs">
          {items}
          {user && user.role === 'admin' && (
            <Button
              variant="outline"
              leftSection={<IconUserCircle />}
              component={Link}
              to="/app"
            >
              Painel
            </Button>
          )}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
      <Drawer
        opened={opened}
        onClose={toggle}
        title={
          <AnchorLink href="/">
            <Image src={logo} width={100} height={48} />
          </AnchorLink>
        }
        position="right"
        size="60%"
      >
        <Divider />
        <Stack>{items}</Stack>
      </Drawer>
    </header>
  );
}
