import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, AnchorProps } from '@mantine/core';

interface Props extends AnchorProps {
  href: string;
  children: ReactNode;
  blank?: boolean;
}

export function AnchorLink({ href, children, blank, ...props }: Props) {
  return (
    <Anchor
      {...props}
      to={href}
      component={Link}
      target={blank ? '_blank' : undefined}
    >
      {children}
    </Anchor>
  );
}
