import { getClients } from '@/lib/clientAPI';
import { useQuery } from '@tanstack/react-query';

export const useGetClients = (offset, pageLimit, name) => {
  return useQuery({
    queryKey: ['clients', offset, pageLimit, name],
    queryFn: async () => getClients(offset, pageLimit, name)
  });
};
