// src/components/Hero.tsx
import React, { useEffect } from 'react';
import { BackgroundImage, Container, Stack, Title } from '@mantine/core';
import { CookieConsent } from '@/components/Cookies/CookieConsent'; // Importe o novo componente

import heroBg from '@/assets/hero.jpeg';
import classes from './styles.module.css';
import { gaConversion } from '@/core/utils';
import { DropZone } from '@measured/puck';


export type HeroProps = {
  title: string;
}

export const Hero: React.FC<HeroProps> = ({ title }) => {

  useEffect(() => {
    gaConversion('AW-10878664178/yDwrCNrUkZIZEPL7rMMo');
  }, []);

  return (
    <BackgroundImage src={heroBg} h={600}>
      <Container className={classes.container}>
        <Stack>
          <Title className={classes.title}>
            {title}
          </Title>
          <DropZone
              zone={`searsh-bar`}
              disallow={["Flex", "Block", "HeadingBlock", "Paragraph", "Table", "List", "Hero", "Feature", "Contact", "Faq", "ThankYou", "Results"]}
          />
        </Stack>
      </Container>
      <CookieConsent />
    </BackgroundImage>
  );
};
