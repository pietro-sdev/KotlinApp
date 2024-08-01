import { ComponentConfig, DropZone } from "@measured/puck";
import styles from "./styles.module.css";
import { Section } from "../../../components/Section";
import { Color } from "../../../Fields/Color";



export type FlexProps = {
  items: {
    minItemWidth?: number;
    background?: { hex: '#343434' } | any;
  }[];
  minItemWidth: number;
  background?: { hex: '#343434' } | any;
};

export const Flex: ComponentConfig<FlexProps> = {
  label: "Flexível",
  fields: {
    items: {
      type: "array",
      arrayFields: {
        minItemWidth: {
          label: "Minimum Item Width",
          type: "number",
          min: 0,
        },
        background: {
          type: 'custom',
          render: ({ value, name, onChange }) => (
            <Color value={value} name={name} onChange={onChange} label="Background"/>
          ),
        },
      },
    },
    minItemWidth: {
      label: "Minimum Item Width",
      type: "number",
      min: 0,
    },
    background: {
      type: 'custom',
      render: ({ value, name, onChange }) => (
        <Color value={value} name={name} onChange={onChange} label="Background"/>
      ),
    },
  },
  defaultProps: {
    items: [{}],
    minItemWidth: 356,
    background: { hex: '#0000' },
  },
  render: ({ items, minItemWidth, background }) => {
    return (
      <Section bg={background.hex}>
        <div className={styles['flex-wraper']}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={styles['flex-item']}
              style={{ minWidth: `${item.minItemWidth && item.minItemWidth > 0 ? item.minItemWidth : minItemWidth}px` , background: item.background ? item.background['hex'] : background }}
            >
              <DropZone 
                zone={`item-${idx}`} 
                disallow={["Hero", "Flex", "Faq","Feature","Contact"]}
              />
            </div>
          ))}
        </div>
      </Section>
    );
  },
};
