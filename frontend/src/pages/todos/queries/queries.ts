import { getTodos } from '@/lib/todoAPI';
import { useQuery } from '@tanstack/react-query';

const username = localStorage.getItem('username') || '';
const role = localStorage.getItem('role') || '';

export const useGetTodos = (offset, pageLimit, country, Mailed?) => {
  return useQuery({
    queryKey: ['todos', offset, pageLimit, country],
    queryFn: async () =>
      getTodos(offset, pageLimit, country, username, role, '', Mailed)
  });
};
