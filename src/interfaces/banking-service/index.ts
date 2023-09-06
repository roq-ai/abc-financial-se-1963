import { CustomerInterface } from 'interfaces/customer';
import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { GetQueryInterface } from 'interfaces';

export interface BankingServiceInterface {
  id?: string;
  service_name: string;
  service_details?: string;
  user_id: string;
  financial_service_id: string;
  service_status: string;
  service_start_date?: any;
  service_end_date?: any;
  created_at?: any;
  updated_at?: any;
  customer?: CustomerInterface[];
  user?: UserInterface;
  financial_service?: FinancialServiceInterface;
  _count?: {
    customer?: number;
  };
}

export interface BankingServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  service_name?: string;
  service_details?: string;
  user_id?: string;
  financial_service_id?: string;
  service_status?: string;
}
