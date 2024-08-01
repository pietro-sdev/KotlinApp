// src/components/Hero.tsx
import React, { useEffect } from 'react';
import { BackgroundImage, Container, Stack, Title } from '@mantine/core';
import { SearchForm } from '@/components/Search/Form';
import { CookieConsent } from '@/components/Cookies/CookieConsent'; // Importe o novo componente

import heroBg from '@/assets/hero.jpeg';
import classes from './styles.module.css';
import { gaConversion } from '@/core/utils';


export type HeroProps = {
  title?: string;
  placeholder?: string;
}

export const Hero: React.FC<HeroProps> = ({ title  , placeholder }) => {

  useEffect(() => {
    gaConversion('AW-10878664178/yDwrCNrUkZIZEPL7rMMo');
  }, []);

  return (
    <BackgroundImage src={heroBg} h={600}>
      <Container className={classes.container}>
        <Stack>
          <Title className={classes.title}>
            {title || 'A consulta de placa mais completa da internet.'}
          </Title>
          <SearchForm placeholder={placeholder || 'Ex: HUF-8282'} />
        </Stack>
      </Container>
      <CookieConsent /> {/* Adicione o componente de aviso de cookies */}
    </BackgroundImage>
  );
};
