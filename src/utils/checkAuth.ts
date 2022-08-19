import { PrismaClient } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { verifyToken } from './jwt';
import nookies from 'nookies';

interface Context {
  req: MicroRequest;
  res: ServerResponse;
  prisma: PrismaClient;
}

export const checkAuth = async (ctx: Context): Promise<string> => {
  const cookies = nookies.get({ req: ctx.req });
  const token = cookies.token || null;
  if (!token) throw new ForbiddenError("You're not authorized");
  const verifiedToken = await verifyToken(token);

  const { userId } = verifiedToken;

  return userId;
};
