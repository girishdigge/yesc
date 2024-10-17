import { getEmployees } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetEmployees = (offset, pageLimit, name) => {
  return useQuery({
    queryKey: ['employees', offset, pageLimit, name],
    queryFn: async () => getEmployees(offset, pageLimit, name)
  });
};
