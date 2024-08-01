import { ComponentConfig } from '@measured/puck';
import { HeroProps , Hero as _Hero } from "@/components/Home/Hero";
export type { HeroProps } from "@/components/Home/Hero";


export const Hero: ComponentConfig<HeroProps> = {
    label: "Hero",
    fields: {
        title: {
          label: "Título",
          type: "text",
        },
        placeholder: {
            label: "Placehoader",
            type: "text",
        },
    },
    defaultProps: {
        title: "A consulta de placa mais completa da internet.",
        placeholder: "Ex: HUF-8282",
    },
    render: (props) => {
        return (
            <_Hero title={props.title} placeholder={props.placeholder}/>
        );
    },
};
