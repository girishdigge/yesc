export const ROLES = {
  ROOT: 'root',
  ADMIN: 'admin',
  SENIOR: 'senior',
  ENGINEER: 'engineer'
};

export function getUserRole(): string | null {
  // This function should return the role of the current logged-in user.
  // You can modify it to fetch the role from your backend, JWT token, or context API.
  return localStorage.getItem('userRole'); // Example: storing role in localStorage
}

export function checkRole(requiredRole: string): boolean {
  const userRole = getUserRole();
  return userRole === requiredRole;
}

export function checkRoleIn(allowedRoles: string[]): boolean {
  const userRole = getUserRole();
  return allowedRoles.includes(userRole || '');
}
