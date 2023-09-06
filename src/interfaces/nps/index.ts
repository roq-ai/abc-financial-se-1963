import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { GetQueryInterface } from 'interfaces';

export interface NpsInterface {
  id?: string;
  score: number;
  user_id: string;
  financial_service_id: string;
  nps_date?: any;
  nps_status: string;
  nps_comment?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  financial_service?: FinancialServiceInterface;
  _count?: {};
}

export interface NpsGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  financial_service_id?: string;
  nps_status?: string;
  nps_comment?: string;
}
