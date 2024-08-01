import { useState, useEffect } from 'react';
import { Table, Button } from '@mantine/core';
import axios from 'axios';
import { ResultInfoProps, showInfo } from '..';
import { IconLock } from '@tabler/icons-react';

interface Props extends ResultInfoProps {
  onScroll: VoidFunction;
}

export function ResultsOverview({ data, premium, onScroll }: Props) {
  const [visibility, setVisibility] = useState({
    placa: true,
    placa_alternativa: false, // Placa Mercosul bloqueado por predefinição
    marcaModelo: true,
    veianofabr: true,
    cor: true,
  });

  console.log(data)

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
    placa,
    placaMercosul,
    fabricante,
    modelo,
    veianofabr,
    cor
  } = data;

  const renderField = (field: string | number | null, visibilityField: keyof typeof visibility) => {
    if (premium || visibility[visibilityField]) {
      return field || showInfo({ info: null, premium, onScroll });
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
      <tbody>
        <tr>
          <th>Placa</th>
          <td>{renderField(placa, 'placa')}</td>
        </tr>
        <tr>
          <th>Placa Mercosul</th>
          <td>
            <Button
              size="compact-sm"
              leftSection={<IconLock size={18} />}
              onClick={() => onScroll && onScroll()}
            >
              Bloqueada
            </Button>
          </td> {/* Sempre bloqueado */}
        </tr>
        <tr>
          <th>Fabricante</th>
          <td>{renderField(fabricante, 'placa_alternativa')}</td>
        </tr>
        <tr>
          <th>Modelo</th>
          <td>{renderField(modelo, 'marcaModelo')}</td>
        </tr>
        <tr>
          <th>Ano de Fabricação</th>
          <td>{renderField(veianofabr, 'veianofabr')}</td>
        </tr>
        <tr>
          <th>Cor</th>
          <td>{renderField(cor, 'cor')}</td>
        </tr>
      </tbody>
    </Table>
  );
}
