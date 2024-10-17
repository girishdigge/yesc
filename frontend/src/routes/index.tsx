import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const Logout = lazy(() => import('@/pages/auth/logout/Logout'));

const ProjectsPage = lazy(() => import('@/pages/projects'));

const CreateProjectForm = lazy(
  () => import('@/pages/projects/create-project-form')
);
const ProjectEdit = lazy(() => import('@/pages/projects/ProjectEditPage'));

const EmployeePage = lazy(() => import('@/pages/employees'));
const TodoPage = lazy(() => import('@/pages/todos'));
const TodoDetailsPage = lazy(
  () => import('@/pages/todos/components/todo-details')
);
const TodoUpdate = lazy(() => import('@/pages/todos/TodoUpdatePage'));
const EmployeeUpdate = lazy(
  () => import('@/pages/employees/EmployeeDetailPage')
);
const EmployeeUpdatePage = lazy(
  () => import('@/pages/employees/EmployeeUpdatePage')
);
const ClientPage = lazy(() => import('@/pages/clients'));
const ClientUpdate = lazy(() => import('@/pages/clients/ClientDetailPage'));
const ClientUpdatePage = lazy(() => import('@/pages/clients/ClientUpdatePage'));
// const ProjectUpdate = lazy(() => import('@/pages/projects/ProjectDetailPage'));
const ProjectDetailPage = lazy(
  () => import('@/pages/projects/ProjectDetailPage')
);
// const SettingsPage = lazy(() => import('@/pages/settings'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'todos',
          element: <TodoPage />
        },
        {
          path: 'todos/details/:id',
          element: <TodoDetailsPage />
        },
        {
          path: 'todos/update/:id',
          element: <TodoUpdate />
        },
        {
          path: 'projects',
          element: <ProjectsPage />
        },
        {
          path: 'projects/add-project',
          element: <CreateProjectForm />
        },
        {
          path: 'project/details/:id',
          element: <ProjectDetailPage />
        },
        {
          path: 'project/edit/:id',
          element: <ProjectEdit />
        },
        {
          path: 'employee',
          element: <EmployeePage />
        },
        {
          path: 'employee/details/:id',
          element: <EmployeeUpdate />
        },
        {
          path: 'employee/update/:id',
          element: <EmployeeUpdatePage />
        },
        {
          path: 'clients',
          element: <ClientPage />
        },
        {
          path: 'client/details/:id',
          element: <ClientUpdate />
        },
        {
          path: 'client/update/:id',
          element: <ClientUpdatePage />
        },
        // {
        //   path: 'settings',
        //   element: <SettingsPage />
        // },

        {
          path: 'form',
          element: <FormPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path: 'logout',
      element: <Logout />
    }
  ];
  // const projectRoutes = [
  //   {
  //     path: 'projects/add-project',
  //     element: <ProjectAdd initialData={undefined} categories={undefined} />
  //   }
  // ];

  const routes = useRoutes([
    ...dashboardRoutes,
    ...publicRoutes
    // ...projectRoutes
  ]);

  return routes;
}
