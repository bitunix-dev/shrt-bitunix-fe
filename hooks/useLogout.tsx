import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    // mutationFn: () => Promise<…>
    mutationFn: () =>
      axios.post('/api/auth/logout').then(() => {
        // kita ignore hasil response-nya
      }),
    onSuccess: () => {
      // Invalidate / reset semua cache
      queryClient.resetQueries();
    },
  });
}
