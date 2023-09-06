import { CustomerInterface } from 'interfaces/customer';
import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { GetQueryInterface } from 'interfaces';

export interface InsurancePolicyInterface {
  id?: string;
  policy_name: string;
  policy_details?: string;
  user_id: string;
  financial_service_id: string;
  policy_status: string;
  policy_start_date?: any;
  policy_end_date?: any;
  created_at?: any;
  updated_at?: any;
  customer?: CustomerInterface[];
  user?: UserInterface;
  financial_service?: FinancialServiceInterface;
  _count?: {
    customer?: number;
  };
}

export interface InsurancePolicyGetQueryInterface extends GetQueryInterface {
  id?: string;
  policy_name?: string;
  policy_details?: string;
  user_id?: string;
  financial_service_id?: string;
  policy_status?: string;
}
