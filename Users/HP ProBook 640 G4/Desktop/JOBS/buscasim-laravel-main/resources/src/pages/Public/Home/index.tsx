import { useEffect } from 'react';
import { Features, Hero } from '@/components/Home';
import { gaConversion } from '@/core/utils';

export default function HomePage() {
  useEffect(() => {
    gaConversion('AW-10878664178/yDwrCNrUkZIZEPL7rMMo');
  }, []);

  return (
    <main>
      <Hero />
      <Features />
      {/* <CallToAction /> */}
    </main>
  );
}
