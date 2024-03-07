import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
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