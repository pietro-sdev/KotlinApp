import { MantineSize } from '@mantine/core';
import { Config, Data } from '@measured/puck';
import { ButtonBlockProps } from './blocks/ButtonBlock';

export interface PuckCustomBlocks {
  HeadingBlock: PuckCustomBlocksProps;
  ParagraphBlock: PuckCustomBlocksProps;
  ButtonBlock: ButtonBlockProps;
}

export interface PuckCustomBlocksProps {
  content?: string;
  size?: MantineSize;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
}

export interface PuckProps {
  data: Data<PuckCustomBlocks>;
  config: Config<PuckCustomBlocks>;
  onPublish?: (data: Data) => void;
}
