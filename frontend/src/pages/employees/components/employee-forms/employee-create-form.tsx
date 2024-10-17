import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createEmployees } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
const employeeFormSchema = z
  .object({
    first_name: z
      .string({ required_error: 'First name is required' })
      .min(1, { message: 'firstname is should be at least 1 character' }),
    middle_name: z.string().min(1, { message: 'middlename is required' }),
    last_name: z.string().min(1, { message: 'lastname is required' }),
    username: z.string().min(1, { message: 'username is required' }),
    role: z.string().min(1, { message: 'role is required' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    phone: z.string().min(10, { message: 'Enter a valid phone number' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

type EmployeeFormSchemaType = z.infer<typeof employeeFormSchema>;

const EmployeeCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const navigate = useNavigate();
  const form = useForm<EmployeeFormSchemaType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {}
  });

  const onSubmit = (values: EmployeeFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    createEmployees(values);
    modalClose();
    navigate('/employee');
    window.location.reload();
  };

  return (
    <div className="px-2">
      {/* <div className="flex items-center justify-center text-2xl font-bold">
        {'<Logo/>'}
      </div> */}

      <Heading
        title={'Create New Employee'}
        description={''}
        className="space-y-2 py-10 text-center"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12"
          autoComplete="off"
        >
          <div className="grid gap-y-4">
            <div className="grid grid-cols-3 gap-x-4 gap-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Firstname"
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
                name="middle_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Middlename"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Lastname"
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full px-4 py-6 shadow-inner drop-shadow-xl">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Designation</SelectLabel>
                            <SelectItem value="engineer">Engineer</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter phone"
                        {...field}
                        className=" px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4"> */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Create password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        {...field}
                        className=" px-4 py-6 shadow-inner drop-shadow-xl"
                      />
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
              Create Employee
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeCreateForm;
