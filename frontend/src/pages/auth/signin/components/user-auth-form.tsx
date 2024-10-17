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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from '@/routes/hooks';
import { login } from '@/lib/loginAPI';
import { jwtDecode } from 'jwt-decode';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setError(null);

    try {
      // Send the login request to the backend
      const response = await login(data);

      const result = response;
      // console.log(result);
      // console.log(response.ok);

      if (response) {
        // Save the access token (for example, in local storage or a state management system)
        localStorage.setItem('accessToken', result.accessToken);
        const decoded: any = jwtDecode(result.accessToken);
        const { username, role } = decoded.UserInfo;
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        console.log('Login successful:', result.accessToken);
        // Optionally, redirect the user or update the UI state
        router.push('/');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button
            disabled={loading}
            className="ml-auto w-full text-base"
            type="submit"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Form>
    </>
  );
}

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useRouter } from '@/routes/hooks';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';

// const formSchema = z.object({
//   username: z.string().min(1, { message: 'Username  is required' }),
//   password: z.string().min(1, { message: 'Password is required' })
// });

// type UserFormValue = z.infer<typeof formSchema>;

// export default function UserAuthForm() {
//   const router = useRouter();
//   const [loading] = useState(false);

//   const form = useForm<UserFormValue>({
//     resolver: zodResolver(formSchema)
//   });

//   const onSubmit = async (data: UserFormValue) => {
//     console.log('data', data);
//     router.push('/');
//   };

//   return (
//     <>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="w-full space-y-2"
//         >
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="username"
//                     placeholder="Enter your username"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Enter your password"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button
//             disabled={loading}
//             className="ml-auto w-full text-base"
//             type="submit"
//           >
//             Sign In
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// }
