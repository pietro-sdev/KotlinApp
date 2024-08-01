import { ColorInput } from "@mantine/core"



export type ColorProprs = {
    value?: any;
    label?: string;
    name?:string;
    onChange: (value: { hex: string }) => void;
}


export function Color({ label , value , name, onChange }:ColorProprs){
    return (
        <ColorInput
            label={label ? label : 'Color'}
            size="md"
            value={value ? value.hex : '#0000'}
            name={name}
            onChange={(val) => { onChange({ 'hex': val }) }}
      />
    )
}