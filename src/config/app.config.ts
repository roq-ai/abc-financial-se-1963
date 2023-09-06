interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Financial Advisor'],
  customerRoles: ['Customer'],
  tenantRoles: ['Financial Advisor', 'Insurance Agent', 'Banking Service Provider'],
  tenantName: 'Financial Service',
  applicationName: 'ABC Financial Services System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View details of Financial Service',
    'Search for specific Financial Service',
    'View NPS for each Financial Service',
  ],
  ownerAbilities: [
    'Manage Financial Services',
    'Invite Insurance Agent and Banking Service Provider',
    'Assign and Unassign Financial Services to Customers',
    'Manage NPS for each Financial Service',
  ],
};
