import { useDraggable } from '@dnd-kit/core';

export const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center rounded-lg border border-gray-300 bg-gray-50 p-2 shadow-sm transition-all duration-200 dark:border-gray-600 dark:bg-gray-800"
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <span className="text-gray-600 dark:text-gray-300">⠿</span>{' '}
        {/* Drag handle */}
      </div>
      {children}
    </div>
  );
};
