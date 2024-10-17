import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '@/components/shared/heading';
import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/shared/alert-modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { getTodoById, updateTodo } from '@/lib/todoAPI';
import { getSeniors } from '@/lib/api';
// import { projectStatus } from '@/lib/formOptions';
import { Label } from '@radix-ui/react-label';
import { buildingDrawing } from '@/lib/buildingDrawings';
import { getProjectById, updateProject } from '@/lib/projectAPI';
const role = localStorage.getItem('role');

// Schema for validation
const todoFormSchema = z.object({
  Senior: z.string().optional(),
  Description: z.string().optional(),
  Status: z.string({ required_error: 'Status is required' }),
  SeniorQuery: z.string().optional(), // Optional for passing queries back
  AdminQuery: z.string().optional() // Optional for passing queries back
});

type TodoFormSchemaType = z.infer<typeof todoFormSchema>;

const TodoUpdatePage: React.FC = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const [senior, setSenior] = useState([]); // Senior Engineer List
  const [todo, setTodo] = useState<any>({}); // Current todo state
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const form = useForm<TodoFormSchemaType>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      Senior: '',
      Status: '',
      Description: '',
      SeniorQuery: '',
      AdminQuery: ''
    }
  });

  // Fetch todo data and senior engineers on load
  useEffect(() => {
    const fetchTodo = async () => {
      const seniors = await getSeniors();
      setSenior(seniors);
      const todoData = await getTodoById(id); // Fetch todo by ID
      setTodo(todoData);
      console.log(todoData);

      if (todoData) {
        form.reset({
          Status: todoData.Status,
          Description: todoData.Description,
          Senior: todoData.Senior || '',
          AdminQuery: todoData.AdminQuery || '',
          SeniorQuery: todoData.SeniorQuery || ''
        });
      }
    };
    fetchTodo();
  }, [id, form]);

  // Submit the form and update the todo
  const onConfirm = async () => {
    const SeniorReview = false;
    const FinalReview = true;
    const Status = 'Final Reviewing';
    const ActivityData = `${todo.Senior} sent to Yash Sir for final review.`;
    const Activity = [...todo.Activity, ActivityData];
    const values = { Status, Activity, SeniorReview, FinalReview };

    await updateTodo(id, values);
    setOpen(false);
    navigate('/todos');
  };
  const onConfirmFinal = async () => {
    const FinalReview = false;
    const Status = 'Completed';
    const ActivityData = `Yash Sir Reviewed and marked it complete.`;
    const Activity = [...todo.Activity, ActivityData];
    const Mailed = 'Pending';
    const values = { Status, Mailed, Activity, FinalReview };

    await updateTodo(id, values);

    setOpen(false);
    const data = await getProjectById(todo?.Project_Id);
    console.log(data);
    data.Activity = [...data.Activity, todo?.Title];
    const updatedData = await updateProject(todo?.Project_Id, data);
    console.log(updatedData);

    await buildingDrawing(updatedData?.updatedProject);
    navigate('/todos');
  };

  const onSubmit = async (values: any) => {
    if (values.Senior) {
      const SeniorReview = true;
      values.Status = `${values.Senior} Reviewing`;
      const ActivityData = `${todo.Inhouse_Engineer} sent to ${values.Senior} for Review.`;
      const Activity = [...todo.Activity, ActivityData];
      console.log(Activity);

      values = { ...values, Activity, SeniorReview }; // Mark it for senior review
    }

    await updateTodo(id, values); // Update the todo with new data
    navigate('/todos'); // Navigate back to the todo list
  };

  const SeniorQuery = async (values: any) => {
    console.log(values);
    todo.Senior = '';
    const FinalReview = false;
    const SeniorReview = false;
    values.Status = `Query Raised by Senior ${values.Senior}`;
    const ActivityData = values.Status + ', Query:' + values.SeniorQuery;
    const Activity = [...todo.Activity, ActivityData];
    const Senior = '';
    values = { ...values, Senior, Activity, FinalReview, SeniorReview }; // Mark it for senior review

    await updateTodo(id, values); // Update the todo with new data
    navigate('/todos'); // Navigate back to the todo list
  };
  const RootQuery = async (values: any) => {
    console.log(values);

    const FinalReview = false;
    values.Status = `Query Raised by Yash Sir`;
    const ActivityData = values.Status + ', Query:' + values.AdminQuery;
    const Activity = [...todo.Activity, ActivityData];
    values = { ...values, Activity, FinalReview }; // Mark it for senior review

    await updateTodo(id, values); // Update the todo with new data
    navigate('/todos'); // Navigate back to the todo list
  };

  return (
    <div className="container mx-auto py-10">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={role === 'senior' ? onConfirm : onConfirmFinal}
        loading={loading}
      />
      <div className="flex justify-between gap-3">
        <Heading title="Update Todo" description="Edit todo details" />
        <Button onClick={() => router.back()}>
          <ChevronLeftIcon className="h-4 w-4" />
          Back
        </Button>
      </div>
      {role === 'engineer' && todo?.Status !== 'Completed' && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-12 space-y-12"
            autoComplete="off"
          >
            <div className="grid gap-y-4">
              <div>
                <div className="grid gap-x-4 gap-y-4 md:grid-cols-3">
                  {!todo?.SeniorReview && !todo?.FinalReview && (
                    <FormField
                      control={form.control}
                      name="Status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              {...field}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={todo.Status} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Not Started">
                                  Not Started
                                </SelectItem>
                                <SelectItem value="In Progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="Revised Drawing Submited">
                                  Revised Drawing Submited
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="Description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* If waiting for review */}
                  {todo?.SeniorReview && (
                    <Label className="text-red-500">
                      Waiting for review from senior *
                    </Label>
                  )}
                  {todo?.FinalReview && (
                    <Label className="text-red-500">
                      Waiting for final review from Yash Sale sir *
                    </Label>
                  )}

                  {/* If not under review, choose a senior */}
                  {!todo?.SeniorReview && !todo?.FinalReview && (
                    <FormField
                      control={form.control}
                      name="Senior"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Send for review to senior</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Senior" />
                              </SelectTrigger>
                              <SelectContent>
                                {senior.map((eng: any) => (
                                  <SelectItem
                                    key={eng?.id}
                                    value={eng?.username}
                                  >
                                    {eng?.full_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="m-8 flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full"
                    size="lg"
                    onClick={() => navigate('/todos')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    className="rounded-full"
                    size="lg"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      )}

      {role === 'senior' && todo?.SeniorReview && (
        <div className="m-4 grid gap-12 md:m-12 md:grid-cols-2 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(SeniorQuery)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="SeniorQuery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raise Query</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Provide Feedback or Raise a Query"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-custom-red text-base font-medium hover:bg-red-100 hover:text-custom-red"
                type="submit"
              >
                Raise Query
              </Button>
            </form>
          </Form>

          <div className="flex flex-col gap-y-2">
            <Label className="text-base font-medium">
              Reviewed, No query, submit to client
            </Label>
            <Button
              className="bg-custom-green text-base font-medium hover:bg-green-100 hover:text-custom-green"
              type="button"
              onClick={() => setOpen(true)}
            >
              Confirm & Submit
            </Button>
          </div>
        </div>
      )}
      {role === 'root' && todo?.FinalReview && (
        <div className="m-4 grid gap-12 md:m-12 md:grid-cols-2 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(RootQuery)} className="space-y-4">
              <FormField
                control={form.control}
                name="AdminQuery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raise Query</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Provide Feedback or Raise a Query"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-custom-red text-base font-medium hover:text-custom-red"
                type="submit"
              >
                Raise Query
              </Button>
            </form>
          </Form>

          <div className="flex flex-col gap-y-2">
            <Label className="text-base font-medium">
              Reviewed, No query, submit to client
            </Label>
            <Button
              className="bg-custom-green text-base font-medium hover:text-custom-green"
              type="button"
              onClick={() => setOpen(true)}
            >
              Confirm & Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoUpdatePage;
