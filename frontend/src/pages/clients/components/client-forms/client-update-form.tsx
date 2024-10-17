import React, { useEffect } from 'react';
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
import { getClientById, updateClient } from '@/lib/clientAPI'; // Assuming these functions exist
import { Textarea } from '@/components/ui/textarea';

// Schema for validation
const clientFormSchema = z.object({
  first_name: z
    .string({ required_error: 'First name is required' })
    .min(1, { message: 'firstname is should be at least 1 character' }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: 'lastname is required' }),
  location: z.string().optional(),
  firm: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  remarks: z.string().optional()
});

type ClientFormSchemaType = z.infer<typeof clientFormSchema>;

const ClientUpdatePage: React.FC = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // State to toggle password fields visibility
  const form = useForm<ClientFormSchemaType>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      firm: '',
      location: '',
      remarks: ''
    }
  });

  // Fetch client data by ID and pre-fill the form
  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClientById(id); // Assuming this API call fetches client data by ID
      if (client) {
        form.reset({
          first_name: client.first_name,
          middle_name: client.middle_name,
          last_name: client.last_name,
          email: client.email,
          phone: client.phone,
          firm: client.firm,
          location: client.location,
          remarks: client.remarks
        });
      }
    };
    fetchClient();
  }, [id, form]);

  const onSubmit = async (values: ClientFormSchemaType) => {
    // Update the client with the form values
    await updateClient(id, values); // Assuming updateClient is an API call that updates the client
    navigate('/clients');
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between gap-3">
        <Heading title="Update Client" description="Edit client details" />
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
              <FormField
                control={form.control}
                name="firm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel id="firm">Firm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter firm"
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel id="location">Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter location"
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
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel id="remarks">Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter remarks"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              size="lg"
              onClick={() => navigate('/client')}
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

export default ClientUpdatePage;
