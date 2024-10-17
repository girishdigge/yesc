import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import TodoTableActions from './todo-table-action';

type TTodosTableProps = {
  todos: any;
  page: number;
  totalTodos: number;
  pageCount: number;
};

export default function TodosTable({ todos, pageCount }: TTodosTableProps) {
  return (
    <>
      <TodoTableActions />
      {todos && (
        <DataTable columns={columns} data={todos} pageCount={pageCount} />
      )}
    </>
  );
}
