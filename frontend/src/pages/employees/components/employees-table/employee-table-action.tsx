import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import EmployeeCreateForm from '../employee-forms/employee-create-form';
import Auth from '@/lib/auth';
export default function EmployeeTableActions() {
  const { isAdmin } = Auth();

  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Employees " />
      </div>
      <div className="flex gap-3">
        {isAdmin && (
          <PopupModal
            title="Employee"
            renderModal={(onClose) => (
              <EmployeeCreateForm modalClose={onClose} />
            )}
          />
        )}
      </div>
    </div>
  );
}
