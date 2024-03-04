import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { FC } from 'react';

type QueryProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error)) {
          failureCount++;
          console.error('ERROR:', error.response?.data);
          return failureCount < 9;
        }
        return false;
      },
    },
  },
});

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
