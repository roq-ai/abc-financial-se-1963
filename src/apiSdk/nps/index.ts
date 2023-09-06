import axios from 'axios';
import queryString from 'query-string';
import { NpsInterface, NpsGetQueryInterface } from 'interfaces/nps';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNps = async (query?: NpsGetQueryInterface): Promise<PaginatedInterface<NpsInterface>> => {
  const response = await axios.get('/api/nps', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createNps = async (nps: NpsInterface) => {
  const response = await axios.post('/api/nps', nps);
  return response.data;
};

export const updateNpsById = async (id: string, nps: NpsInterface) => {
  const response = await axios.put(`/api/nps/${id}`, nps);
  return response.data;
};

export const getNpsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/nps/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNpsById = async (id: string) => {
  const response = await axios.delete(`/api/nps/${id}`);
  return response.data;
};
