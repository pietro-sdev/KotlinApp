import { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Container, Title, Button, Notification, Grid, Group, Text, Paper } from '@mantine/core';

export default function FieldsSettings() {
  const [settings, setSettings] = useState({
    fabricante: true,
    uffaturado: true,
    modelo: false,
    origem: false,
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
    veianofabr: true,
    ano_modelo: true,
    quantidade_lugares: true,
    SUBMODELO: true,
    tipo_doc_prop: true,
    segmento: true,
    sub_segmento: true,
    tipo_carroceria: true,
    tipo_doc_faturado: true,
    placa: true,
    placa_alternativa: false,
    marcaModelo: true,
    pronome: true,
    endereco_proprietario: true,
    doc_proprietario: true,
    situacaoveiculo: true,
    municipio: true,
    renavam: true,
    tipodocumentoproprietario: true,
    licdata: true,
    dataemissaocrv: true,
    tipodocumentofaturado: true,
    cpfcnpjfaturado: true,
    marcamodelocompleto: true,
    veianomodelo: true,
    tipo: true,
    carroceria: true,
    veicategoria: true,
    potencia: true,
    capacidadecarga: true,
    codigocategoria: true,
    codigocor: true,
    codigomarca: true,
    codigotipo: true,
    veiprocedencia: true,
    capacidadepassag: true,
    motoragregados: true,
    numero_caixacambio: true,
    numero_carroceria: true,
    numero_eixotraseirodif: true,
    numero_terceiroeixo: true,
    cmt: true,
    pbt: true,
    eixos: true,
    restricaofinan: true,
    restricaonomeagente: true,
    restricaoarrendatario: true,
    restricaodatainclusao: true,
    numerocontratofinanceira: true,
    codigoagentefinanceiro: true,
    datavigenciacontratofinanceira: true,
    existedebitodeipva: true,
    existedebitomulta: true,
    debipva: true,
    existedebitodelicenciamento: true,
    existedebitodelicenciamentovl: true,
    valortotaldebitomulta: true,
    existedebitodedpvat: true,
    dpvat: true,
    outras_restricoes_01: true,
    outras_restricoes_02: true,
    outras_restricoes_03: true,
    outras_restricoes_04: true,
    pronomeanterior: true,
    restricaocpfcnpjarrendatar: true,
    intencaonomeagente: true,
    intencaonomefinanc: true,
    intencaocpfcnpjfinanc: true,
    intencaodatainclusao: true,
    debdersa: true,
    debdetran: true,
    debcetesb: true,
    debrenainf: true,
    debmunicipais: true,
    debpolrodfed: true,
    resfurto: true,
    resguincho: true,
    resadministrativa: true,
    resjudicial: true,
    restributaria: true,
    resrenajud: true,
    resambiental: true,
    licexelic: true,
    ccomunicacaovenda: true,
    ccomunicinclusao: true,
    tipodoccomprador: true,
    cpfcnpjcomprador: true,
    datavenda: true,
    notafiscal: true,
    protocolodetran: true,
    inspecaoano: true,
    inspecaocentro: true,
    inspecaodata: true,
    inspecaoselo: true,
    inspecaostatus: true,
    codigofinanceira: true,
    datainclusaointencaotrocafinanceira: true,
    datalimiterestricaotributaria: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/settings/fields')
      .then((response) => {
        console.log('Configurações carregadas:', response.data); // Debug
        setSettings(response.data);
      })
      .catch((error) => {
        setError('Erro ao carregar configurações');
      });
  }, []);

  const handleSave = () => {
    setLoading(true);
    setError(null);

    axios.post('/api/settings/fields', settings)
      .then(() => {
        setLoading(false);
        setError(null);
        console.log('Configurações salvas:', settings); // Debug
      })
      .catch((error) => {
        setLoading(false);
        setError('Erro ao salvar configurações');
      });
  };

  const handleChange = (field) => {
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings, [field]: !prevSettings[field] };
      console.log('Configurações atualizadas:', newSettings); // Debug
      return newSettings;
    });
  };

  return (
    <Container>
      <Title order={2} align="center" mb="lg">Configuração de Visibilidade de Campos</Title>
      <Paper withBorder shadow="sm" p="lg" radius="md">
        <Grid>
          {Object.keys(settings).map((field) => (
            <Grid.Col span={6} key={field}>
              <Group position="apart" noWrap>
                <Text size="md" weight={500} style={{ textTransform: 'capitalize' }}>
                  {field.replace('_', ' ')}
                </Text>
                <Switch
                  checked={settings[field]}
                  onChange={() => handleChange(field)}
                  size="md"
                  color="blue"
                  style={{ marginLeft: 'auto' }}
                />
              </Group>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>
      <Group position="right" mt="md">
        <Button onClick={handleSave} loading={loading}>Salvar Configurações</Button>
      </Group>
      {error && <Notification color="red" mt="md">{error}</Notification>}
    </Container>
  );
}
