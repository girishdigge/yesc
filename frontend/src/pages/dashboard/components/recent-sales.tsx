import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateTodo } from '@/lib/todoAPI';
import { useGetTodos } from '@/pages/todos/queries/queries';

export default function RecentSales() {
  const { data, isLoading } = useGetTodos(0, 100, ' ', 'Pending');

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  const onSent = async (data) => {
    console.log(data);

    const ActivityData = `Drawing Mailed`;
    const Activity = [...data.Activity, ActivityData];
    console.log(data.Activity);

    const Mailed = 'Sent';
    const values = { Mailed, Activity };
    const up = await updateTodo(data.id, values);
    console.log(up);

    location.reload();
  };
  const onCanceled = async (data) => {
    const ActivityData = `Drawing Canceled`;
    const Activity = [...data.Activity, ActivityData];
    console.log(data.Activity);

    const Mailed = 'Canceled';
    const values = { Mailed, Activity };
    const up = await updateTodo(data.id, values);
    console.log(up);

    location.reload();
  };
  return (
    <ScrollArea className="h-96">
      <div className="space-y-4 overflow-auto">
        <h1>
          you have <span className="font-semibold">{data?.todos?.length}</span>{' '}
          drawings to be mailed
        </h1>
        {data?.todos?.map((todo) => (
          <div key={todo.id} className="flex items-center">
            <Avatar className="h-10 w-10">
              {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
              <AvatarFallback>
                <h1 className="text-sm font-semibold">
                  {todo.Inhouse_Engineer}
                </h1>
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {todo.Project_Name}
              </p>
              <p className="text-sm text-muted-foreground">{todo.Title}</p>
            </div>
            <div className="ml-auto font-medium">
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    onCanceled(todo);
                  }}
                  className="bg-custom-red font-semibold hover:bg-red-200 hover:text-custom-red"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onSent(todo);
                  }}
                  className="w-20 bg-custom-green font-semibold hover:bg-green-200 hover:text-custom-green"
                >
                  Sent
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
