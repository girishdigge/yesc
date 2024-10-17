import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Project } from '@/constants/data';
import { Edit, MoreHorizontal, Trash, BookUser } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { useState } from 'react';
import { deleteProject } from '@/lib/projectAPI';
import { useNavigate } from 'react-router-dom';
import Auth from '@/lib/auth';

interface CellActionProps {
  data: Project;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { role, isAdmin } = Auth();
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    await deleteProject(data.id);
    setOpen(false);
    navigate('/projects');
    window.location.reload();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/project/details/${data.id}`)}
          >
            <BookUser className="mr-2 h-4 w-4" /> Details
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => router.push(`/project/edit/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Edit Project
            </DropdownMenuItem>
          )}
          {/* <DropdownMenuItem
            onClick={() => router.push(`/project/update/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update Status
          </DropdownMenuItem> */}
          {role === 'root' && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
