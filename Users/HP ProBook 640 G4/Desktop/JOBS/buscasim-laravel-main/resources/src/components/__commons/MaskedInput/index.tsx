import { useState } from 'react';
import { Input, InputProps, InputWrapper, TextInputProps } from '@mantine/core';
import { InputMask, MaskEventDetail } from '@react-input/mask';

type MaksType = 'cpf' | 'phone' | 'cep' | 'plate';

type Props = { mask: MaksType } & InputProps & TextInputProps;

const masks: Record<MaksType, string> = {
  cpf: '___.___.___-__',
  cep: '________',
  phone: '(__) _____-____',
  plate: 'AAA-NZNN',
};

const masksErrors: Record<MaksType, string> = {
  cpf: 'Informe um CPF válido',
  cep: 'Informe um CEP válido',
  phone: 'Informe um telefone válido',
  plate: 'Informe uma placa válida',
};

export function MaskedInput({ mask, withAsterisk, ...props }: Props) {
  const [maskDetail, setMaskDetail] = useState<MaskEventDetail | null>(null);

  const wrapperClassName =
    props.classNames && 'root' in props.classNames ? props.classNames.root : '';

  return (
    <InputWrapper classNames={{ root: wrapperClassName }}>
      <Input.Label required={withAsterisk}>{props.label}</Input.Label>
      <Input
        {...props}
        mt={mask === 'plate' ? 'calc(64px - 88.8px)' : undefined}
        component={InputMask}
        mask={masks[mask]}
        replacement={{ _: /\d/, N: /\d/, A: /[A-Za-z]/, Z: /[0-9A-Za-z]/ }}
        onMask={(e) => setMaskDetail(e.detail)}
      />
      {maskDetail?.input && !maskDetail?.isValid && (
        <Input.Error>{masksErrors[mask]}</Input.Error>
      )}
      <Input.Error>{props.error}</Input.Error>
    </InputWrapper>
  );
}
