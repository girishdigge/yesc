import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Heading from '@/components/shared/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { projectSchema, type ProjectFormValues } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createProjects } from '@/lib/projectAPI';
import { useNavigate } from 'react-router-dom';
// import FileUpload from '@/components/shared/fileupload';
import {
  projectJobCategories,
  projectJobTypes,
  projectStatus,
  buildingStatus
} from '@/lib/formOptions'; // Importing the predefined options
import { getEngineers } from '@/lib/api';
import { getAllClients } from '@/lib/clientAPI';
import { useToast } from '@/components/ui/use-toast';
import { buildingDrawing } from '@/lib/buildingDrawings';
import DynamicBuildingStructure from './DynamicBuildingStructure';

interface ProjectFormType {
  initialData: any | null;
  categories: any;
}

export const CreateProject: React.FC<ProjectFormType> = ({
  initialData
  // categories
}) => {
  const navigate = useNavigate();
  // const params = useParams();
  // const router = useRoutes();
  const { toast } = useToast();
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [imgLoading, setImgLoading] = useState(false);
  const [engineer, setEngineer] = useState([]);
  const [client, setClient] = useState([]);
  const [buildingStructure, setBuildingStructure] = useState([]);
  const title = initialData ? 'Edit Project' : 'Create Your Project';
  const description = initialData
    ? 'Edit Project.'
    : 'To create project,fill the information about project.';
  // const toastMessage = initialData ? 'Project updated.' : 'Project created.';
  // const action = initialData ? 'Save changes' : 'Create';
  // const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  // const delta = currentStep - previousStep;

  const defaultValues = {
    Overhead_Tank: false,
    Underground_Tank: false,
    Septic_Tank: false,
    Tie_Level: false,
    Terrace_Floor: false,
    Staircase_Cap: false
  };

  useEffect(() => {
    const fetchData = async () => {
      const engineers = await getEngineers();
      setEngineer(engineers);
      const clients = await getAllClients();
      setClient(clients);
    };
    fetchData();
  }, []);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || defaultValues,
    mode: 'onChange'
  });

  // const {
  //   control,
  //   formState: { errors }
  // } = form;

  // const { append, remove, fields } = useFieldArray({
  //   control,
  //   name: 'jobs'
  // });

  // const onSubmit = async (data: ProjectFormValues) => {
  const onSubmit = async () => {
    try {
      setLoading(true);
      const formData = form.getValues();
      const projectData = {
        ...formData,
        buildingStructure: buildingStructure
      };
      const result = await createProjects(projectData);
      if (result?.status === 201) {
        console.log(result?.data);
        toast({
          title: result?.data?.message,
          description: 'Project Created Successfully!'
        });
        await buildingDrawing(result?.data?.project);
      }

      // router.refresh();
      // router.push(`/dashboard/projects`);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate('/projects');
    }
  };

  // const onDelete = async () => {
  //   try {
  //     setLoading(true);
  //     //   await axios.delete(`/api/${params.storeId}/projects/${params.projectId}`);
  //     router.refresh();
  //     router.push(`/${params.storeId}/projects`);
  //   } catch (error: any) {
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  const processForm: SubmitHandler<ProjectFormValues> = (data) => {
    console.log('data ==>', data);
    setData(data);

    // navigate('/projects');
    // api call and reset
    // form.reset();
  };

  type FieldName = keyof ProjectFormValues;

  const steps = [
    {
      id: 'Step 1',
      name: 'Architect/Engineer Details',
      fields: [
        'ArchitectName',
        'EngineerName',
        'ArEmail',
        'ErEmail',
        'FirmName',
        'ContactDetails'
      ]
    },
    {
      id: 'Step 2',
      name: 'Project Details',
      fields: [
        'Inhouse_Engineer',
        'Client',
        'Project_Name',
        'Project_Job_Number',
        'Project_Job_Category',
        'Project_Job_Type',
        'Assigned_Date',
        'Project_Address',
        'Project_Status',
        'Building_Status',
        'Completed_Floors'
      ]
    },
    {
      id: 'Step 3',
      name: 'Project Information',
      fields: [
        'SBC_File',
        'SBC_Number',
        'Overhead_Tank',
        'Overhead_Tank_Position',
        'Overhead_Tank_Capacity',
        'Underground_Tank',
        'Underground_Tank_Position',
        'Underground_Tank_Capacity',
        'Septic_Tank',
        'Septic_Tank_Position',
        'Septic_Tank_Capacity',
        'Future_Expantion',
        'No_of_Floors',
        'Tie_Level',
        'Terrace_Floor',
        'Staircase_Cap',
        'Remarks'
      ]
    },

    {
      id: 'Step 4',
      name: 'Site Details',
      fields: [
        'Site_Person_Name',
        'Site_Email',
        'Site_Phone1',
        'Site_Phone2',
        'Owner_Name',
        'Owner_Email',
        'Owner_Phone1',
        'Owner_Phone2'
      ]
    },
    { id: 'Step 5', name: 'Complete' }
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      // setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      // setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            // onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              currentStep === 2
                ? 'gap-4 md:grid md:grid-cols-1'
                : 'gap-8 md:grid md:grid-cols-2'
            )}
          >
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="ArchitectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Architect Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Architect Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="EngineerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engineer Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Engineer Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ArEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Architect Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="johndoe@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ErEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engineer Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="johndoe@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="FirmName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firm Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Firm Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ContactDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Details</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Contact Details"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="Inhouse_Engineer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Inhouse Engineer</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
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
                <FormField
                  control={form.control}
                  name="Client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Client" />
                          </SelectTrigger>
                          <SelectContent>
                            {client.map((eng: any) => (
                              <SelectItem key={eng?.id} value={eng?.full_name}>
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
                <FormField
                  control={form.control}
                  name="Project_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Project Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Project_Job_Number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Job Number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Project Job Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Project_Job_Category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Job Category</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Job Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectJobCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
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
                  name="Project_Job_Type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Job Type</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Job Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectJobTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
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
                  name="Assigned_Date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Date</FormLabel>
                      <FormControl>
                        <Input type="date" disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Project_Address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Project Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Project_Status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Status</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Project Status" />
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
                <FormField
                  control={form.control}
                  name="Building_Status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building Status</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value !== 'Multiple Floors') {
                              form.setValue('Completed_Floors', '0'); // Reset the Number_of_Floors field when it's not required
                            }
                          }}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Building Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {buildingStatus.map((status) => (
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
                <div></div>
                {form.watch('Building_Status') === 'Multiple Floors' && (
                  <FormField
                    control={form.control}
                    name="Completed_Floors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Floors already complete</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            type="number"
                            placeholder="How many floors are completed ?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}
            {currentStep === 2 && (
              <>
                <DynamicBuildingStructure
                  onStructureChange={setBuildingStructure}
                />
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="SBC_File"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SBC Upload</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={field.onChange}
                            value={field.value}
                            // onRemove={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="SBC_Number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SBC Number</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="SBC Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="Overhead_Tank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overhead Water Tank</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={(value) => {
                          field.onChange(value === 'true');
                          if (value === 'false') {
                            form.setValue('Overhead_Tank_Position', '');
                            form.setValue('Overhead_Tank_Capacity', '');
                          }
                        }}
                        value={field.value ? 'true' : 'false'}
                        defaultValue={field.value ? 'true' : 'false'}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ? 'true' : 'false'}
                              placeholder="Overhead Water Tank"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('Overhead_Tank') && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="Overhead_Tank_Position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overhead Tank Position</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Overhead Tank Position"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Overhead_Tank_Capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overhead Tank Capacity</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Overhead Tank Capacity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Underground Tank */}
                <FormField
                  control={form.control}
                  name="Underground_Tank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Underground Water Tank</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={(value) => {
                          field.onChange(value === 'true');
                          if (value === 'false') {
                            form.setValue('Underground_Tank_Position', '');
                            form.setValue('Underground_Tank_Capacity', '');
                          }
                        }}
                        value={field.value ? 'true' : 'false'}
                        defaultValue={field.value ? 'true' : 'false'}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ? 'true' : 'false'}
                              placeholder="Underground Water Tank"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('Underground_Tank') && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="Underground_Tank_Position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Underground Tank Position</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Underground Tank Position"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Underground_Tank_Capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Underground Tank Capacity</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Underground Tank Capacity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Septic Tank */}
                <FormField
                  control={form.control}
                  name="Septic_Tank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Septic Tank</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={(value) => {
                          field.onChange(value === 'true');
                          if (value === 'false') {
                            form.setValue('Septic_Tank_Position', '');
                            form.setValue('Septic_Tank_Capacity', '');
                          }
                        }}
                        value={field.value ? 'true' : 'false'}
                        defaultValue={field.value ? 'true' : 'false'}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ? 'true' : 'false'}
                              placeholder="Septic Tank"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('Septic_Tank') && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="Septic_Tank_Position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Septic Tank Position</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Septic Tank Position"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Septic_Tank_Capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Septic Tank Capacity</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Septic Tank Capacity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="No_of_Floors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No of Floors</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="No of Floors"
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
                    name="Future_Expantion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Future Expantion</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Future Expantion"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="Site_Person_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Person Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Site Person Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Site_Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={loading}
                          placeholder="site@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Site_Phone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Phone 1</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          disabled={loading}
                          placeholder="Site Phone 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Site_Phone2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Phone 2</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          disabled={loading}
                          placeholder="Site Phone 2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Owner_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Owner Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Owner_Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={loading}
                          placeholder="owner@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Owner_Phone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Phone 1</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          disabled={loading}
                          placeholder="Owner Phone 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Owner_Phone2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Phone 2</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          disabled={loading}
                          placeholder="Owner Phone 2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 4 && (
              <div>
                <h1>Completed</h1>
                <pre className="whitespace-pre-wrap">
                  <h1>
                    Building Structure:
                    {JSON.stringify(buildingStructure, null, 2)}
                  </h1>

                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-5">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {currentStep != steps.length - 1 && (
                <button
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="submit" onClick={onSubmit}>
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateProject;
