import axios from 'axios';
const baseurl = 'http://localhost:3000';
const username = localStorage.getItem('username') || '';
const role = localStorage.getItem('role') || '';

export async function getProjects(
  offset: number,
  pageLimit: number,
  name: string,
  username: string,
  role: string
) {
  try {
    const res = await axios.get(
      `${baseurl}/project?username=${username}&role=${role}&offset=${offset}&limit=${pageLimit}` +
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
export async function getAllProjects() {
  try {
    const res = await axios.get(`${baseurl}/project/todoProjects`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    const result = res.data.projects.map((item) => ({
      id: item.id,
      Inhouse_Engineer: item.Inhouse_Engineer,
      Project_Name: item.Project_Name
    }));
    console.log(res.data.projects);
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const getProjectById = async (id) => {
  try {
    const res = await axios.get(`${baseurl}/project/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });

    console.log(res.data.project);
    return res.data.project;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function createProjects(data) {
  try {
    const res = await axios.post(`${baseurl}/project`, data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function updateProject(id, data) {
  console.log(data);
  try {
    const res = await axios.patch(
      `${baseurl}/project`,
      { id, ...data },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProject(id) {
  try {
    const res = await axios.delete(`${baseurl}/project/delete`, {
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

export async function getProjectsCount(
  name = '',
  Project_Id = '',
  Mailed = ''
) {
  try {
    console.log(name, username, role, Project_Id, Mailed);

    const res = await axios.get(
      `${baseurl}/project/count?username=${username}&role=${role}` +
        (name ? `&name=${name}` : '') +
        (Project_Id ? `&Project_Id=${Project_Id}` : '') +
        (Mailed ? `&Mailed=${Mailed}` : ''),
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
