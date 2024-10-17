// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../store';
// import { fetchEmployees, addNewEmployee } from './employeeSlice';

// // Custom hook to fetch employees
// export const useEmployees = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const employees = useSelector(
//     (state: RootState) => state.employees.employees
//   );
//   const status = useSelector((state: RootState) => state.employees.status);
//   const error = useSelector((state: RootState) => state.employees.error);

//   const loadEmployees = (
//     offset: number,
//     pageLimit: number,
//     country: string
//   ) => {
//     dispatch(fetchEmployees({ offset, pageLimit, country }));
//   };

//   return { employees, status, error, loadEmployees };
// };

// // Custom hook to create a new employee
// export const useAddEmployee = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const addEmployee = (newEmployee: any) => {
//     // Replace `any` with your Employee type
//     dispatch(addNewEmployee(newEmployee));
//   };

//   return { addEmployee };
// };
