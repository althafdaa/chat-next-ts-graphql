import { PrismaClient } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { verifyToken } from './jwt';

interface Context {
  req: MicroRequest;
  res: ServerResponse;
  prisma: PrismaClient;
}

export const checkAuth = async (ctx: Context): Promise<string> => {
  const auth = ctx.req.headers.authorization;
  if (!auth) throw new ForbiddenError("You're not authorized");
  const { userId }: { userId?: string } = (await verifyToken(auth)) as object;
  if (!userId) throw new ForbiddenError('You must be logged in');

  return userId;
};
