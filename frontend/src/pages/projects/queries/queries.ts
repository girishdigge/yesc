import { getProjects } from '@/lib/projectAPI';
import { useQuery } from '@tanstack/react-query';

const username = localStorage.getItem('username') || '';
const role = localStorage.getItem('role') || '';
export const useGetProjects = (offset, pageLimit, name) => {
  return useQuery({
    queryKey: ['projects', offset, pageLimit, name],
    queryFn: async () => getProjects(offset, pageLimit, name, username, role)
  });
};
