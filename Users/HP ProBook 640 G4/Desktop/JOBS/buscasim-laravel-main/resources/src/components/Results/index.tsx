import { SearchResult } from '@/core/services/search';
import { Button } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

export interface ResultInfoProps {
  data: SearchResult;
  show?: boolean;
  premium?: boolean;
  onScroll?: VoidFunction;
}

export function showInfo({
  info,
  premium,
  onScroll,
}: ResultInfoProps & { info: string | null }) {
  if (premium) return info;

  return (
    <Button
      size="compact-sm"
      leftSection={<IconLock size={18} />}
      onClick={() => onScroll && onScroll()}
    >
      Bloqueada
    </Button>
  );
}

export * from './LeftInfo';
export * from './RightInfo';
export * from './Overview';
export * from './FreeInfo';
export * from './PremiumInfo';
