import { Data, Puck } from '@measured/puck';
import { PuckProps } from './puck.types';
import { Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

export function PuckEditor({ config, data, onPublish }: PuckProps) {
  function handleSave(data: Data) {
    onPublish && onPublish(data);
  }

  return (
    <Puck
      config={config}
      data={data}
      onPublish={handleSave}
      overrides={{
        headerActions: () => (
          <Group>
            <Button component={Link} to="/app/paginas" variant="subtle">
              Ver todas as páginas
            </Button>
          </Group>
        ),
      }}
    />
  );
}
