import { Center, Loader } from '@mantine/core';

export function PageLoader() {
  return (
    <Center h="100%">
      <Loader size={48} type="dots" />;
    </Center>
  );
}
