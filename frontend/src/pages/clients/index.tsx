import PageHead from '@/components/shared/page-head';
import { useGetClients } from './queries/queries';
import ClientsTable from './components/clients-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
// import { ModeToggle } from '@/components/shared/theme-toggle';
// import UserNav from '@/components/shared/user-nav';

export default function ClientPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const name = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetClients(offset, pageLimit, name);
  const clients = data?.clients;
  const totalClients = data?.totalClients; //1000
  const pageCount = data?.pageCount;
  // const pageCount = Math.ceil(totalClients / pageLimit);

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
      <PageHead title="Client Management | YSEC" />
      <div className="flex justify-between">
        <Breadcrumbs
          items={[
            { title: 'Dashboard', link: '/' },
            { title: 'Clients', link: '/clients' }
          ]}
        />
        {/* <div className="hidden md:flex md:items-center">
          <ClientNav />
          <ModeToggle />
        </div> */}
      </div>
      <ClientsTable
        clients={clients}
        page={page}
        totalClients={totalClients}
        pageCount={pageCount}
      />
    </div>
  );
}
