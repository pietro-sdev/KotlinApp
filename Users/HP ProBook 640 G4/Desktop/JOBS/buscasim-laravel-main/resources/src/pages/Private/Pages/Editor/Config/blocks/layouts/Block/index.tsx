import { ComponentConfig, DropZone } from "@measured/puck";
import { Section } from "../../../components/Section";
import { Color } from "../../../Fields/Color";



export type BlockProps = {
  background?: { hex: '#343434' } | any;
};

export const Block: ComponentConfig<BlockProps> = {
  label: "Block",
  fields: {
    background: {
      type: 'custom',
      render: ({ value, name, onChange }) => (
        <Color value={value} name={name} onChange={onChange}/>
      ),
    },
  },
  defaultProps: {
    background: { hex: '#0000' },
  },
  render: ({ background }) => {
    return (
      <Section bg={background.hex}>
          <DropZone 
            zone={`content-block`} 
            disallow={["Hero", "Flex", "Faq","Feature","Contact"]}
          />
      </Section>
    );
  },
};
