/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import prisma from '../server/db/client';

export interface Context {
  req: NextApiRequest | (IncomingMessage & { cookies: NextApiRequestCookies });
  res: NextApiResponse | ServerResponse;
  prisma: PrismaClient;
}

export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest | (IncomingMessage & { cookies: NextApiRequestCookies });
  res: NextApiResponse | ServerResponse;
}): Promise<Context> => {
  return {
    prisma,
    req,
    res,
  };
};
