import { jwtDecode } from 'jwt-decode';

const Auth = () => {
  const token = localStorage.getItem('accessToken');
  let isAdmin = false;
  let isEngineer = false;
  let isSenior = false;
  if (token) {
    const decoded: any = jwtDecode(token);
    const { first_name, last_name, username, role } = decoded.UserInfo;
    if (role === 'root' || role === 'admin') {
      isAdmin = true;
    }
    if (role === 'root' || role === 'admin' || role === 'senior') {
      isSenior = true;
    }
    if (role === 'root' || role === 'admin' || role === 'engineer') {
      isEngineer = true;
    }
    console.log(role, isAdmin, isEngineer, isSenior);

    return {
      first_name,
      last_name,
      username,
      role,
      isAdmin,
      isEngineer,
      isSenior
    };
  }

  return { username: '', role: '' };
};
export default Auth;
