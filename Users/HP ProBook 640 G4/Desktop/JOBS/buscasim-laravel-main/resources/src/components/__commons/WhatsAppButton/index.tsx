import { Affix, Button, rem } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { AnchorLink } from '..';

const WHATSAPP_LINK =
  'https://api.whatsapp.com/send?phone=5511967859729&text=Oi%20quero%20tirar%20uma%20d%C3%BAvida';

export function WhatsAppButton() {
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Button
        color="#128c7e"
        component={AnchorLink}
        href={WHATSAPP_LINK}
        leftSection={
          <IconBrandWhatsapp style={{ width: rem(16), height: rem(16) }} />
        }
        blank
      >
        Fale conosco
      </Button>
    </Affix>
  );
}
