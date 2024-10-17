// import { Checkbox } from '@/components/ui/checkbox';
import { Project } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Project>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'Project_Name',
    header: 'PROJECT'
  },
  {
    accessorKey: 'Project_Job_Category',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'Project_Job_Number',
    header: 'JOB NO.'
  },
  {
    accessorKey: 'Inhouse_Engineer',
    header: 'ENGINEER ALLOTED'
  },
  {
    accessorKey: 'Project_Status',
    header: 'PROJECT STATUS'
  },
  {
    accessorKey: 'Building_Status',
    header: 'BUILDING STATUS'
  },
  {
    accessorKey: 'Assigned_Date',
    header: 'DATE'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
