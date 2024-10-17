import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import EmployeeTableActions from './employee-table-action';
import { Employee } from '@/constants/data';
type TEmployeesTableProps = {
  employees: Employee[];
  page: number;
  totalEmployees: number;
  pageCount: number;
};

export default function EmployeesTable({
  employees,
  pageCount
}: TEmployeesTableProps) {
  return (
    <>
      <EmployeeTableActions />
      {employees && (
        <DataTable columns={columns} data={employees} pageCount={pageCount} />
      )}
    </>
  );
}
