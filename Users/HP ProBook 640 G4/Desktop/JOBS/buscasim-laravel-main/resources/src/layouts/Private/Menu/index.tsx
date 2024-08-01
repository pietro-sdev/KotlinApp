import React, { useEffect, useState } from 'react';
import { Group, ScrollArea } from '@mantine/core';
import {
  IconUsers,
  IconSettings,
  IconTicket,
  IconNote,
  IconMessage,
  IconPageBreak,
} from '@tabler/icons-react';
import { Logo } from '../Logo';
import { MenuItem } from '../Item';
import { UserInfo } from '../UserInfo';
import classes from './styles.module.css';
import axios from 'axios';
import { getAuthToken } from '@/core/providers';

const menuItems = [
  { label: 'Pedidos', link: '/app', icon: IconNote, display: '1' },
  { label: 'Cupons', link: '/app/cupons', icon: IconTicket, display: '1' },
  { label: 'Contatos', link: '/app/contatos', icon: IconMessage, display: '1' },
  { label: 'Usuários', link: '/app/usuarios', icon: IconUsers, display: '1' },
  { label: 'Páginas', link: '/app/paginas', icon: IconPageBreak, display: '1' },
  { label: 'Configurações', link: '/app/configuracoes', icon: IconSettings, display: '1' },
  { label: 'Campos Visíveis', link: '/fields', icon: IconSettings, display: '1' },
];

export function Menu() {
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/permissions/get-permissions', {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        });
        setPermissions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPermissions();
  }, []);

  if (!permissions) {
    return <div>Loading...</div>;
  }

  const UserPermissions = Object.values(permissions);
  let contador = 0

  const links = menuItems.map((item, contador) => {
    console.log(contador)
      return (
        <div style={{display: UserPermissions[contador] === 1 ? "block" : "none"}}>
        <MenuItem {...item} key={item.label} />
      </div>
      );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <Logo />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserInfo />
      </div>
    </nav>
  );
}
