import 'react-vertical-timeline-component/style.min.css';
import PageHead from '@/components/shared/page-head';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Timeline from './Timeline';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon } from 'lucide-react';
import PageContainer from '@/components/layout/page-container';

export default function TodoDetailsPage() {
  const { id } = useParams();

  const router = useRouter();
  return (
    <PageContainer scrollable={true}>
      <div className="p-4 md:p-8">
        <PageHead title="Todo Management | YSEC" />
        <div className="flex justify-between">
          <Breadcrumbs
            items={[
              { title: 'Dashboard', link: '/' },
              { title: 'Todos', link: '/todos' },
              { title: `${id}`, link: `/todos/${id}` }
            ]}
          />
        </div>
        <div className="flex items-center justify-between pt-4">
          <Heading title={'Todo Details'} />
          <div className="flex justify-end gap-3">
            <Button onClick={() => router.back()}>
              <ChevronLeftIcon className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <Timeline id={id} />
        </div>
      </div>
    </PageContainer>
  );
}
