import { useState, useEffect } from 'react';
import { Table, Badge, Button } from '@mantine/core';
import axios from 'axios';
import { showInfo } from '..';
import { IconLock } from '@tabler/icons-react';

export function ResultsLeftInfo({ data, premium, onScroll }) {
  const [visibility, setVisibility] = useState({
    fabricante: true,
    uffaturado: true,
    modelo: true,
    origem: true,
    uf_jurisdicao: true,
    chassi: true,
    cor: true,
    capacidade_max_tracao: true,
    cilindradas: true,
    combustivel: true,
    numero_motor: true,
    cidade: true,
    quantidade_eixo: true,
    especie: true,
    nacionalidade: true,
    renavam: true,
    // Novos campos
    veianofabr: true,
    ano_modelo: true,
    quantidade_lugares: true,
    SUBMODELO: true,
    tipo: true,
    segmento: true,
    sub_segmento: true,
  });

  useEffect(() => {
    axios.get('/api/settings/fields')
      .then((response) => {
        setVisibility(response.data);
      })
      .catch(() => {
        // Handle the error if necessary
      });
  }, []);

  if (!data) return null;

  const {
    marca,
    modelo,
    origem,
    chassi,
    cor,
    cilindrada, // Atualizado para usar o nome correto
    combustivel,
    motor, // Atualizado para usar o nome correto
    municipio: cidade,
    eixos: quantidade_eixo, // Atualizado para usar o nome correto
    especie,
    nacionalidade,
    uf_faturado: uffaturado, // Atualizado para usar o nome correto
    capacidade_max_tracao,
    uf,
    renavam,
    veianofabr,
    veianomodelo: ano_modelo, // Atualizado para usar o nome correto
    quantidade_lugares,
    SUBMODELO,
    tipo,
    segmento,
    sub_segmento,
  } = data;

  const renderField = (field, value) => {
    if (premium || visibility[field]) {
      if (field === 'chassi' && value) {
        const visibleChars = 3; // Quantidade de caracteres visíveis antes de ocultar
        const hiddenChars = value.length - 6; // Quantidade de caracteres ocultos
        const maskedValue = value.substring(0, visibleChars) + 'x'.repeat(hiddenChars) + value.substring(value.length - 4);
        return maskedValue;
      }
      return value || showInfo({ info: null, premium, onScroll });
    }
    return (
      <Button
        size="compact-sm"
        leftSection={<IconLock size={18} />}
        onClick={() => onScroll && onScroll()}
      >
        Bloqueada
      </Button>
    );
  };

  return (
    <Table>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Fabricante</Table.Th>
          <Table.Td>{renderField('fabricante', marca)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado (UF) faturado</Table.Th>
          <Table.Td>{renderField('uffaturado', uffaturado)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Modelo</Table.Th>
          <Table.Td>{renderField('modelo', modelo)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Origem</Table.Th>
          <Table.Td>{renderField('origem', origem)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado (UF)</Table.Th>
          <Table.Td>{renderField('uf_jurisdicao', uf)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nº do chassi</Table.Th>
          <Table.Td>{renderField('chassi', chassi)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Cor</Table.Th>
          <Table.Td>{renderField('cor', cor)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Capacidade Max. de tração</Table.Th>
          <Table.Td>{renderField('capacidade_max_tracao', capacidade_max_tracao)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Cilindradas</Table.Th>
          <Table.Td>{renderField('cilindradas', cilindrada)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Combustível</Table.Th>
          <Table.Td>{renderField('combustivel', combustivel)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nº do Motor</Table.Th>
          <Table.Td>{renderField('numero_motor', motor)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Município</Table.Th>
          <Table.Td>{renderField('cidade', cidade)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Eixos</Table.Th>
          <Table.Td>{renderField('quantidade_eixo', quantidade_eixo)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Espécie</Table.Th>
          <Table.Td>{renderField('especie', especie)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>nacionalidade</Table.Th>
          <Table.Td>{renderField('nacionalidade', nacionalidade)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Renavam</Table.Th>
          <Table.Td>{renderField('renavam', renavam)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Ano de fabricação</Table.Th>
          <Table.Td>{renderField('veianofabr', veianofabr)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Ano de modelo</Table.Th>
          <Table.Td>{renderField('ano_modelo', ano_modelo)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nº de Passageiros</Table.Th>
          <Table.Td>{renderField('quantidade_lugares', quantidade_lugares)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Submodelo</Table.Th>
          <Table.Td>{renderField('SUBMODELO', SUBMODELO)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Tipo de proprietário</Table.Th>
          <Table.Td>{renderField('tipo', tipo)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Segmento</Table.Th>
          <Table.Td>{renderField('segmento', segmento)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Sub Segmento</Table.Th>
          <Table.Td>{renderField('sub_segmento', sub_segmento)}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
