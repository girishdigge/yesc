import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import TodoUpdatePage from './components/todo-forms/todo-update-form';
import { useParams } from 'react-router-dom';

export default function TodoUpdate() {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Todos', link: '/todo' },
    { title: `${id}`, link: `/todo/${id}` }
  ];
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <TodoUpdatePage />
      </div>
    </PageContainer>
  );
}
