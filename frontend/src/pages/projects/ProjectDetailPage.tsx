import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import ProjectDetailPage from './components/forms/project-detail-page';
import { useParams } from 'react-router-dom';
import ProjectTimeline from './components/forms/project-timeline';

export default function ProjectDetail() {
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
        <ProjectDetailPage />
      </div>
      <div className="mt-8">
        <ProjectTimeline id={id} />
      </div>
    </PageContainer>
  );
}
