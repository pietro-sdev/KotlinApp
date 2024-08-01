import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { Breadcrumbs, Button, Grid, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { AnchorLink } from '@/components/__commons';
import {
  APIPlacasForm,
  GoogleAdsForm,
  MercadoPagoForm,
  PriceForm,
} from '@/components/Settings';
import {
  OptionsRequest,
  useOptions,
  useUpdateOptions,
} from '@/core/services/options';

import { getFormErrors } from '@/core/utils';

export default function SettingsPage() {
  const { data, isLoading } = useOptions();
  const mutation = useUpdateOptions();
  const form = useForm<OptionsRequest>({
    initialValues: {
      options: [],
    },
  });

  async function handleSave(values: OptionsRequest) {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  useEffect(() => {
    if (data) {
      form.setValues({ options: data });
    }
  }, [data]);

  return (
    <form onSubmit={form.onSubmit(handleSave)}>
      <Stack>
        <Group justify="space-between">
          <Breadcrumbs>
            <AnchorLink href="/app">Dashboard</AnchorLink>
            <Text fw="bolder">Configurações</Text>
          </Breadcrumbs>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack>
              <APIPlacasForm form={form} />
              <PriceForm form={form} />
              <MercadoPagoForm form={form} />
              <GoogleAdsForm form={form} />
            </Stack>
          </Grid.Col>
        </Grid>

        <Group>
          <Button type="submit" loading={isLoading || mutation.isLoading}>
            Salvar Configurações
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
