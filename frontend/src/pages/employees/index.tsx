import PageHead from '@/components/shared/page-head';
import { useGetEmployees } from './queries/queries';
import EmployeesTable from './components/employees-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
// import { ModeToggle } from '@/components/shared/theme-toggle';
// import UserNav from '@/components/shared/user-nav';

export default function EmployeePage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const name = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetEmployees(offset, pageLimit, name);
  const employees = data?.employees;
  const totalEmployees = data?.totalEmployees; //1000
  const pageCount = data?.pageCount;
  // const pageCount = Math.ceil(totalEmployees / pageLimit);

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
      <PageHead title="Employee Management | YSEC" />
      <div className="flex justify-between">
        <Breadcrumbs
          items={[
            { title: 'Dashboard', link: '/' },
            { title: 'Employees', link: '/employees' }
          ]}
        />
        {/* <div className="hidden md:flex md:items-center">
          <EmployeeNav />
          <ModeToggle />
        </div> */}
      </div>
      <EmployeesTable
        employees={employees}
        page={page}
        totalEmployees={totalEmployees}
        pageCount={pageCount}
      />
    </div>
  );
}
