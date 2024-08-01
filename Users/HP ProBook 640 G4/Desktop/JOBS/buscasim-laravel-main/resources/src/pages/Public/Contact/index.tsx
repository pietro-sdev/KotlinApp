import React from 'react';
import {
  Button,
  Container,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import classes from './styles.module.css';

interface JivoApi {
  open(params: { start: string }): void;
}

declare global {
  interface Window {
    jivo_api: JivoApi | undefined;
  }
}

export const DefaultProps = {
  title: 'Ainda está com dúvidas?',
  intro: 'Clique no botão abaixo para enviar a sua mensagem para a equipe de suporte. Entraremos em contato em breve.',
  end: 'Qualquer dúvida, crítica ou sugestão nos mande uma mensagem que vamos responder todas as suas dúvidas.',
  textButtom: 'Suporte',
}

export type ContactProps = {
  title?: string;
  intro?: string;
  end?: string;
  textButtom?: string;
};


export const ContactPage: React.FC<ContactProps> = ({ title, intro, end, textButtom }) => {
  const abrirChat = () => {
    // Verifica se a função de abrir o chat está disponível
    if (window.jivo_api) {
      // Chama a função de abrir o chat
      window.jivo_api.open({ start: 'chat' });
    } else {
      console.error('A função do JivoChat não está disponível. Certifique-se de que o SDK do JivoChat está integrado corretamente.');
    }
  };

  return (
    <Container className={classes.wrapper}>
      <img src="https://github.com/Icegreeen/blog-graphQL/assets/56550632/6387443f-986b-4c59-b61d-2393d58b872b" alt="" />
      <Stack>
        <Title className={classes.title} order={1}>
          {title}
        </Title>

        <Text>
          {intro}
        </Text>

        <Text>
          {end}
        </Text>

        <div>
          <Button onClick={abrirChat}>{textButtom}</Button>
        </div>
      </Stack>
    </Container>
  );
}

export default ContactPage;
