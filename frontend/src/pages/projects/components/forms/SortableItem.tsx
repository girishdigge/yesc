import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        {/* Drag Handle - Apply drag listeners only here */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-md bg-gray-200 p-1 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          ⠿ {/* Drag Handle Icon */}
        </div>

        {/* Rest of the item - not draggable */}
        {children}
      </div>
    </div>
  );
};
