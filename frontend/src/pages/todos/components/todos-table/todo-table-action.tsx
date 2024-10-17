import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import TodoCreateForm from '../todo-forms/todo-create-form';
import Auth from '@/lib/auth';
export default function TodoTableActions() {
  const { isAdmin } = Auth();
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Todos " />
      </div>
      <div className="flex gap-3">
        {isAdmin && (
          <PopupModal
            title="Todo"
            renderModal={(onClose) => <TodoCreateForm modalClose={onClose} />}
          />
        )}
      </div>
    </div>
  );
}
