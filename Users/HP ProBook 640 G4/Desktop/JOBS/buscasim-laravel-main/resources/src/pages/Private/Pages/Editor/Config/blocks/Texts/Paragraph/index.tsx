import { ComponentConfig } from "@measured/puck";
import { Color } from "../../../Fields/Color";
import { Text } from "@mantine/core";


export type ParagraphProps = {
  align: "left" | "center" | "right";
  text?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' ;
  weight?: 400 | 700 | 900 | 300;
  padding?: number;
  color?: {hex : '#343434'} | any;
};

export const Paragraph: ComponentConfig<ParagraphProps> = {
    label: "Parágrafo",
    fields: {
        text: {
            label: "Texto",
            type: "textarea",
        },
        align: {
            label: "Alinhamento",
            type: "radio",
            options: [
                { label: "left", value: "left" },
                { label: "center", value: "center" },
                { label: "right", value: "right" },
            ],
        },
        weight: {
            label: "Peso da Fonte",
            type: "select",
            options: [
                { label: "Normal", value: 400 },
                { label: "Negrito", value: 700 },
                { label: "Negrito mais forte", value: 900 },
                { label: "Negrito mais fraco", value: 300 },
            ],
        },
        size: {
            label: "Tamanho do Texto",
            type: "select",
            options: [
                { value: "xl", label: "Grande" },
                { value: "lg", label: "Médio" },
                { value: "md", label: "Pequeno" },
                { value: "sm", label: "Muito Pequeno" },
                { value: "xs", label: "Extra Pequeno" },
            ],
        },
        color: {
            label: "Cor",
            type: "custom",
            render: ({ value, onChange }: any) => (
                <Color value={value ? value : { hex: '#343434' }} onChange={onChange} label="Cor" />
            ),
        },
        padding: {
            label: "Espaçamento Interno",
            type: "number",
            min: 0,
        },
    },
    defaultProps: {
        align: "left",
        text: "Insira um texto",
        size: "md",
        padding: 0,
        weight: 400,
        color: { hex: '#343434' },
    },
    render: ({ align, text, size, color, weight, padding }) => (
        <Text
            style={{ color: color.hex, textAlign: align, padding: `${padding}px` }}
            size={size}
            fw={weight}
        >
            {text}
        </Text>
    ),
};