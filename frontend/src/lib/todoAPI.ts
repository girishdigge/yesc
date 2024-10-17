import axios from 'axios';
const baseurl = 'http://localhost:3000';
const username = localStorage.getItem('username') || '';
const role = localStorage.getItem('role') || '';
export async function getTodos(
  offset: number,
  pageLimit: number,
  name: string,
  username: string,
  role: string,
  Project_Id?: string,
  Mailed?: string
) {
  try {
    const res = await axios.get(
      `${baseurl}/todo?username=${username}&role=${role}&offset=${offset}&limit=${pageLimit}` +
        (name ? `&name=${name}` : '') +
        (Project_Id ? `&Project_Id=${Project_Id}` : '') +
        (Mailed ? `&Mailed=${Mailed}` : ''),
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
export const getTodoById = async (id) => {
  try {
    const res = await axios.get(`${baseurl}/todo/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    return res.data.todo;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function createTodos(data) {
  console.log(data);

  try {
    const res = await axios.post(`${baseurl}/todo`, data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function updateTodo(id, data) {
  console.log(data);

  try {
    const res = await axios.patch(
      `${baseurl}/todo`,
      { id, ...data },
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
export async function deleteTodo(id) {
  try {
    const res = await axios.delete(`${baseurl}/todo/delete`, {
      data: { id },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodosCount(name = '', Status = '', Mailed = '') {
  try {
    const res = await axios.get(
      `${baseurl}/todo/count?username=${username}&role=${role}` +
        (name ? `&name=${name}` : '') +
        (Status ? `&Status=${Status}` : '') +
        (Mailed ? `&Mailed=${Mailed}` : ''),
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
