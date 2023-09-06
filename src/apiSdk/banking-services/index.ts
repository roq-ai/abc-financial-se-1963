import axios from 'axios';
import queryString from 'query-string';
import { BankingServiceInterface, BankingServiceGetQueryInterface } from 'interfaces/banking-service';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBankingServices = async (
  query?: BankingServiceGetQueryInterface,
): Promise<PaginatedInterface<BankingServiceInterface>> => {
  const response = await axios.get('/api/banking-services', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBankingService = async (bankingService: BankingServiceInterface) => {
  const response = await axios.post('/api/banking-services', bankingService);
  return response.data;
};

export const updateBankingServiceById = async (id: string, bankingService: BankingServiceInterface) => {
  const response = await axios.put(`/api/banking-services/${id}`, bankingService);
  return response.data;
};

export const getBankingServiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/banking-services/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBankingServiceById = async (id: string) => {
  const response = await axios.delete(`/api/banking-services/${id}`);
  return response.data;
};
