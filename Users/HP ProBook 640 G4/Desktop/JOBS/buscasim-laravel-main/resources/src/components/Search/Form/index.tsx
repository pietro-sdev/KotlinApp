import { AxiosError } from 'axios';
import { useForm, yupResolver } from '@mantine/form';
import { Button, Modal } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import * as Yup from 'yup';
import { useState } from 'react';

import { SearchRequest, useSearch } from '@/core/services/search';
import { getFormErrors } from '@/core/utils';
import { MaskedInput } from '@/components/__commons';
import { SearchLoader } from '..';

import classes from './styles.module.css';

const schema = Yup.object().shape({
  plate: Yup.string().required('Informe uma placa para consultar'),
});

interface SearchFormProps{
  placeholder?: string
}

export function SearchForm({ placeholder }:SearchFormProps) {
  const mutation = useSearch();
  const [noResultsModalOpen, setNoResultsModalOpen] = useState(false);
  const form = useForm<SearchRequest>({
    validate: yupResolver(schema),
    initialValues: {
      plate: '',
    },
  });

  async function handleSearch(values: SearchRequest) {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  const handleSupportClick = () => {
    window.location.href = '/contato';
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSearch)} className={classes.controls}>
        <MaskedInput
          {...form.getInputProps('plate')}
          mask="plate"
          name="plate"
          autoComplete="on"
          placeholder={placeholder|| "Ex: EPX3E00"}
          classNames={{ input: classes.input, root: classes.inputWrapper }}
        />
        <Button
          type="submit"
          className={classes.control}
          loading={mutation.isLoading}
        >
          <IconSearch />
        </Button>
      </form>
      <SearchLoader loading={mutation.isLoading} />

      <Modal
        opened={noResultsModalOpen}
        onClose={() => setNoResultsModalOpen(false)}
        title="Nenhum resultado encontrado"
      >
        <p>Nenhum resultado foi encontrado para a placa informada. Por favor, entre em contato.</p>
        <Button onClick={handleSupportClick}>Suporte - Jivo</Button>
      </Modal>
    </>
  );
}
