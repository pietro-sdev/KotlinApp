import { Container, Title, Accordion } from '@mantine/core';
import classes from './styles.module.css';


export const defaultFaqProps: FaqProps = {
  items: [
    {
      question: 'O que é a BuscaSim?',
      answer: 'Somos uma empresa que oferece serviços de consulta de placas automotivas, auxiliando o consumidor a tomar a melhor decisão antes de comprar o seu próximo veículo.',
    },
    {
      question: 'A consulta é grátis?',
      answer: 'Nós oferecemos uma consulta grátis com informações mais simples sobre o veículo, por exemplo cor, marca, modelo, ano etc. Caso precise de informações mais detalhadas, oferecemos uma consulta premium com todas as informações.',
    },
    {
      question: 'Vou poder consultar o meu histórico de consultas?',
      answer: 'Nós armazenamos um histórico das suas consultas premium, para você consultar e comparar as informações dos veículos quando quiser.',
    },
  ],
  title: 'Perguntas Frequentes',
};

export type FaqProps = {
  items: {
    question: string;
    answer: string;
  }[];
  title?: string;
};

export default function FaqPage(props : FaqProps){
  const { items, title } = { ...defaultFaqProps, ...props };

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        {title}
      </Title>

      <Accordion variant="separated">
        {items.map((item, index) => (
          <Accordion.Item key={index} className={classes.item} value={index.toString()}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>
              {item.answer}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
