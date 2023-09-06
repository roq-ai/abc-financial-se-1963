import { BankingServiceInterface } from 'interfaces/banking-service';
import { CustomerInterface } from 'interfaces/customer';
import { InsurancePolicyInterface } from 'interfaces/insurance-policy';
import { NpsInterface } from 'interfaces/nps';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FinancialServiceInterface {
  id?: string;
  description?: string;
  service_type?: string;
  service_status?: string;
  creation_date?: any;
  last_updated?: any;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  banking_service?: BankingServiceInterface[];
  customer?: CustomerInterface[];
  insurance_policy?: InsurancePolicyInterface[];
  nps?: NpsInterface[];
  user?: UserInterface;
  _count?: {
    banking_service?: number;
    customer?: number;
    insurance_policy?: number;
    nps?: number;
  };
}

export interface FinancialServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  service_type?: string;
  service_status?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
