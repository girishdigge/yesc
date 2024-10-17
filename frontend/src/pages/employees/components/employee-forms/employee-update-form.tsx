import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '@/components/shared/heading';
import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { getEmployeeById, updateEmployee } from '@/lib/api'; // Assuming these functions exist

// Schema for validation
const employeeFormSchema = z
  .object({
    first_name: z
      .string({ required_error: 'First name is required' })
      .min(1, { message: 'First name should be at least 1 character' }),
    middle_name: z.string().min(1, { message: 'Middle name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    username: z.string().min(1, { message: 'Username is required' }),
    role: z.string().min(1, { message: 'Role is required' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    phone: z.string().min(10, { message: 'Enter a valid phone number' }),
    password: z.string().optional(), // Optional for updates
    confirmPassword: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

type EmployeeFormSchemaType = z.infer<typeof employeeFormSchema>;

const EmployeeUpdatePage: React.FC = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showPasswordFields, setShowPasswordFields] = useState(false); // State to toggle password fields visibility
  const form = useForm<EmployeeFormSchemaType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      username: '',
      role: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Fetch employee data by ID and pre-fill the form
  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await getEmployeeById(id); // Assuming this API call fetches employee data by ID
      if (employee) {
        form.reset({
          first_name: employee.first_name,
          middle_name: employee.middle_name,
          last_name: employee.last_name,
          username: employee.username,
          role: employee.role,
          email: employee.email,
          phone: employee.phone
        });
      }
    };
    fetchEmployee();
  }, [id, form]);

  const onSubmit = async (values: EmployeeFormSchemaType) => {
    // Update the employee with the form values
    await updateEmployee(id, values); // Assuming updateEmployee is an API call that updates the employee
    navigate('/employee');
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between gap-3">
        <Heading title="Update Employee" description="Edit employee details" />
        <Button onClick={() => router.back()}>
          <ChevronLeftIcon className="h-4 w-4" />
          Back
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 space-y-12"
          autoComplete="off"
        >
          <div className="grid gap-y-4">
            <div className="grid grid-cols-3 gap-x-4 gap-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel id="first_name">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Firstname"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
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
                    <FormLabel id="middle_name">Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Middlename"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
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
                    <FormLabel id="last_name">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lastname"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel id="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
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
                    <FormLabel id="role">Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value} // Setting the value to existing role
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
                    <FormLabel id="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
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
                    <FormLabel id="phone">Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Change Password Button and Fields */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {!showPasswordFields && (
                <Button
                  type="button"
                  onClick={() => setShowPasswordFields(true)}
                  className="rounded-full md:w-1/2 "
                >
                  Change Password
                </Button>
              )}
              {showPasswordFields && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel id="password">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create new password"
                            {...field}
                            className="px-4 py-6 shadow-inner drop-shadow-xl"
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
                        <FormLabel id="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            {...field}
                            className="px-4 py-6 shadow-inner drop-shadow-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              size="lg"
              onClick={() => navigate('/employee')}
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
        </form>
      </Form>
    </div>
  );
};

export default EmployeeUpdatePage;
