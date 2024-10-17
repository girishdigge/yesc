import { Plus } from 'lucide-react';
import TableSearchInput from '@/components/shared/table-search-input';
import { useRouter } from '@/routes/hooks';
import { Button } from '@/components/ui/button';
import Auth from '@/lib/auth';
export default function EmployeeTableActions() {
  const { isAdmin } = Auth();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Projects" />
      </div>
      <div className="flex gap-3">
        {isAdmin && (
          <Button onClick={() => router.push('/projects/add-project')}>
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Button>
        )}
      </div>
    </div>
  );
}
