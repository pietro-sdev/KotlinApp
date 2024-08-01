import { Text } from '@mantine/core';
import { ComponentConfig } from '@measured/puck';
import { PuckCustomBlocksProps } from '../puck.types';
import { getPuckFields } from '../puck.config';

export function ParagraphBlock({
  content,
  size,
  textAlign,
  color,
}: PuckCustomBlocksProps) {
  return (
    <Text size={size} ta={textAlign} c={color}>
      {content}
    </Text>
  );
}

export const ParagraphBlockConfig: ComponentConfig<PuckCustomBlocksProps> = {
  fields: getPuckFields(),
  defaultProps: {
    content: 'Título',
    size: 'md',
    textAlign: 'left',
  },
  render: ({ ...props }) => <ParagraphBlock {...props} />,
};
