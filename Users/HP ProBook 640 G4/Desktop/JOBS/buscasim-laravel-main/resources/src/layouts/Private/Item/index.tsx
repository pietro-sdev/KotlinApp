import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';

interface MenuItemProps {
  icon: React.FC<any>;
  label: string;
  link: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function MenuItem({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
}: MenuItemProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();

  const items = (hasLinks ? links : []).map((item) => (
    <Text
      component={Link}
      className={classes.link}
      to={item.link}
      key={item.link}
    >
      {item.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          !hasLinks && navigate(link);
          setOpened((o) => !o);
        }}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
