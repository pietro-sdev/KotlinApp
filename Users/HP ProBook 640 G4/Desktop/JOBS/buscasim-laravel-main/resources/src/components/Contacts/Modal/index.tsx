import { useEffect } from 'react';
import {
  ActionIcon,
  Modal,
  ModalProps,
  SimpleGrid,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Contact, CreateContactRequest } from '@/core/services/contacts';
import { IconBrandWhatsapp } from '@tabler/icons-react';

type Props = ModalProps & {
  contact?: Contact;
};

const message = `
  Olá, somos da Busca Sim e gostaríamos de saber como te ajudar
`;

export function ContactModal({ contact, ...props }: Props) {
  const form = useForm<CreateContactRequest>({
    initialValues: {
      name: '',
      email: '',
      message: '',
      phone: '',
      subject: '',
    },
  });

  function handleWhatsApp(phone: string) {
    const onlyNumbers = phone.replace(/[^\d]/g, '');
    const url = `https://wa.me/55${onlyNumbers}?text=${encodeURI(message)}`;

    window.open(url, '_blank')?.focus();
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (contact) {
      form.setValues({ ...contact });
    }
  }, [contact]);

  return (
    <Modal
      {...props}
      title="Detalhes da mensagem"
      centered
      onClose={handleClose}
      size="lg"
    >
      <form>
        <Stack>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              {...form.getInputProps('name')}
              label="Nome"
              placeholder="Informe seu nome"
              name="name"
              readOnly
            />
            <TextInput
              {...form.getInputProps('email')}
              label="E-mail"
              placeholder="EX: exemplo@email.com"
              name="email"
              readOnly
            />
          </SimpleGrid>

          <TextInput
            {...form.getInputProps('phone')}
            label="Telefone"
            placeholder="(00) 0000-0000"
            readOnly
            withAsterisk
            rightSection={
              <ActionIcon
                color="green"
                onClick={() => handleWhatsApp(form.values.phone)}
              >
                <IconBrandWhatsapp />
              </ActionIcon>
            }
          />

          <TextInput
            {...form.getInputProps('subject')}
            label="Assunto"
            placeholder="Qual o motivo do contato?"
            mt="md"
            name="subject"
            readOnly
          />

          <Textarea
            {...form.getInputProps('message')}
            mt="md"
            label="Sua mensagem"
            placeholder="Conte para nós qual é a sua dúvida"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            readOnly
          />
        </Stack>
      </form>
    </Modal>
  );
}
