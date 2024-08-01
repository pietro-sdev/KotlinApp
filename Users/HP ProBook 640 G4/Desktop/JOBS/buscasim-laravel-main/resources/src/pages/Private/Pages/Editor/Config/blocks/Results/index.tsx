import { ComponentConfig } from '@measured/puck';
import ResultsPage , { ResultsProps } from "@/pages/Public/Results";
export type { ResultsProps } from "@/pages/Public/Results";



export const Results: ComponentConfig<ResultsProps> = {
    label: "Resultados",
    fields: {
        title: {
          label: "Título",
          type: "text",
        },
        cta: {
          label: "Cta",
          type: "text",
        },
        boxTitle: {
          label: "Box: título",
          type: "text",
        },
        boxDescription: {
          label: "Box: descrição",
          type: "textarea",
        },
        boxCTA: {
          label: "Box: cta",
          type: "text",
        },
    },
    defaultProps: {
      title:'Resultado da consulta',
      cta: 'Liberar Informações',
      boxTitle: 'Quer saber todas as informações que estão bloqueadas?',
      boxDescription: 'Adquira o relatório Premium e tenha acesso a essa e outras informações por apenas',
      boxCTA: 'Liberar Informações',
    },
    render: (
      { title, cta, boxTitle, boxDescription, boxCTA , editMode },
    ) => {
        return (
            <ResultsPage title={title} cta={cta} boxTitle={boxTitle} boxDescription={boxDescription} boxCTA={boxCTA} editMode={editMode} />
        );
    },
};
