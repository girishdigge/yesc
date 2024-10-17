import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import ClientDetailPage from './components/client-forms/client-detail-page';
import { useParams } from 'react-router-dom';

export default function EmployeeUpdate() {
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
        <ClientDetailPage />
      </div>
    </PageContainer>
  );
}
