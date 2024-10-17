import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import ClientCreateForm from '../client-forms/client-create-form';
import Auth from '@/lib/auth';

export default function ClientTableActions() {
  const { isAdmin } = Auth();
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Clients " />
      </div>
      <div className="flex gap-3">
        {isAdmin && (
          <PopupModal
            title="Client"
            renderModal={(onClose) => <ClientCreateForm modalClose={onClose} />}
          />
        )}
      </div>
    </div>
  );
}
