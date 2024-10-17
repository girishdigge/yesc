import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import EmployeeUpdatePage from './components/employee-forms/employee-update-form';
import { useParams } from 'react-router-dom';

export default function EmployeeUpdate() {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Employees', link: '/employee' },
    { title: `${id}`, link: `/employee/${id}` }
  ];
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeUpdatePage />
      </div>
    </PageContainer>
  );
}
