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
import { SpacerProps } from '@/pages/Private/Pages/Editor/Config/Fields/Spacer';

import classes from './styles.module.css';


const schema = Yup.object().shape({
  plate: Yup.string().required('Informe uma placa para consultar'),
});

type SearchFormProps = {
  placeholder?: string,
  primary_color?: string,
  seccond_color?: string,
  text_color?: string,
  icon_color?: string,
  placeholder_color?: string,
  radius?:number,
  size?:number,
  paddings?: SpacerProps;
  margins?: SpacerProps;
  result_page?: string[];
  align?: "left" | "center" | "right";
}

interface CustomCSSProperties extends React.CSSProperties {
  '--search-bg-color'?: string;
  '--search-radius'?: string;
  '--search-size'?: string;
  '--search-placeholder-color'?: string;
  '--search-detech-color'?: string;
  '--search-text-color'?: string;
}


export function SearchForm({
  placeholder,
  primary_color ,
  seccond_color ,
  text_color ,
  icon_color ,
  placeholder_color,
  radius,
  size,
  paddings,
  margins,
  result_page,
  align
}:SearchFormProps) {
  const mutation = useSearch(result_page);
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

  const SearchStyles: CustomCSSProperties = {
    '--search-bg-color': primary_color,
    '--search-radius': `${radius}px`,
    '--search-size': `${size}%`,
    '--search-placeholder-color': placeholder_color,
    '--search-detech-color': seccond_color,
    '--search-text-color': text_color,
    paddingLeft:`${paddings?.left}px`,
    paddingRight:`${paddings?.right}px`,
    paddingTop: `${paddings?.top}px`,
    paddingBottom: `${paddings?.bottom}px`,
    marginLeft:`${margins?.left}px`,
    marginRight:`${margins?.right}px`,
    marginTop: `${margins?.top}px`,
    marginBottom: `${margins?.bottom}px`,
    justifyContent:`${align}`
  };

  return (
    <>
       <form
          onSubmit={form.onSubmit(handleSearch)}
          className={classes.controls}
          style={SearchStyles}
        >
        <MaskedInput
          {...form.getInputProps('plate')}
          mask="plate"
          name="plate"
          autoComplete="on"
          placeholder={placeholder}
          classNames={{ input: classes.input, root: classes.inputWrapper }}
        />
        <Button
          type="submit"
          className={classes.control}
          loading={mutation.isLoading}
        >
          <IconSearch
            style={{color:icon_color}}
          />
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
