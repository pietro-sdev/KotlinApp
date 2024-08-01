import { List as _list } from '@mantine/core';
import { ComponentConfig } from '@measured/puck';
 

export const SizeOptions = [
    { value: "lg", label: "Muito Grande" },
    { value: "md", label: "Grande" },
    { value: "sm", label: "Largo" },
    { value: "xl", label: "Médio" },
    { value: "xs", label: "Pequeno" },
];


export type ListProps = {
    type?: 'unordered' | 'ordered',
    size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs',
    iteins?:{
        item?:string
    }[],
};

export const List: ComponentConfig<ListProps> = {
    label: "Lista",
    fields: {
        size:{
            type: "radio",
            options:SizeOptions
        },
        type:{
            type: "radio",
            options:[
                { value: "unordered", label: "Não Ordenada" },
                { value: "Ordered", label: "Ordenada" },
            ]
        },
        iteins:{
            type: "array",
            label: "Itens",
            arrayFields:{
                item:{
                    type: "textarea"
                }
            }
        }
    },
    defaultProps: {
        type: "unordered",
        size: "md",
        iteins:[{}]
    },
    render: ({ type, size, iteins }) => {
        return (
            <_list
                type={type}
                size={size}
            >
                {iteins?.map((item, index) => (
                    <_list.Item key={index}>{item.item}</_list.Item>
                ))}
            </_list>
          );
    }
}