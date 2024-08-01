import { PagesList } from '@/components/Pages/List';
import { Button, Flex, Loader, Paper, Stack } from '@mantine/core';
import { usePageCreate } from '@/core/services/pages';
import { Delete } from '@/pages/Private/Pages/Delete'

export default function PagesPage() {

  const { mutate: createPage, isLoading } = usePageCreate();

  const handleCreatePage = () => {
    createPage();
  };

  return (
    <Paper p="md" withBorder>
      <Flex justify="flex-end" align="center">
        <Button
          style={{
            minWidth: '120px',
            pointerEvents: isLoading ? 'none' : 'auto'
          }}
          onClick={handleCreatePage}
          >
          {isLoading ? <Loader size={35} type="dots" color='#f3f3f3' /> : 'Nova Página'}
        </Button>
      </Flex>
      <Stack>
        <PagesList />
      </Stack>
      <Delete/>
    </Paper>
  );
}
