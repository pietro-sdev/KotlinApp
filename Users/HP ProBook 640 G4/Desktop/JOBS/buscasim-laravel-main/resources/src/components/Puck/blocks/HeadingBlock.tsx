import { ComponentConfig } from '@measured/puck';
import { PuckCustomBlocksProps } from '../puck.types';

import { Title } from '@mantine/core';
import { getPuckFields } from '../puck.config';

export function HeadingBlock({
  content,
  size,
  textAlign,
  color,
}: PuckCustomBlocksProps) {
  return (
    <Title size={size} ta={textAlign} c={color}>
      {content}
    </Title>
  );
}

export const HeadingBlockConfig: ComponentConfig<PuckCustomBlocksProps> = {
  fields: getPuckFields(),
  defaultProps: {
    content: 'Título',
  },
  render: ({ ...props }) => <HeadingBlock {...props} />,
};
