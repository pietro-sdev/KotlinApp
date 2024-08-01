import { useState } from 'react';
import { Breadcrumbs, Group, Paper, Portal, Stack, Text } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { AnchorLink } from '@/components/__commons';
import {
  Contact,
  ContactListQuery,
  useContacts,
} from '@/core/services/contacts';
import {
  ContactModal,
  ContactsFilters,
  ContactsList,
} from '@/components/Contacts';

export default function ContactsPage() {
  const [params, setParams] = useState<ContactListQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const [selected, setSelected] = useState<Contact>();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = useContacts(debounced);

  return (
    <Stack>
      <Group justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Contatos</Text>
        </Breadcrumbs>
        <ContactsFilters onChange={setParams} />
      </Group>

      <Paper p="md" withBorder>
        <Stack>
          <ContactsList
            data={data}
            loading={isLoading}
            onPaginate={(page) => setParams((params) => ({ ...params, page }))}
            onSelect={(item) => {
              setSelected(item);
              open();
            }}
          />
        </Stack>
      </Paper>
      <Portal>
        <ContactModal
          contact={selected}
          opened={opened}
          onClose={() => {
            setSelected(undefined);
            close();
          }}
        />
      </Portal>
    </Stack>
  );
}
