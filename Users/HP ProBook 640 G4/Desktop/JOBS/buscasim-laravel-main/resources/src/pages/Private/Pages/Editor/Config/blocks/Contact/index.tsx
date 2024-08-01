import { ComponentConfig } from '@measured/puck';
import  { ContactProps , ContactPage , DefaultProps } from '@/pages/Public/Contact';
export type  { ContactProps } from '@/pages/Public/Contact';

export const Contact: ComponentConfig<ContactProps> = {
  label: "Contato",
  fields: {
    title: {
      label: "Título",
      type: "text",
    },
    intro: {
        label: "Descriçao 1/2",
        type: "textarea",
    },
    end: {
        label: "Descriçao 2/2",
        type: "textarea",
    },
    textButtom:{
        label: "Texto Botão",
        type: "text",
    }
  },
  defaultProps: DefaultProps,
  render: (props) => {
    return (
      <ContactPage title={props.title} intro={props.intro} end={props.end} textButtom={props.textButtom} />
    );
  },
};