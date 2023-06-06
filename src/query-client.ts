import { QueryClient } from '@tanstack/react-query';

/**
 * Set up React Query with global config
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: true,
    },
  },
});
