import { Table, Badge, Button } from '@mantine/core';
import { ResultInfoProps, showInfo } from '..';
import { IconLock } from '@tabler/icons-react';
import { useSetState } from '@mantine/hooks';
import { useEffect } from 'react';
import axios from 'axios';

interface Props extends ResultInfoProps {
  onScroll: VoidFunction;
}

export function ResultsRightInfo({ data, premium, onScroll }: Props) {
  const [visibility, setVisibility] = useSetState({
    placa_alternativa: true,
    pronome: true,
    endereco_proprietario: true,
    doc_proprietario: true,
    telefone_proprietario: true,
    potencia: true,
    capacidadepassag: true,
    procedencia: true,
    motoragregados: true,
    restricao_finan: true,
    restricao_nome_agente: true,
    restricao_arrendatario: true,
    restricao_data_inclusao: true,
    numerocontratofinanceira: true,
    codigoagentefinanceiro: true,
    datavigenciacontratofinanceira: true,
    existedebitodeipva: true,
    existedebitomulta: true,
    debipva: true,
    existedebitodelicenciamento: true,
    valortotaldebitomulta: true,
    existedebitodedpvat: true,
    dpvat: true,
    outras_restricoes_01: true,
    outras_restricoes_02: true,
    outras_restricoes_03: true,
    outras_restricoes_04: true,
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

  const renderField = (field, value) => {
    if (premium || visibility[field]) {
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

  const {
    placa_alternativa,
    pronome: nome, // Atualizado para usar o nome correto
    endereco_proprietario,
    cpf_cnpj_proprietario: doc_proprietario, // Atualizado para usar o nome correto
    telefone_proprietario,
    potencia,
    capacidadepassag: capacidade_passageiros, // Atualizado para usar o nome correto
    veiprocedencia: procedencia, // Atualizado para usar o nome correto
    motoragregados,
    restricaofinan: restricao_finan, // Atualizado para usar o nome correto
    restricaonomeagente: restricao_nome_agente, // Atualizado para usar o nome correto
    restricaoarrendatario: restricao_arrendatario, // Atualizado para usar o nome correto
    restricaodatainclusao: restricao_data_inclusao, // Atualizado para usar o nome correto
    numerocontratofinanceira,
    codigoagentefinanceiro,
    datavigenciacontratofinanceira,
    existedebitodeipva,
    existedebitomulta,
    debipva,
    existedebitodelicenciamento,
    valortotaldebitomulta,
    existedebitodedpvat,
    dpvat,
    outras_restricoes_01,
    outras_restricoes_02,
    outras_restricoes_03,
    outras_restricoes_04,
  } = data;

  return (
    <Table>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Placa Alternativa</Table.Th>
          <Table.Td>{renderField('placa_alternativa', placa_alternativa)}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Nome do proprietário</Table.Th>
          <Table.Td>{renderField('pronome', nome)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Endereço do proprietário</Table.Th>
          <Table.Td>{renderField('endereco_proprietario', endereco_proprietario)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Documento do proprietário</Table.Th>
          <Table.Td>{renderField('doc_proprietario', doc_proprietario)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Telefone do proprietário</Table.Th>
          <Table.Td>{renderField('telefone_proprietario', telefone_proprietario)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Potência</Table.Th>
          <Table.Td>{renderField('potencia', potencia)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Capacidade de Passageiros</Table.Th>
          <Table.Td>{renderField('capacidadepassag', capacidade_passageiros)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Procedência</Table.Th>
          <Table.Td>{renderField('veiprocedencia', procedencia)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Motor agregados</Table.Th>
          <Table.Td>{renderField('motoragregados', motoragregados)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Restrição financeira</Table.Th>
          <Table.Td>{renderField('restricao_finan', restricao_finan)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nome do agente</Table.Th>
          <Table.Td>{renderField('restricao_nome_agente', restricao_nome_agente)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Arrendatário</Table.Th>
          <Table.Td>{renderField('restricao_arrendatario', restricao_arrendatario)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Data de inclusão</Table.Th>
          <Table.Td>{renderField('restricao_data_inclusao', restricao_data_inclusao)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nº do contrato financeiro</Table.Th>
          <Table.Td>{renderField('numerocontratofinanceira', numerocontratofinanceira)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Código do agente financeiro</Table.Th>
          <Table.Td>{renderField('codigoagentefinanceiro', codigoagentefinanceiro)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Data de vigência do contrato financeiro</Table.Th>
          <Table.Td>{renderField('datavigenciacontratofinanceira', datavigenciacontratofinanceira)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Existe débito de IPVA</Table.Th>
          <Table.Td>{renderField('existedebitodeipva', existedebitodeipva)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Existe débito de multa</Table.Th>
          <Table.Td>{renderField('existedebitomulta', existedebitomulta)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Débito de IPVA</Table.Th>
          <Table.Td>{renderField('debipva', debipva)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Existe débito de licenciamento</Table.Th>
          <Table.Td>{renderField('existedebitodelicenciamento', existedebitodelicenciamento)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Valor total de débito de multa</Table.Th>
          <Table.Td>{renderField('valortotaldebitomulta', valortotaldebitomulta)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Existe débito de DPVAT</Table.Th>
          <Table.Td>{renderField('existedebitodedpvat', existedebitodedpvat)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>DPVAT</Table.Th>
          <Table.Td>{renderField('dpvat', dpvat)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Outras Restrições 01</Table.Th>
          <Table.Td>{renderField('outras_restricoes_01', outras_restricoes_01)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Outras Restrições 02</Table.Th>
          <Table.Td>{renderField('outras_restricoes_02', outras_restricoes_02)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Outras Restrições 03</Table.Th>
          <Table.Td>{renderField('outras_restricoes_03', outras_restricoes_03)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Outras Restrições 04</Table.Th>
          <Table.Td>{renderField('outras_restricoes_04', outras_restricoes_04)}</Table.Td>
        </Table.Tr>

      </Table.Tbody>
    </Table>
  );
}
