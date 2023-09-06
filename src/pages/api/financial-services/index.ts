import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { financialServiceValidationSchema } from 'validationSchema/financial-services';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFinancialServices();
    case 'POST':
      return createFinancialService();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFinancialServices() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.financial_service
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'financial_service'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createFinancialService() {
    await financialServiceValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.banking_service?.length > 0) {
      const create_banking_service = body.banking_service;
      body.banking_service = {
        create: create_banking_service,
      };
    } else {
      delete body.banking_service;
    }
    if (body?.customer?.length > 0) {
      const create_customer = body.customer;
      body.customer = {
        create: create_customer,
      };
    } else {
      delete body.customer;
    }
    if (body?.insurance_policy?.length > 0) {
      const create_insurance_policy = body.insurance_policy;
      body.insurance_policy = {
        create: create_insurance_policy,
      };
    } else {
      delete body.insurance_policy;
    }
    if (body?.nps?.length > 0) {
      const create_nps = body.nps;
      body.nps = {
        create: create_nps,
      };
    } else {
      delete body.nps;
    }
    const data = await prisma.financial_service.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
