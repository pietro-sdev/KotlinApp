/* eslint-disable @next/next/no-img-element */
import { ComponentConfig } from "@measured/puck";
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import { Section } from "../../components/Section";
import { Color } from "../../Fields/Color";

export type ButtonGroupProps = {
  align?: string;
  buttons: { 
    label: string; 
    href: string; 
    color: any;
    variant: "default" | "filled" | "light" | "outline" | "subtle" | "transparent" }[];
};




export const ButtonGroup: ComponentConfig<ButtonGroupProps> = {
  label: "Botão",
  fields: {
    buttons: {
      type: "array",
      getItemSummary: (item) => item.label || "Button",
      arrayFields: {
        label: { type: "text" },
        href: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "default", value: "default" },
            { label: "filled", value: "filled" },
            { label: "light", value: "light" },
            { label: "outline", value: "outline" },
            { label: "subtle", value: "subtle" },
            { label: "transparent", value: "transparent" },
          ],
        },
        color:{
          type: 'custom',
          render: ({ value, name, onChange }) => (
            <Color label="Background" name={name} value={value} onChange={onChange}/>
          ),
        }
      }
    },
    align: {
      type: "radio",
      options: [
        { label: "left", value: "left" },
        { label: "center", value: "center" },
      ],
    },
  },
  defaultProps: {
    buttons: [{ label: "Learn more", href: "#", variant: "light" , color:{hex : '#228be6'} }],
  },
  render: ({ align, buttons }) => {
    return (
      <Section className={align === 'center'? 'button-group-center' : 'button-group'}>
        <div className={styles['button-group-actions']}>
          {buttons.map((button, i) => (
            <Button
              key={i}
              component={Link}
              variant={button.variant}
              color={button.color['hex']}
              size="large"
              to={button.href}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </Section>
    );
  },
};
