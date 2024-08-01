import * as Icons from '@tabler/icons-react';
import { useState } from 'react';
import { Select } from '@mantine/core';


// Tipagem para os ícones
type IconType = keyof typeof Icons;

// Obter todas as chaves (nomes) dos ícones disponíveis
const iconNames: IconType[] = Object.keys(Icons) as IconType[];

// Criar array de objetos com opções de ícones
export const IconsOptions = iconNames.map(name => {
    return {
        value: name,
        label: name,
    };
});

export function GetIconsByName({ name }:{name:string|any}){

    const _Icons: { [key: string]: any } = { ...Icons };
    const _iconNames: string[] = [...iconNames];

    if (_iconNames.includes(name)){
        const Icon = _Icons[name];
        return <Icon/>
    }else{
        const Icon = _Icons['IconForbid'];
        return <Icon/>
    }
}

export const IconSearch = ({ _value_ , onChange }:{_value_:string, onChange:any}) => {

    const [ options , setOptions ] = useState(0);
    const [value, setValue] = useState<string | null>(_value_);

    return (
            <Select
                label="Icone"
                placeholder={value || ''}
                data={iconNames.slice(0, options)}
                value={value}
                rightSection={<GetIconsByName name={value}/>}
                onChange={(valor) => {onChange(valor) ; setValue(valor) }}
                onFocus={() => {setOptions(iconNames.length)}}
                onBlur={() => setOptions(0)}
                limit={250}
                nothingFoundMessage="Nada encontrado..."
                searchable
                comboboxProps={{ middlewares: { flip: true, shift: false }, offset: 0 }}
            />
    )
};