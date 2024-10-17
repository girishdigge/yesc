import Auth from '@/lib/auth';
import { NavItem } from '@/types';

const { isAdmin, isEngineer, isSenior } = Auth();

const allNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Todo',
    href: '/todos',
    icon: 'todo',
    label: 'Todo'
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: 'project',
    label: 'Projects'
  },
  {
    title: 'Employees',
    href: '/employee',
    icon: 'user',
    label: 'Employee'
  },
  {
    title: 'Clients',
    href: '/clients',
    icon: 'client',
    label: 'Client'
  },
  {
    title: 'Settings',
    href: '/setting',
    icon: 'settings',
    label: 'Setting'
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: 'login',
    label: 'Logout'
  }
];

export const navItems: NavItem[] = allNavItems.filter((item) => {
  if (isAdmin) {
    // Admin can see all items
    return true;
  } else if (isEngineer) {
    // Engineer should not see Employee or Clients
    return (
      item.title !== 'Employees' &&
      item.title !== 'Clients' &&
      item.title !== 'Settings'
    );
  } else if (isSenior) {
    // Senior can see Dashboard, Projects, and Logout
    return ['Dashboard', 'Todo', 'Projects', 'Logout'].includes(item.title);
  } else {
    // Other roles can only see Dashboard and Logout
    return ['Dashboard', 'Logout'].includes(item.title);
  }
});

export const ROLES = {
  root: 'root',
  admin: 'admin',
  senior: 'senior',
  engineer: 'engineer'
};
export const dashboardCard = [
  {
    date: 'Today',
    total: 2000,
    role: 'Students',
    color: 'bg-[#EC4D61] bg-opacity-40'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Teachers',
    color: 'bg-[#FFEB95] bg-opacity-100'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Parents',
    color: 'bg-[#84BD47] bg-opacity-30'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Schools',
    color: 'bg-[#D289FF] bg-opacity-30'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Client = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
  firm: string;
  location: string;
  remarks: string;
};

export type Project = {
  id: number;
  Project_Name: string;
  Project_Job_Category: string;
  Project_Job_Number: string;
  Inhouse_Engineer: string;
  Project_Status: string;
  Building_Status: string;
  Assigned_Date: string;
};

export type Todo = {
  id: number;
  Project_Name: string;
  Title: string;
  Description: string;
  Project_Job_Category: string;
  Inhouse_Engineer: string;
  Status: string;
  Deadline: string;
};
