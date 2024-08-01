import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { useAuth } from '@/core/providers';
import { getFirstLetter } from '@/core/utils';
import classes from './styles.module.css';

export function UserInfo() {
  const { user } = useAuth();

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar radius="xl" color="blue.7">
          {getFirstLetter(user?.name || 'A')}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.name || 'Usuário'}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email || 'usuario@email.com'}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
