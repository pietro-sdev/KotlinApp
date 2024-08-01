import {
  Box,
  Center,
  Loader,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
} from '@mantine/core';

interface Props {
  loading: boolean;
}

export function SearchLoader({ loading }: Props) {
  const children = (
    <Center h="100%">
      <Stack align="center">
        <Loader color="indigo" size="md" />
        <Text>Buscando informações...</Text>
      </Stack>
    </Center>
  );

  return (
    <Modal opened={loading} onClose={() => {}} centered withCloseButton={false}>
      <Box pos="relative" h={300}>
        <LoadingOverlay visible={loading} loaderProps={{ children }} />
      </Box>
    </Modal>
  );
}
