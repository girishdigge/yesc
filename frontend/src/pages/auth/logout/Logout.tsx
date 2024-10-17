import SignInPage from '../signin';

const Logout = () => {
  localStorage.removeItem('accessToken');

  return <SignInPage />;
};

export default Logout;
