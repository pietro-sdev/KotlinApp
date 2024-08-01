import { ColorInput } from '@mantine/core';
import { ComponentConfig } from '@measured/puck';

export type BackgroundProps = {
  background: {
    color: {
      hex: string;
    };
  };
};

export const Flex: ComponentConfig<BackgroundProps> = {
  background: {
    color: {
      type: 'custom',
      render: ({ value, name, onChange }) => (
        <ColorInput
          label="Color"
          size="md"
          defaultValue="#383838"
          value={value ? value.hex : '#383838'}
          name={name}
          onChange={(val) => {
            onChange({ hex: val });
          }}
        />
      ),
    },
  },
};
