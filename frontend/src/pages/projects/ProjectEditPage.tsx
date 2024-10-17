import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import EditProject from './components/forms/edit-project-form';
import { useParams } from 'react-router-dom';

export default function ProjectUpdate() {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Projects', link: '/projects' },
    { title: `${id}`, link: `/projects/${id}` }
  ];

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <EditProject id={id} />
      </div>
    </PageContainer>
  );
}
