import { Table as _table } from '@mantine/core';
import { ComponentConfig } from '@measured/puck';


export type TableProps = {
    Striped?: 'even' | 'odd' | false,
    HighlightOnHover?: boolean,
    WithTableBorder?: boolean,
    WithColumnBorders?: boolean,
    WithRowBorders?: boolean,
    caption?: string,
    head: string,
    body: {
        row:string
    }[],
};

export const Table: ComponentConfig<TableProps> = {
    label: "Tabela",
    fields: {
        caption:{
            type: "text",
        },
        head:{
            type: "text",
        },
        body:{
            type: "array",
            arrayFields:{
                row:{
                    type: "text",
                }
            }
        },
        Striped: {
            type: "radio",
            options: [
                { label: "even", value: "even" },
                { label: "odd", value: "odd" },
                { label: "nenhum", value: false },
            ],
        },
        HighlightOnHover: {
            type: "radio",
            options: [
                { label: "true", value: true },
                { label: "false", value: false },
            ],
        },
        WithTableBorder:{
            type: "radio",
            options: [
                { label: "true", value: true },
                { label: "false", value: false },
            ],
        },
        WithColumnBorders: {
            type: "radio",
            options: [
                { label: "true", value: true },
                { label: "false", value: false },
            ],
        },
        WithRowBorders: {
            type: "radio",
            options: [
                { label: "true", value: true },
                { label: "false", value: false },
            ],
        }
    },
    defaultProps: {
        caption: 'Some elements from periodic table',
        head: 'Element position , Atomic mass , Symbol , Element name',
        body: [
            { row: "6, 12.011,  C ,Carbon "},
            { row: "7, 14.007,  N ,Nitrogen"},
            { row: "39, 88.906, Y"},
            { row: "56, 137.33, Ba, Barium"},
            { row: "58, 140.12, Ce, Cerium"},
        ]

    },
    render: ({ Striped, HighlightOnHover, WithTableBorder, WithColumnBorders, WithRowBorders , head , caption , body }) => {
        const Data = {
            caption,
            head: head.split(','),
            body: body.map((item) => item.row?.split(',').map((str) => str.trim())).filter(Boolean)
        };
        return <_table
            striped={Striped}
            highlightOnHover={HighlightOnHover}
            withTableBorder={WithTableBorder}
            withColumnBorders={WithColumnBorders}
            withRowBorders={WithRowBorders}
            data={Data}
        />;
    }
}
