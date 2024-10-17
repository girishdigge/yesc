import axios from 'axios';
const baseurl = 'http://localhost:3000';

export async function getClients(
  offset: number,
  pageLimit: number,
  name: string
) {
  try {
    const res = await axios.get(
      `${baseurl}/client?offset=${offset}&limit=${pageLimit}` +
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
export async function getAllClients() {
  try {
    const res = await axios.get(`${baseurl}/client/projectClients`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    const result = res.data.clients.map((item) => ({
      id: item.id,
      full_name: `${item.first_name} ${item.middle_name} ${item.last_name}`
    }));
    console.log(res.data.clients);
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const getClientById = async (id) => {
  try {
    const res = await axios.get(`${baseurl}/client/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    console.log(res.data.client);
    return res.data.client;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function createClients(values) {
  try {
    const res = await axios.post(`${baseurl}/client`, values, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function updateClient(id, values) {
  try {
    const res = await axios.patch(
      `${baseurl}/client`,
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
export async function deleteClient(id) {
  try {
    const res = await axios.patch(
      `${baseurl}/client/delete`,
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
