import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

import { PageLoader } from '@/components/__commons';
import { PublicHeader } from './Header';
import { PublicFooter } from './Footer';

export function PublicLayout() {
  const [opened, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    close();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PublicHeader opened={opened} toggle={toggle} />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <PublicFooter />
      {/* <WhatsAppButton /> */}
    </>
  );
}
