import { Paper, Stack, Text, TextInput, Title } from '@mantine/core';

import { OptionsFormProps } from '..';
import { AnchorLink } from '@/components/__commons';

export function GoogleAdsForm({ form }: OptionsFormProps) {
  return (
    <Paper p="md" withBorder>
      <Stack>
        <Title order={3}>Google Ads</Title>
        <Text c="dimmed">
          Adicione a tag relacionada a campanha no painel do Google Ads. Para
          copiar o ID da tag,{' '}
          <AnchorLink href="https://ads.google.com/aw/tagsettings" blank>
            Clique aqui.
          </AnchorLink>
        </Text>

        <Stack>
          <TextInput
            {...form.getInputProps('options.5.value')}
            placeholder="Adicione o ID da tag do Google Ads"
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
