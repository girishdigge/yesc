import PageHead from '@/components/shared/page-head';
import { useGetProjects } from './queries/queries';
import ProjectsTable from './components/project-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
// import { ModeToggle } from '@/components/shared/theme-toggle';
// import UserNav from '@/components/shared/user-nav';

export default function ProjectPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const name = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetProjects(offset, pageLimit, name);
  const projects = data?.projects;

  console.log(projects);
  projects?.map((data) => {
    console.log(data.Activity[data.Activity.length - 1]);
    data.Building_Status = data?.Activity[data?.Activity?.length - 1];
  });
  const totalProjects = data?.totalProjects; //1000
  const pageCount = data?.pageCount;
  // const pageCount = Math.ceil(totalProjects / pageLimit);

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
      <PageHead title="Project Management | YSEC" />
      <div className="flex justify-between">
        <Breadcrumbs
          items={[
            { title: 'Dashboard', link: '/' },
            { title: 'Projects', link: '/projects' }
          ]}
        />
        {/* <div className="hidden md:flex md:items-center">
          <ProjectNav />
          <ModeToggle />
        </div> */}
      </div>
      <ProjectsTable
        projects={projects}
        page={page}
        totalProjects={totalProjects}
        pageCount={pageCount}
      />
    </div>
  );
}
