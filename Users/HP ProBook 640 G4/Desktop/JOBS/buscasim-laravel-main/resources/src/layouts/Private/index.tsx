import { Suspense, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Button, Group } from '@mantine/core';

import { PageLoader } from '@/components/__commons';
import { Menu } from './Menu';
import { useAuth } from '@/core/providers';
import { useLogout } from '@/core/services/auth';
import { IconHome, IconLogout } from '@tabler/icons-react';

export function PrivateLayout() {
  const { user, authenticated } = useAuth();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
  }

  useEffect(() => {
    if (!authenticated || user === null || user.role === 'user') {
      navigate('/');
    }
  }, [user, authenticated, navigate]);

  if (user === null) return <PageLoader />;

  return (
    <AppShell
      layout="alt"
      padding="md"
      header={{ height: 80 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
      }}
    >
      <AppShell.Header>
        <Group h="100%" justify="end" align="center" gap="xs" px="md">
          <Button
            component={Link}
            to="/"
            variant="outline"
            size="compact-sm"
            leftSection={<IconHome size={16} />}
          >
            Ir para a home
          </Button>
          <Button
            onClick={() => handleLogout()}
            variant="outline"
            color="red"
            size="compact-sm"
            leftSection={<IconLogout size={16} />}
            loading={logoutMutation.isLoading}
          >
            Sair
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Menu />
      </AppShell.Navbar>
      <AppShell.Main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
