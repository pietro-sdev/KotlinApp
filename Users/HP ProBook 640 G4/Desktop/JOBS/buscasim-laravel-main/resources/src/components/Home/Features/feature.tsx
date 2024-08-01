import { Text, ThemeIcon } from '@mantine/core';
import { GetIconsByName as _icon } from '@/pages/Private/Pages/Editor/Config/Fields/Icons';

interface Props {
  icon: React.FC<any>;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: Props) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <_icon name={`${Icon}`}/>
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}
