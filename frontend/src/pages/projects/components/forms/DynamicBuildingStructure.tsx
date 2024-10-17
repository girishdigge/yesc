import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem'; // Modified SortableItem with drag handle
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialStructure = [
  { id: 'Concept Framing', name: 'Concept Framing' },
  { id: 'Foundation Level', name: 'Foundation Level' },
  { id: 'Underground Water Tank', name: 'Underground Water Tank' },
  { id: 'Septic Tank', name: 'Septic Tank' },
  { id: 'Ground Floor', name: 'Ground Floor' },
  { id: 'Tie Level', name: 'Tie Level' },
  { id: 'First Floor', name: 'First Floor' },
  { id: 'Terrace', name: 'Terrace' },
  { id: 'Staircase Cap', name: 'Staircase Cap' },
  { id: 'Overhead Water Tank', name: 'Overhead Water Tank' }
];

const DynamicBuildingStructure = ({ onStructureChange }) => {
  const [structure, setStructure] = useState(initialStructure);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = structure.findIndex((item) => item.id === active.id);
      const newIndex = structure.findIndex((item) => item.id === over.id);
      const updatedStructure = arrayMove(structure, oldIndex, newIndex);

      setStructure(updatedStructure);
      onStructureChange(updatedStructure);
    }
  };

  const addNewField = () => {
    const newField = {
      id: `field-${Date.now()}`,
      name: 'New Field',
      required: false
    };
    setStructure([...structure, newField]);
    onStructureChange([...structure, newField]);
  };

  const updateField = (id, key, value) => {
    const updatedStructure = structure.map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );
    setStructure(updatedStructure);
    onStructureChange(updatedStructure);
  };

  const removeField = (id) => {
    const updatedStructure = structure.filter((item) => item.id !== id);
    setStructure(updatedStructure);
    onStructureChange(updatedStructure);
  };

  return (
    <div className="w-2/3 items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-4 shadow-md dark:border-gray-600 dark:bg-gray-800">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={structure}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2 ">
            {structure.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <li className="flex w-full items-center space-x-2 ">
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      updateField(item.id, 'name', e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 p-2 font-medium focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <Button
                    onClick={() => removeField(item.id)}
                    variant="destructive"
                    size="icon"
                    className="rounded-md bg-red-500 text-white hover:bg-red-600"
                  >
                    X
                  </Button>
                </li>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <div className="mt-4 flex items-center justify-center">
        <Button
          onClick={addNewField}
          className="rounded-lg bg-custom-green text-white hover:bg-green-100 hover:text-custom-green"
        >
          Add New Field
        </Button>
      </div>
    </div>
  );
};

export default DynamicBuildingStructure;
