import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { InsurancePolicyInterface } from 'interfaces/insurance-policy';
import { BankingServiceInterface } from 'interfaces/banking-service';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  user_id: string;
  financial_service_id: string;
  insurance_policy_id: string;
  banking_service_id: string;
  customer_status: string;
  customer_start_date?: any;
  customer_end_date?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  financial_service?: FinancialServiceInterface;
  insurance_policy?: InsurancePolicyInterface;
  banking_service?: BankingServiceInterface;
  _count?: {};
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  financial_service_id?: string;
  insurance_policy_id?: string;
  banking_service_id?: string;
  customer_status?: string;
}
