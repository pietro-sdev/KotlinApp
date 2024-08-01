import { ComponentConfig } from '@measured/puck';
import FaqPage , { FaqProps } from '@/pages/Public/Faq'; // Certifique-se de que o caminho para o componente FaqPage está correto
export type { FaqProps } from "@/pages/Public/Faq";

export const Faq: ComponentConfig<FaqProps> = {
  fields: {
    items: {
      label: "Perguntas Frequentes",
      type: "array",
      defaultItemProps: {
        question: "Pergunta",
        answer: "Resposta",
      },
      getItemSummary: (item:any) => item.question || "Pergunta",
      arrayFields: {
        question: {
          label: "Pergunta",
          type: "text",
        },
        answer: {
          label: "Resposta",
          type: "text",
        },
      },
    },
    title: {
      label: "Título",
      type: "text", // Ajustado para o tipo "text" para representar um título como uma string de texto
    },
  },
  defaultProps: {
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
  },
  render: (props) => {
    return (
      <FaqPage
        items={props.items}
        title={props.title}
      />
    );
  },
};