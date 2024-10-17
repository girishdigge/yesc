import PageHead from '@/components/shared/page-head';
import { useGetTodos } from './queries/queries';
import TodosTable from './components/todos-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
// import { ModeToggle } from '@/components/shared/theme-toggle';
// import TodoNav from '@/components/shared/todo-nav';

export default function TodoPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const country = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetTodos(offset, pageLimit, country);
  const todos = data?.todos;
  const totalTodos = data?.totalTodos; //1000

  const pageCount = data?.pageCount;

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Todo Management | YSEC" />
      <div className="flex justify-between">
        <Breadcrumbs
          items={[
            { title: 'Dashboard', link: '/' },
            { title: 'Todos', link: '/todos' }
          ]}
        />
        {/* <div className="hidden md:flex md:items-center">
          <TodoNav />
          <ModeToggle />
        </div> */}
      </div>
      <TodosTable
        todos={todos}
        page={page}
        totalTodos={totalTodos}
        pageCount={pageCount}
      />
    </div>
  );
}
