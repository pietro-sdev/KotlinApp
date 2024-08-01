import { ComponentConfig } from "@measured/puck";
import { Title } from "@mantine/core";
import { Color } from "../../../Fields/Color";


export type HeadingProps = {
    align?: "left" | "center" | "right" ;
    title?: string;
    order?: Number | any;
    textWrap?: "wrap" | "nowrap" | "balance" | "pretty" | "stable" ;
    color?: { hex: string } | any;
    padding?:number;
};

export const HeadingBlock: ComponentConfig<HeadingProps> = {
    label: "Título",
    fields: {
        title: { 
            label: "Título",
            type: "text" 
        },
        order: { 
            label: "Ordem",
            type: "number",
            min:1,
            max:6
        },
        textWrap:{
            type: "select",
            label: "Quebra de Texto",
            options: [
                { label: "wrap", value: "wrap" },
                { label: "nowrap", value: "nowrap" },
                { label: "balance", value: "balance" },
                { label: "pretty", value: "pretty" },
                { label: "stable", value: "stable" },
            ],
        },
        color:{
            type: "custom",
            render: ({ value , onChange }:any) => (
                <Color value={value ? value : { hex :'#343434'}} onChange={onChange} label="Cor"/>
            ),
        },
        align: {
            label: "Alinhamento",
            type: "radio",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ],
        },
        padding:{
            label: "Espaçamento Interno",
            type:'number',
            min: 0,
        }
    },
    defaultProps: {
        color:{ hex: '#343434' },
        order: 1,
        title: 'insira um Titulo',
        align:'left',
        padding: 0,
        textWrap: 'wrap',
    },
    render: ({ title ,  order , textWrap , color , align , padding }) => (
        <Title order={order} textWrap={textWrap} style={{color:color.hex , textAlign: align , padding: `${padding}px`}}>
            {title}
        </Title>
    ),
};

