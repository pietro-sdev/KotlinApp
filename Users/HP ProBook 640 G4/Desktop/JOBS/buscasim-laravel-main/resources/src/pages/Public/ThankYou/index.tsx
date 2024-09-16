import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Title, Text, Button, Container, Group } from '@mantine/core';

import { useSearchResults } from '@/core/providers';
import { gaConversion } from '@/core/utils';

import classes from './styles.module.css';

export default function ThankYouPage(
  { title, subtitle, description, buttonText, isEdit , background}:
  {title?:string,  subtitle?: string , description?:string , buttonText?:string, isEdit?:any , background?:any}
  )
  {
  const { payment } = useSearchResults();
  const navigate = useNavigate();
  const location = useLocation();
  const { info } = location.state || {};

  useEffect(() => {
    if (!payment) {
      if(!isEdit){
        navigate('/');
      }
    } else {
      gaConversion('AW-10878664178/bqGBCI_slpIZEPL7rMMo');
    }
  }, []);

  return (
    <div
      className={classes.root}
      style={{background:background? background.hex : ''}}
      >
      <Container>
        <div className={classes.label}>{title}</div>
        <Title className={classes.title}>
          {subtitle}
        </Title>
        <Group justify="center">
          <Text  size="lg" className={classes.description} style={{ textAlign:'center' }}>
            {description}
          </Text>
        </Group>
        {info && (
          <Text size="lg" ta="center" className={classes.description}>
            Valor da consulta: {info.price}
          </Text>
        )}
        <Group justify="center">
          <Button component={Link} to="/resultados" variant="primary" size="md">
          {buttonText}
          </Button>
        </Group>
      </Container>
    </div>
  );
}
