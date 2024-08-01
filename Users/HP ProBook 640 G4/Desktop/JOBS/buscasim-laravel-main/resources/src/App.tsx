import { QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, SearchResultsProvider } from './core/providers';
import { queryClient } from './core/config/react-query';
import { Router } from './core/routes';

import 'dayjs/locale/pt-br';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchResultsProvider>
          <MantineProvider>
            <DatesProvider
              settings={{ locale: 'pt-br', timezone: 'America/Sao_Paulo' }}
            >
              <ModalsProvider>
                <Notifications position="top-right" />
                <Router />
              </ModalsProvider>
            </DatesProvider>
          </MantineProvider>
        </SearchResultsProvider>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}
