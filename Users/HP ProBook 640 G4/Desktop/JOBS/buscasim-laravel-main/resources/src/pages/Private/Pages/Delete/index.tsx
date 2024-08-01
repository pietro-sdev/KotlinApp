import  { useState } from 'react';
import { Modal, Button, Group , Text} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePageDelete } from '@/core/services/pages';

let onDeleteAction: (title: string, id: number) => void;

export function Delete() {
    const [opened, { open, close }] = useDisclosure(false);
    const [title, setTitle] = useState('');
    const [id, setId] = useState<number | undefined>(undefined);
    const onDeletePage = usePageDelete();

    onDeleteAction = (title: string, id: number) => {
        setTitle(title);
        setId(id);
        open();
    };

    const handleConfirmDelete = () => {

        if(id){
            onDeletePage.mutate(id)
        }
        close();
    };

    return (
        <Modal 
            opened={opened} 
            onClose={close} 
            title={`Confirmar exclusão de "${title}"`} 
            lockScroll={false} 
            centered
            >
            <Text size="sm">
                Tem certeza de que deseja excluir esta página? Esta ação não poderá ser desfeita e todos os dados associados serão permanentemente perdidos.
            </Text>
            <Group justify="flex-end" mt="md" grow>
                <Button variant="light" onClick={close}>Cancelar</Button>
                <Button variant="filled" color="#fa5252" onClick={handleConfirmDelete}>Confirmar</Button>
            </Group>
        </Modal>
    );
}

export const onDelete = (title: string, id: number) => {
    onDeleteAction(title, id);
};
