import { ComponentConfig } from '@measured/puck';
import { Color } from '../../Fields/Color';
import ThankYouPage from '@/pages/Public/ThankYou';
export type { FaqProps } from "@/pages/Public/Faq";



export type ThankYouProps = {
    background?: { hex: '#343434' } | any;
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    [key: string]: any;
};

export const ThankYou: ComponentConfig<ThankYouProps> = {
    label: "Obrigado",
    fields: {
      background: {
        type: 'custom',
        render: ({ value, name, onChange }) => (
          <Color value={value} name={name} onChange={onChange}/>
        ),
      },
      title:{
        type:'text',
      },
      subtitle:{
        label:'Sub title',
        type:'text',
      },
      description:{
        label:'Descrição',
        type:'textarea',
      },
      buttonText:{
        label:'Btn Text',
        type:'text',
      }
    },
    defaultProps: {
      background: { hex: '#0000' },
      title:'Obrigado!',
      subtitle:'Parabéns! Você acabou de adquir o seu relatório Premium.',
      description:'Você vai poder consultar esse relatório quando quiser no menu Minhas Consultas',
      buttonText:'Ver meu relatório',
    },
  render: (props) => {
    console.log(props)
    return (
        <ThankYouPage
          isEdit={props.editMode}
          title={props.title}
          subtitle={props.subtitle}
          description={props.description}
          background={props.background}
        />
    );
  },
};
