import Heading from '@/components/shared/heading';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Employee } from '@/constants/data';
export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee>();
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await getEmployeeById(id);
      setEmployee(employee);
      // Assuming this API call fetches employee data by ID
    };
    fetchEmployee();
  }, [id]);
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <Heading title={'Employee Details'} />
        <div className="flex justify-end gap-3">
          <Button onClick={() => router.back()}>
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
      <div className="grid  grid-cols-1 gap-6 py-6 lg:grid-cols-4">
        <div className=" col-span-1 flex flex-col gap-6 lg:col-span-1">
          {/* <Card className="bg-secondary  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between font-bold">
              <p className="text-xl"> Profile</p>
              <p className="text-xl">{id}</p>
              <Badge className="bg-green-600">Active</Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrmY1DyC4CYWTK_Bhn6qQygwQJW0UQgXn-ew&usqp=CAU"
                className="rounded-l-[40%] rounded-r-[40%] "
              />
            </CardContent>
          </Card>
          <Card className="bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
            <CardHeader className="pb-2 text-center font-bold">
              {employee?.id}
            </CardHeader>
            <CardContent className="text-sm">{id}</CardContent>
          </Card>
          <Card className="bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
            <CardHeader className="pb-2 text-center font-bold">
              Last Login
            </CardHeader>
            <CardContent className="text-center text-sm">
              12 Aug 2022 9:30 AM
            </CardContent>
          </Card> */}
        </div>
        {/* contact information  */}
        <Card className=" col-span-1 bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-4">
          <CardHeader className="text-xl font-bold">
            <div className="flex gap-2">
              <p>{employee?.first_name}</p>
              <p>{employee?.middle_name}</p>
              <p>{employee?.last_name}</p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mt-4 grid gap-y-4 md:grid-cols-2">
              <div>
                <p className="font-bold ">User Name</p>
                <p className="text-muted-foreground">{employee?.username}</p>
              </div>

              <div>
                <p className="font-bold ">Role</p>
                <p className="text-muted-foreground">{employee?.role}</p>
              </div>

              <div>
                <p className="font-bold "> Email</p>
                <p className="text-muted-foreground">{employee?.email}</p>
              </div>
              <div>
                <p className="font-bold ">Contact Number</p>
                <p className="text-muted-foreground">{employee?.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
