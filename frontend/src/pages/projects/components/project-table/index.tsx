import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ProjectTableActions from './project-table-action';
import { Project } from '@/constants/data';
type TProjectsTableProps = {
  projects: Project[];
  page: number;
  totalProjects: number;
  pageCount: number;
};

export default function ProjectsTable({
  projects,
  pageCount
}: TProjectsTableProps) {
  return (
    <>
      <ProjectTableActions />
      {projects && (
        <DataTable columns={columns} data={projects} pageCount={pageCount} />
      )}
    </>
  );
}
