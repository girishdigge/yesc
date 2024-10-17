import axios from 'axios';
const baseurl = 'http://localhost:3000';

export async function login(data) {
  try {
    const res = await axios.post(`${baseurl}/auth`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export async function logout(data) {
  try {
    const res = await axios.post(`${baseurl}/auth/logout`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export const refresh = async () => {
  try {
    const res = await axios.get(`${baseurl}/auth/refresh`);

    console.log(res.data.user);
    return res.data.user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
