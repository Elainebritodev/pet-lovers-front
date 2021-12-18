import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PETS_API_URI,
});

const verifyUnauthorizedError = (error) => {
  console.log('ERRO INTERCEPTADO PELO AXIOS!!!!! UHUHUHUHUH');
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/'; // Esse comando dá um RELOAD na página
  }
  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  verifyUnauthorizedError,
); // qualquer request feito pelo axios vai cair no interceptor primeiro.

const setHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const login = async (formData) => {
  const response = await api.post('/auth/login', formData);

  return response.data;
};

export const register = async (formData) => {
  const response = await api.post('/auth/register', formData);

  return response.data;
};

export const getPets = async (searchName, token) => {
  const response = await api.get(`/pet?name=${searchName}`, setHeaders(token));

  return response.data;
};

export const getOnePet = async (petId, token) => {
  const response = await api.get(`/pet/${petId}`, setHeaders(token));

  return response.data;
};

export const createOneNewPet = async (body, token) => {
  const response = await api.post('/pet', body, setHeaders(token));

  return response.data;
};

export const editOnePet = async (petId, body, token) => {
  console.log(token);
  console.log(body);
  console.log(petId);
  const response = await api.put('/pet/61bd46280b46ec49f248349c', body, setHeaders(token));

  return response.data;
};
