// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getEmployees, createEmployee } from '@/lib/api';

// export interface EmployeeState {
//   employees: Array<any>; // Replace `any` with your Employee type
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: EmployeeState = {
//   employees: [],
//   status: 'idle',
//   error: null
// };

// // Async thunk to fetch employees
// export const fetchEmployees = createAsyncThunk(
//   'employees/fetchEmployees',
//   async ({
//     offset,
//     pageLimit,
//     country
//   }: {
//     offset: number;
//     pageLimit: number;
//     country: string;
//   }) => {
//     const response = await getEmployees(offset, pageLimit, country);
//     return response; // Assuming response is in the expected format
//   }
// );

// // Async thunk to create a new employee
// export const addNewEmployee = createAsyncThunk(
//   'employees/addNewEmployee',
//   async (newEmployee: any) => {
//     // Replace `any` with your Employee type
//     const response = await createEmployee(newEmployee);
//     return response;
//   }
// );

// const employeeSlice = createSlice({
//   name: 'employees',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployees.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.employees = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addNewEmployee.fulfilled, (state, action) => {
//         state.employees.push(action.payload);
//       });
//   }
// });

// export default employeeSlice.reducer;
