import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '@/lib/projectAPI';
import { useEffect, useState } from 'react';
// import { Project } from '@/constants/data';
export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(id);
      setProject(project);
      // Assuming this API call fetches project data by ID
    };
    fetchProject();
  }, [id]);
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <Heading title={'Project Details'} />
        <div className="flex justify-end gap-3">
          <Button onClick={() => router.back()}>
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-4">
        <div className="col-span-1 flex flex-col gap-6 lg:col-span-1"></div>

        {/* Project Information */}
        <Card className="col-span-1 bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-4">
          <CardHeader className="text-xl font-bold">
            <div className="flex gap-2">
              <p>{project?.Project_Name}</p>
              <p>({project?.Project_Job_Type})</p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mt-4 grid gap-y-4 md:grid-cols-2">
              {/* Architect & Engineer Information */}
              <div>
                <p className="font-bold">Architect Name</p>
                <p className="text-muted-foreground">
                  {project?.ArchitectName}
                </p>
              </div>
              <div>
                <p className="font-bold">Engineer Name</p>
                <p className="text-muted-foreground">{project?.EngineerName}</p>
              </div>
              <div>
                <p className="font-bold">Architect Email</p>
                <p className="text-muted-foreground">{project?.ArEmail}</p>
              </div>
              <div>
                <p className="font-bold">Engineer Email</p>
                <p className="text-muted-foreground">{project?.ErEmail}</p>
              </div>
              <div>
                <p className="font-bold">Firm Name</p>
                <p className="text-muted-foreground">{project?.FirmName}</p>
              </div>
              <div>
                <p className="font-bold">Contact Details</p>
                <p className="text-muted-foreground">
                  {project?.ContactDetails}
                </p>
              </div>

              {/* Project Information */}
              <div>
                <p className="font-bold">Project Job Number</p>
                <p className="text-muted-foreground">
                  {project?.Project_Job_Number}
                </p>
              </div>
              <div>
                <p className="font-bold">Assigned Date</p>
                <p className="text-muted-foreground">
                  {new Date(project?.Assigned_Date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-bold">Project Address</p>
                <p className="text-muted-foreground">
                  {project?.Project_Address}
                </p>
              </div>
              <div>
                <p className="font-bold">Project Status</p>
                <p className="text-muted-foreground">
                  {project?.Project_Status}
                </p>
              </div>

              {/* Client & Engineer Information */}
              <div>
                <p className="font-bold">Client</p>
                <p className="text-muted-foreground">{project?.Client}</p>
              </div>
              <div>
                <p className="font-bold">In-house Engineer</p>
                <p className="text-muted-foreground">
                  {project?.Inhouse_Engineer}
                </p>
              </div>
              <div>
                <p className="font-bold">Number of Floors</p>
                <p className="text-muted-foreground">{project?.No_of_Floors}</p>
              </div>
              <div>
                <p className="font-bold">Building Status</p>
                <p className="text-muted-foreground">
                  {project?.Building_Status === 'Multiple Floors'
                    ? project?.Completed_Floors + ' floors were completed'
                    : project?.Building_Status}
                </p>
              </div>

              {/* Tank Information */}
              <div>
                <p className="font-bold">Tank Information</p>
                <p className="text-muted-foreground">
                  Overhead Tank: {project?.Overhead_Tank ? 'Yes' : 'No'},
                  {project?.Overhead_Tank && (
                    <>
                      {' '}
                      Capacity: {project?.Overhead_Tank_Capacity} , Position:{' '}
                      {project?.Overhead_Tank_Position}
                    </>
                  )}
                  <br />
                  Underground Tank: {project?.Underground_Tank ? 'Yes' : 'No'},
                  {project?.Underground_Tank && (
                    <>
                      {' '}
                      Capacity: {project?.Underground_Tank_Capacity} , Position:{' '}
                      {project?.Underground_Tank_Position}
                    </>
                  )}
                  <br />
                  Septic Tank: {project?.Septic_Tank ? 'Yes' : 'No'},
                  {project?.Septic_Tank && (
                    <>
                      Capacity: {project?.Septic_Tank_Capacity} , Position:{' '}
                      {project?.Septic_Tank_Position}
                    </>
                  )}
                </p>
              </div>

              {/* Expansion & SBC Information */}
              <div>
                <p className="font-bold">Building Structure & Remarks</p>
                <p className="text-muted-foreground">
                  Tie Level: {project?.Tie_Level ? 'Yes' : 'No'}
                </p>
                <p className="text-muted-foreground">
                  Terrace Floor: {project?.Terrace_Floor ? 'Yes' : 'No'}
                </p>
                <p className="text-muted-foreground">
                  Starcase Cap: {project?.Staircase_Cap ? 'Yes' : 'No'}
                </p>
                <p className="text-muted-foreground">{project?.Remarks}</p>
              </div>

              <div>
                <p className="font-bold">Future Expansion</p>
                <p className="text-muted-foreground">
                  {project?.Future_Expantion}
                </p>
              </div>
              <div>
                <p className="font-bold">SBC Number</p>
                <p className="text-muted-foreground">{project?.SBC_Number}</p>
              </div>

              {/* Site Contact Information */}
              <div>
                <p className="font-bold">Site Contact Name</p>
                <p className="text-muted-foreground">
                  {project?.Site_Person_Name}
                </p>
              </div>
              <div>
                <p className="font-bold">Site Contact Email</p>
                <p className="text-muted-foreground">{project?.Site_Email}</p>
              </div>
              <div>
                <p className="font-bold">Site Contact Phone 1</p>
                <p className="text-muted-foreground">{project?.Site_Phone1}</p>
              </div>
              <div>
                <p className="font-bold">Site Contact Phone 2</p>
                <p className="text-muted-foreground">{project?.Site_Phone2}</p>
              </div>

              {/* Owner Information */}
              <div>
                <p className="font-bold">Owner Name</p>
                <p className="text-muted-foreground">{project?.Owner_Name}</p>
              </div>
              <div>
                <p className="font-bold">Owner Email</p>
                <p className="text-muted-foreground">{project?.Owner_Email}</p>
              </div>
              <div>
                <p className="font-bold">Owner Phone 1</p>
                <p className="text-muted-foreground">{project?.Owner_Phone1}</p>
              </div>
              <div>
                <p className="font-bold">Owner Phone 2</p>
                <p className="text-muted-foreground">{project?.Owner_Phone2}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
