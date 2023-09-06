import axios from 'axios';
import queryString from 'query-string';
import { FinancialServiceInterface, FinancialServiceGetQueryInterface } from 'interfaces/financial-service';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFinancialServices = async (
  query?: FinancialServiceGetQueryInterface,
): Promise<PaginatedInterface<FinancialServiceInterface>> => {
  const response = await axios.get('/api/financial-services', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFinancialService = async (financialService: FinancialServiceInterface) => {
  const response = await axios.post('/api/financial-services', financialService);
  return response.data;
};

export const updateFinancialServiceById = async (id: string, financialService: FinancialServiceInterface) => {
  const response = await axios.put(`/api/financial-services/${id}`, financialService);
  return response.data;
};

export const getFinancialServiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-services/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialServiceById = async (id: string) => {
  const response = await axios.delete(`/api/financial-services/${id}`);
  return response.data;
};
