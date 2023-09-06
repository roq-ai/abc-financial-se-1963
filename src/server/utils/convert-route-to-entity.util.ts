const mapping: Record<string, string> = {
  'banking-services': 'banking_service',
  customers: 'customer',
  'financial-services': 'financial_service',
  'insurance-policies': 'insurance_policy',
  nps: 'nps',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
