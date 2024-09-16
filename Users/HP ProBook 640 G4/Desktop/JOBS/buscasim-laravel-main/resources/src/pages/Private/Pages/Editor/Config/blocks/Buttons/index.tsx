/* eslint-disable @next/next/no-img-element */
import { ComponentConfig } from "@measured/puck";
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import { Color } from "../../Fields/Color";

export type ButtonGroupProps = {
  align?: string;
  buttons: {
    label: string;
    href: string;
    color: any;
    variant: "default" | "filled" | "light" | "outline" | "subtle" | "transparent"
    size: "compact-lg" | "compact-md" | "compact-sm" | "compact-xl" | "compact-xs" | "lg" | "md" | "sm" | "xl" | "xs"
  }[];
};


export const ButtonGroup: ComponentConfig<ButtonGroupProps> = {
  label: "Botão",
  fields: {
    buttons: {
      type: "array",
      getItemSummary: (item) => item.label || "Botão",
      arrayFields: {
        label: { type: "text" },
        href: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "padrão", value: "default" },
            { label: "preenchido", value: "filled" },
            { label: "leve", value: "light" },
            { label: "contorno", value: "outline" },
            { label: "sutil", value: "subtle" },
            { label: "transparente", value: "transparent" },
          ],
        },
        size: {
          type: "select",
          options: [
            { label: "compacto-extra pequeno", value: "compact-xs" },
            { label: "compacto-pequeno", value: "compact-sm" },
            { label: "compacto-médio", value: "compact-md" },
            { label: "compacto-grande", value: "compact-lg" },
            { label: "compacto-extra grande", value: "compact-xl" },
            { label: "extra pequeno", value: "xs" },
            { label: "pequeno", value: "sm" },
            { label: "médio", value: "md" },
            { label: "grande", value: "lg" },
            { label: "extra grande", value: "xl" },
          ],
        },
        color:{
          type: 'custom',
          render: ({ value, name, onChange }) => (
            <Color label="Background" name={name} value={value} onChange={onChange}/>
          ),
        }
      },
      defaultItemProps: {
        label: "Learn more",
        href: "#",
        variant: "light" ,
        color:{hex : '#228be6'},
        size:'md'
      },
    },
    align: {
      type: "radio",
      options: [
        { label: "left", value: "initial" },
        { label: "center", value: "center" },
        { label: "right", value: "right" },
      ],
    },
  },
  defaultProps: {
    align: "initial",
    buttons: [{
      label: "Learn more",
      href: "#",
      variant: "light" ,
      color:{hex : '#228be6'},
      size:'md'
    }],
  },
  render: ({ align, buttons }) => {
    return (
        <div
          className={styles['button-group-actions']}
          style={{justifyContent:align}}
        >
          {buttons.map((button, i) => (
            <Button
              key={i}
              component={Link}
              variant={button.variant || 'light'}
              color={button.color.hex || '#0000'}
              size={button.size || 'md'}
              to={button.href || '#'}
              >
              {button.label || 'Learn more'}
            </Button>
          ))}
        </div>
    );
  },
};
