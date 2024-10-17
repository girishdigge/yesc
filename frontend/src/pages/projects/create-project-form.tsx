import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import CreateProject from './components/forms/create-project';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/' },
  { title: 'Projects', link: '/projects' },
  { title: 'add project', link: '/add-project' }
];
export default function CreateProjectForm() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <CreateProject categories={[]} initialData={null} />
      </div>
    </PageContainer>
  );
}
