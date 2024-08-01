import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Badge, Button, Container, Grid, Image, Paper, Stack, Text, Title,
} from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconLock, IconLockOpen } from '@tabler/icons-react';

import { PageLoader } from '@/components/__commons';
import {
  ResultsOverview,
  ResultsLeftInfo,
  ResultsRightInfo,
  showInfo,
} from '@/components/Results';

import { useSearchResults } from '@/core/providers';
import { useSearchInfo } from '@/core/services/search';
import { gaPageView, moneyFormat } from '@/core/utils';

import classes from './styles.module.css';
import placeholder from '@/assets/placeholder.png';
import axios from 'axios';

export default function ResultsPage() {
  const { results, premium } = useSearchResults();
  const { data, isLoading } = useSearchInfo();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const navigate = useNavigate();
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    if (!results) navigate('/');

    if (results && !premium) {
      gaPageView('Resultados Free');
    }

    const fetchLogo = async () => {
      try {
        const response = await axios.get('/api/settings/logo');
        setLogo(response.data.logo);
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };

    fetchLogo();
  }, [results]);

  if (!results) return <PageLoader />;

  const uniformResults = {
    ...results,
    dados: Object.keys(results.dados || {}).length > 0 ? results.dados : results // Garantir que a propriedade 'dados' sempre contenha os dados corretos
  };

  console.log(data);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container className={classes.container}>
      <Stack>
        <Title className={classes.title}>
          <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{ from: 'blue.5', to: 'blue.9' }}
          >
            Resultado da consulta
          </Text>
        </Title>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Paper withBorder p="md">
              <Stack align="center">
                <Badge
                  color="blue"
                  variant="filled"
                  size="lg"
                  leftSection={<IconLock size={14} />}
                  onClick={() => scrollIntoView()}
                  style={{ cursor: 'pointer' }}
                >
                  {showInfo({ info: uniformResults?.modelo, premium, onScroll: scrollIntoView })}
                </Badge>
                <Image src={logo || placeholder} maw={150} fallbackSrc={placeholder} />

              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <Paper withBorder p="md" h="100%">
              <ResultsOverview data={uniformResults.dados} premium={premium} onScroll={scrollIntoView} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ResultsLeftInfo
                  data={uniformResults.dados}
                  premium={premium}
                  onScroll={scrollIntoView}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ResultsRightInfo
                  data={uniformResults.dados}
                  premium={premium}
                  onScroll={scrollIntoView}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {!premium && (
            <Grid.Col span={12}>
              <Button
                loading={isLoading}
                leftSection={<IconLockOpen />}
                variant="outline"
                fullWidth
                size="lg"
                onClick={() => scrollIntoView()}
              >
                Liberar Informações
              </Button>
            </Grid.Col>
          )}
        </Grid>
        <Title className={classes.title}>
          <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{ from: 'blue.5', to: 'blue.9' }}
          >
            {/* Tabela FIPE */}
          </Text>
        </Title>

        {!premium && (
          <Container bg="blue.7" py="lg" c="white" ref={targetRef}>
            <Stack align="center">
              <IconLockOpen size={48} />
              <Title order={3} ta="center">
                Quer saber todas as informações que estão bloqueadas?
              </Title>
              <Text ta="center">
                Adquira o relatório Premium e tenha acesso a essa e outras
                informações por apenas
              </Text>
              <div className={classes.searchPrice}>
                {moneyFormat(data?.price || 0)}
              </div>
              <Button
                component={Link}
                to="/pagamento"
                leftSection={<IconLockOpen />}
                variant="outline"
                color="white"
                size="lg"
              >
                Liberar Informações
              </Button>
            </Stack>
          </Container>
        )}

        <Button
          variant="outline"
          fullWidth
          size="lg"
          onClick={handlePrint}
        >
          Baixar PDF
        </Button>
      </Stack>
    </Container>
  );
}
