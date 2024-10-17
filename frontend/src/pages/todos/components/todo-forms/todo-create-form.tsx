import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import { projectStatus } from '@/lib/formOptions';
import { getEngineers } from '@/lib/api';
import { getAllProjects } from '@/lib/projectAPI';
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
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTodos } from '@/lib/todoAPI';
import { useEffect, useState } from 'react';

const todoFormSchema = z.object({
  Title: z
    .string({ required_error: 'Title required' })
    .min(1, { message: 'title is should be at least 1 character' }),
  Description: z.string().optional(),
  Project_Name: z
    .string({ required_error: 'Project Name is required' })
    .min(1, { message: 'title is should be at least 1 character' }),
  Inhouse_Engineer: z
    .string({ required_error: 'Engineer is required' })
    .min(1, { message: 'title is should be at least 1 character' }),
  Status: z
    .string({ required_error: 'Status is required' })
    .min(1, { message: 'Status should be at least 1 character' }),
  Deadline: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: 'Date should be in the format YYYY-MM-DD'
  })
});

type TodoFormSchemaType = z.infer<typeof todoFormSchema>;

const TodoCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const [engineer, setEngineer] = useState([]);
  const [project, setProject] = useState([]);

  const form = useForm<TodoFormSchemaType>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {}
  });

  const onSubmit = (values: TodoFormSchemaType) => {
    createTodos(values);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const engineers = await getEngineers();
      setEngineer(engineers);
      const projects = await getAllProjects();
      setProject(projects);
    };
    fetchData();
  }, []);

  return (
    <div className="px-2">
      {/* <div className="flex items-center justify-center text-2xl font-bold">
        {'<Logo/>'}
      </div> */}

      <Heading
        title={'Create Todo'}
        description={''}
        className="space-y-2 py-8 text-center"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10"
          autoComplete="off"
        >
          <div className="grid gap-y-4">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4">
              <FormField
                control={form.control}
                name="Title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        className=" px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description"
                        {...field}
                        className=" px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" grid grid-cols-2 gap-x-8 gap-y-4">
              <FormField
                control={form.control}
                name="Project_Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Project</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                        <SelectContent>
                          {project.map((pro: any) => (
                            <SelectItem key={pro?.id} value={pro?.Project_Name}>
                              {pro?.Project_Name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Inhouse_Engineer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Inhouse Engineer</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Inhouse Engineer" />
                        </SelectTrigger>
                        <SelectContent>
                          {engineer.map((eng: any) => (
                            <SelectItem key={eng?.id} value={eng?.username}>
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
            </div>
            <div className=" grid grid-cols-2 gap-x-8 gap-y-4">
              <FormField
                control={form.control}
                name="Deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectStatus.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className=" flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full "
              size="lg"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" size="lg">
              Create Todo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TodoCreateForm;
