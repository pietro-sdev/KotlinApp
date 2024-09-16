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
    },
    defaultProps: {
        title: "A consulta de placa mais completa da internet.",
    },
    render: (props) => {
        return (
            <_Hero title={props.title} />
        );
    },
};
