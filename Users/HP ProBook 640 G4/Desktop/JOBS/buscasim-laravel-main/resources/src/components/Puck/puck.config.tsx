import { ColorInput } from '@mantine/core';
import { Config, Fields } from '@measured/puck';
import { PuckCustomBlocks, PuckCustomBlocksProps } from './puck.types';
import { HeadingBlockConfig } from './blocks/HeadingBlock';
import { ParagraphBlockConfig } from './blocks/ParagraphBlock';
import { ButtonBlockConfig } from './blocks/ButtonBlock';

export function getPuckFields(): Fields<PuckCustomBlocksProps> {
  return {
    content: { type: 'text' },
    size: {
      type: 'radio',
      options: [
        { label: 'xs', value: 'xs' },
        { label: 'sm', value: 'sm' },
        { label: 'md', value: 'md' },
        { label: 'lg', value: 'lg' },
        { label: 'xl', value: 'xl' },
      ],
    },
    textAlign: {
      type: 'radio',
      options: [
        { label: 'left', value: 'left' },
        { label: 'center', value: 'center' },
        { label: 'right', value: 'right' },
      ],
    },
    color: {
      type: 'custom',
      render: ({ name, value, onChange }) => (
        <ColorInput
          name={name}
          value={value}
          onChange={(value) => onChange({ value })}
        />
      ),
    },
  };
}

export const puckConfig: Config<PuckCustomBlocks> = {
  components: {
    HeadingBlock: HeadingBlockConfig,
    ParagraphBlock: ParagraphBlockConfig,
    ButtonBlock: ButtonBlockConfig,
  },
};
