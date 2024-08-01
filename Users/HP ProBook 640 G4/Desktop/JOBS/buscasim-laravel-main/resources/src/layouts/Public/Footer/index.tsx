import { Container, Group, Image, TextInput, Button, Text } from '@mantine/core';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

import { AnchorLink } from '@/components/__commons';
import classes from './styles.module.css';
import logo from '@/assets/logo.svg';

const links = [
  { link: '/politica-de-privacidade', label: 'Política de privacidade' },
  { link: '/termos-de-uso', label: 'Termos de uso' },
  { link: '/perguntas-frequentes', label: 'Perguntas frequentes' },
  { link: '/contato', label: 'Contato' },
  { link: '/parceiros', label: 'Parceiros' }, // Novo link para Parceiros
];

const socialLinks = [
  { link: 'https://instagram.com', icon: FaInstagram },
  { link: 'https://linkedin.com', icon: FaLinkedin },
];

export function PublicFooter() {
  const linkItems = links.map((link) => (
    <AnchorLink
      key={link.link}
      href={link.link}
      className={classes.link}
      c="dimmed"
    >
      {link.label}
    </AnchorLink>
  ));

  const socialItems = socialLinks.map((social) => (
    <AnchorLink
      key={social.link}
      href={social.link}
      className={classes.socialLink}
      target="_blank"
    >
      <social.icon size={20} />
    </AnchorLink>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logoAndSocial}>
          <AnchorLink href="/">
            <Image src={logo} width={100} height={48} />
          </AnchorLink>
          <Group className={classes.socialLinks}>{socialItems}</Group>
        </div>
        <Group className={classes.links}>{linkItems}</Group>
      </Container>
    </div>
  );
}
