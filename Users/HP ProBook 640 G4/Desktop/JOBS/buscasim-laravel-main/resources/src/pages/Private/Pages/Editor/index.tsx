import { PageLoader } from '@/components/__commons';
import { usePage, usePageUpdate } from '@/core/services/pages';
import { Link, useParams } from 'react-router-dom';
import { Puck } from "@measured/puck";
import { Data } from '@measured/puck';
import conf from "./Config";
import { Box, Button, Group } from '@mantine/core';


const PuckEditor = () => {
  const { pageId } = useParams();
  const { data, isLoading } = usePage(Number(pageId));
  const mutation = usePageUpdate();

  if (isLoading) {return <PageLoader />;}

  const defaltContent =  {
    root: {
      props: {
        title: data?.title,
        description: data?.description,
        slug: data?.slug,
      },
    },
    content: [
    ]
  }

  const content = data?.content ? JSON.parse(data.content) : defaltContent;


  const handlePublish = async (_data_: Data) => {
    try {
      const slug = _data_.root.props?.slug;

      const updatedData = {
        id: Number(pageId),
        title: _data_.root?.props?.title || 'title',
        description:  _data_.root?.props?.description || 'descriptios',
        slug: !slug.startsWith('/') ? `/${slug}` : slug,
        content: JSON.stringify(_data_),
        is_published: true,
      };

      await mutation.mutateAsync(updatedData);
      console.log('Página atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar página:', error);
    }
  };

  return (
    <Box pos="relative" style={{ zIndex: 300 }}>
      <Puck
        iframe={{ enabled: false }}
        config={conf}
        data={content.root && content.content ? content : defaltContent}
        onPublish={(data: Data) => handlePublish(data)}
        overrides={{
          headerActions: () => (
            <Group>
              <Button component={Link} to="/app/paginas" variant="subtle">
                Ver todas as páginas
              </Button>
            </Group>
          ),
        }}
      />
    </Box>
  );
};

export default PuckEditor;
