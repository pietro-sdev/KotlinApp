import { Container, Group, Image } from '@mantine/core';

import { AnchorLink } from '@/components/__commons';
import classes from './styles.module.css';
import logo from '@/assets/logo.svg';

const links = [
  { link: '/politica-de-privacidade', label: 'Política de privacidade' },
  { link: '/termos-de-uso', label: 'Termos de uso' },
  { link: '/perguntas-frequentes', label: 'Perguntas frequentes' },
  { link: '/contato', label: 'Contato' },
];

export function PublicFooter() {
  const items = links.map((link) => (
    <AnchorLink
      key={link.link}
      href={link.link}
      className={classes.link}
      c="dimmed"
    >
      {link.label}
    </AnchorLink>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <AnchorLink href="/">
          <Image src={logo} width={100} height={48} />
        </AnchorLink>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
