import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import ClientUpdatePage from './components/client-forms/client-update-form';
import { useParams } from 'react-router-dom';

export default function ClientUpdate() {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Clients', link: '/clients' },
    { title: `${id}`, link: `/clients/${id}` }
  ];
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ClientUpdatePage />
      </div>
    </PageContainer>
  );
}
