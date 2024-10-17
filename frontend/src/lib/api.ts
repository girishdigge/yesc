import axios from 'axios';
const baseurl = 'http://localhost:3000';

export async function getEmployees(
  offset: number,
  pageLimit: number,
  name: string
) {
  try {
    const res = await axios.get(
      `${baseurl}/user?offset=${offset}&limit=${pageLimit}` +
        (name ? `&name=${name}` : ''),
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getEngineers() {
  try {
    const res = await axios.get(`${baseurl}/user/engineers`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    const result = res.data.employees.map((item) => ({
      id: item.id,
      full_name: `${item.first_name} ${item.middle_name} ${item.last_name}`,
      username: item.username
    }));
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getSeniors() {
  try {
    const res = await axios.get(`${baseurl}/user/seniors`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    const result = res.data.employees.map((item) => ({
      id: item.id,
      full_name: `${item.first_name} ${item.middle_name} ${item.last_name}`,
      username: item.username
    }));
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const getEmployeeById = async (id) => {
  try {
    const res = await axios.get(`${baseurl}/user/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    console.log(res.data.user);
    return res.data.user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function createEmployees(values) {
  try {
    const res = await axios.post(`${baseurl}/user`, values, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function updateEmployee(id, values) {
  try {
    const res = await axios.patch(
      `${baseurl}/user`,
      { id, ...values },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteEmployee(id) {
  try {
    const res = await axios.patch(
      `${baseurl}/user/delete`,
      { id },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}
