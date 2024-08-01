// src/components/CookieConsent.tsx
import React, { useState, useEffect } from 'react';
import { Button, Text, Paper } from '@mantine/core';
import classes from './styles.module.css';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <Paper className={classes.cookieConsent} shadow="md" p="md">
      <Text>
        Usamos cookies para melhorar sua experiência no nosso site. Ao continuar navegando, você concorda com nossa política de cookies.
      </Text>
      <Button onClick={handleAccept} className={classes.cookieButton}>
        Aceitar
      </Button>
    </Paper>
  );
};
