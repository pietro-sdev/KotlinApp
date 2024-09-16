/* eslint-disable @next/next/no-img-element */
import { ComponentConfig } from "@measured/puck";
import styles from "./styles.module.css";
import { IconSearch , GetIconsByName as _icon } from '../../Fields/Icons'


export type CardProps = {
  title: string;
  description: string;
  icon?: string;
  mode: "flat" | "card";
};

export const Card: ComponentConfig<CardProps> = {
  label: "Cartão",
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
    icon: {
      type: 'custom',
      render: ({ value , onChange }:any) => (
          <IconSearch _value_={value} onChange={onChange}/>
        ),
    },
    mode: {
      type: "radio",
      options: [
        { label: "card", value: "card" },
        { label: "flat", value: "flat" },
      ],
    },
  },
  defaultProps: {
    title: "Informações do veículo",
    description: "Consiga informações sobre a cor, modelo, categoria e muito mais sobre o veículo.",
    icon: "IconCarSuv",
    mode: "flat",
  },
  render: ({ title, description, icon , mode }) => {
    return (
      <div className={styles[mode === 'flat' ? 'card-flat' : 'card']}>
        <div className={styles['card-icon']}><_icon name={`${icon}`}/></div>
        <div className={styles['card-title']}>{title}</div>
        <div className={styles['card-description']}>{description}</div>
      </div>
    );
  },
};
