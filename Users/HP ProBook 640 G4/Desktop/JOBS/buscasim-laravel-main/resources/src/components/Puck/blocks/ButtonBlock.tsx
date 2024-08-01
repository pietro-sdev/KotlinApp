import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ComponentConfig } from '@measured/puck';
import { PuckCustomBlocksProps } from '../puck.types';
import { getPuckFields } from '../puck.config';

export type ButtonBlockProps = PuckCustomBlocksProps & {
  href?: string;
  variant?: 'primary' | 'outline';
};

export function ButtonBlock({
  content,
  href,
  variant,
  size,
  color,
}: ButtonBlockProps) {
  if (href)
    return (
      <Button
        component={Link}
        c={color}
        to={href}
        variant={variant || 'primary'}
        size={size}
      >
        {content}
      </Button>
    );
}

export const ButtonBlockConfig: ComponentConfig<PuckCustomBlocksProps> = {
  fields: getPuckFields(),
  defaultProps: {
    content: 'Título',
  },
  render: ({ ...props }) => <ButtonBlock {...props} />,
};
