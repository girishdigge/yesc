import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createClients } from '@/lib/clientAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

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

const ClientCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const navigate = useNavigate();
  const form = useForm<ClientFormSchemaType>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {}
  });

  const onSubmit = async (values: ClientFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = await createClients(values);
    if (result?.status === 201) {
      console.log(result?.data);
      toast({
        title: result?.data?.message,
        description: 'Project Created Successfully!'
      });
    }
    modalClose();
    navigate('/clients');
    window.location.reload();
  };

  return (
    <div className="px-2">
      {/* <div className="flex items-center justify-center text-2xl font-bold">
        {'<Logo/>'}
      </div> */}

      <Heading
        title={'Create New Client'}
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

              <FormField
                control={form.control}
                name="firm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter firm"
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter location"
                        {...field}
                        className=" px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4">
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter remarks"
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
              Create Client
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientCreateForm;
