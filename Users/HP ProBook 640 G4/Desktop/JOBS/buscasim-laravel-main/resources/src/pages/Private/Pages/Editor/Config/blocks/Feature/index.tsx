import { ComponentConfig } from '@measured/puck';
import { FeaturesProprs , DefautFeatures , Features as _Features } from "@/components/Home/Features";
export type { FeaturesProprs } from "@/components/Home/Features";
import { IconSearch } from '../../Fields/Icons'



export const Feature: ComponentConfig<FeaturesProprs> = {
    label: "Feature",
    fields: {
        title: {
          label: "Título",
          type: "text", // Ajustado para o tipo "text" para representar um título como uma string de texto
        },
        description: {
            label: "Descriçao",
            type: "textarea",
        },
        features:{
            type: "array",
            getItemSummary: (item) => item.title || "Feature",
            arrayFields:{
                icon: {
                    type: 'custom',
                    render: ({ value , onChange }:any) => (
                        <IconSearch _value_={value} onChange={onChange}/>
                      ),
                },
                title:{
                    label: "Título",
                    type: "text",
                },
                description:{
                    label: "description",
                    type: "textarea",
                },
            }
        }
    },
    defaultProps: {
        title: "Saiba todas as informações importantes sobre o veículo",
        description: "Obtenha um relatório detalhado com a marca, modelo, ano, valor de mercado entre outras informações relevantes.",
        features: DefautFeatures
    },
    render: (props) => {
        return (
            <_Features features={props.features} title={props.title} description={props.description} />
        );


    },
};