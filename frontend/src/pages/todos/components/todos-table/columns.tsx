// import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Todo>[] = [
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
    accessorKey: 'Title',
    header: 'TITLE'
  },
  {
    accessorKey: 'Description',
    header: 'DESCRIPTION'
  },
  {
    accessorKey: 'Inhouse_Engineer',
    header: 'ENGINEER'
  },
  {
    accessorKey: 'Deadline',
    header: 'DEADLINE'
  },
  {
    accessorKey: 'Status',
    header: 'STATUS'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
