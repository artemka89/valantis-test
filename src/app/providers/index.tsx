export { QueryProvider } from './QueryProvider';
import { FC } from 'react';
import type { Router } from '@remix-run/router/dist/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

type ProvidersProps = {
  router: Router;
  client: QueryClient;
};

export const Providers: FC<ProvidersProps> = ({ client, router }) => {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
