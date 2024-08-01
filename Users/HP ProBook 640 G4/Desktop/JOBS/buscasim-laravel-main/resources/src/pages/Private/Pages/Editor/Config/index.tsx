import type { Config , } from "@measured/puck";
import { Flex , FlexProps } from './blocks/layouts/Flex';
import { Block , BlockProps } from './blocks/layouts/Block';
import { VerticalSpace , VerticalSpaceProps } from './blocks/layouts/VerticalSpace';
import { ButtonGroup , ButtonGroupProps } from './blocks/Buttons';
import { HeadingBlock,  HeadingProps } from './blocks/Texts/Title';
import { Paragraph,  ParagraphProps } from './blocks/Texts/Paragraph';
import { List,  ListProps } from './blocks/List';
import { Faq, FaqProps } from './blocks/Faq';
import { Card, CardProps } from './blocks/Card';
import { Hero, HeroProps } from './blocks/Hero';
import { Feature, FeaturesProprs } from './blocks/Feature';
import { Table, TableProps } from './blocks/Table';
import { Contact, ContactProps } from './blocks/Contact';
import { ThankYou, ThankYouProps } from './blocks/ThankYou';
import { Results, ResultsProps } from './blocks/Results';


// import Root from "./root";


type Props = {
  HeadingBlock: HeadingProps;
  Faq:FaqProps;
  Paragraph:ParagraphProps;
  Flex:FlexProps;
  Block:BlockProps;
  VerticalSpace:VerticalSpaceProps;
  ButtonGroup:ButtonGroupProps;
  Card:CardProps;
  Hero:HeroProps;
  Feature:FeaturesProprs;
  Table:TableProps;
  List:ListProps;
  Contact:ContactProps;
  ThankYou:ThankYouProps;
  Results:ResultsProps;
};

export type RootProps = {
  title: string;
  description: string
  slug:string
};


export type UserConfig = Config<
  Props,
  RootProps
>;

export const conf: UserConfig = {
  root:{
    fields:{
      title: {
        label: "Título",
        type: "text",
      },
      slug: {
        label: "Slug (ex: /contato)",
        type: "text",

      },
      description:{
        label: "description",
        type: "textarea",
      }
    },
    defaultProps: {
      title: "My Page",
      slug:'ola',
      description:'ola'
    },
    // render: Root,
  },

  categories: {
    layouts:{
      components: ["Flex","Block","VerticalSpace"],
    },
    tipografia: {
      components: ["HeadingBlock","Paragraph"],
    },
    elementos: {
      components: ["Table","List","Card","ButtonGroup"],
    },
    Seções: {
      components: ["Hero","Feature","Contact","Faq","ThankYou","Results"],
    }
  },
  components: {
    ThankYou,
    HeadingBlock,
    Paragraph,
    Faq,
    Flex,
    Block,
    VerticalSpace,
    ButtonGroup,
    Card,
    Hero,
    Feature,
    Table,
    List,
    Contact,
    Results
  },
};

export default conf;
