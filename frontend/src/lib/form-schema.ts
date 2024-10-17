import * as z from 'zod';

export const projectSchema = z
  .object({
    ArchitectName: z.string(),
    EngineerName: z.string(),
    FirmName: z.string().optional(),
    ContactDetails: z.string().optional(),
    ArEmail: z.string().email().optional(),
    ErEmail: z.string().email().optional(),

    SBC_File: z.any(),
    SBC_Number: z.string(),

    // Booleans for yes/no selections
    Overhead_Tank: z.boolean(),
    Underground_Tank: z.boolean(),
    Septic_Tank: z.boolean(),

    // Tank positions and capacities are optional by default and validated conditionally
    Overhead_Tank_Position: z.string().optional(),
    Overhead_Tank_Capacity: z.string().optional(),
    Underground_Tank_Position: z.string().optional(),
    Underground_Tank_Capacity: z.string().optional(),
    Septic_Tank_Position: z.string().optional(),
    Septic_Tank_Capacity: z.string().optional(),

    No_of_Floors: z.string(),
    Future_Expantion: z.string(),
    Tie_Level: z.boolean(),
    Terrace_Floor: z.boolean(),
    Staircase_Cap: z.boolean(),
    Remarks: z.string().optional(),

    // Dropdown options fetched from the database
    // Inhouse_Engineer: z.union([z.string(), z.number()]), // Assuming you fetch the IDs or names
    // Client: z.union([z.string(), z.number()]),
    Inhouse_Engineer: z.string(), // Assuming you fetch the IDs or names
    Client: z.string(),

    Project_Name: z.string(),
    Project_Job_Number: z.string(),
    Assigned_Date: z
      .string()
      .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Date should be in the format YYYY-MM-DD'
      }),
    Project_Address: z.string(),

    Project_Job_Category: z.string(),
    Project_Job_Type: z.string(),
    Project_Status: z.string(),
    Building_Status: z.string(),
    Completed_Floors: z.string().optional(),

    Site_Person_Name: z.string().optional(),
    Site_Email: z.string().email().optional(),
    Site_Phone1: z.string().regex(/^\d+$/).min(10).max(15).optional(),
    Site_Phone2: z.string().regex(/^\d+$/).min(10).max(15).optional(),

    Owner_Name: z.string().optional(),
    Owner_Email: z.string().email().optional(),
    Owner_Phone1: z.string().regex(/^\d+$/).min(10).max(15).optional(),
    Owner_Phone2: z.string().regex(/^\d+$/).min(10).max(15).optional()
  })
  // Conditional validation for tank positions and capacities based on the tank presence
  .superRefine((data, ctx) => {
    // Overhead tank validation
    if (data.Overhead_Tank) {
      if (!data.Overhead_Tank_Position) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Overhead Tank Position is required when Overhead Tank is selected',
          path: ['Overhead_Tank_Position']
        });
      }
      if (!data.Overhead_Tank_Capacity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Overhead Tank Capacity is required when Overhead Tank is selected',
          path: ['Overhead_Tank_Capacity']
        });
      }
    }

    // Underground tank validation
    if (data.Underground_Tank) {
      if (!data.Underground_Tank_Position) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Underground Tank Position is required when Underground Tank is selected',
          path: ['Underground_Tank_Position']
        });
      }
      if (!data.Underground_Tank_Capacity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Underground Tank Capacity is required when Underground Tank is selected',
          path: ['Underground_Tank_Capacity']
        });
      }
    }

    // Septic tank validation
    if (data.Septic_Tank) {
      if (!data.Septic_Tank_Position) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Septic Tank Position is required when Septic Tank is selected',
          path: ['Septic_Tank_Position']
        });
      }
      if (!data.Septic_Tank_Capacity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Septic Tank Capacity is required when Septic Tank is selected',
          path: ['Septic_Tank_Capacity']
        });
      }
    }
  });

export type ProjectFormValues = z.infer<typeof projectSchema>;
