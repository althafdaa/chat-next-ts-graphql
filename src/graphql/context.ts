/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import prisma from '../server/db/client';

export interface Context {
  req: MicroRequest;
  res: ServerResponse;
  prisma: PrismaClient;
}

export const createContext = async ({
  req,
  res,
}: {
  req: MicroRequest;
  res: ServerResponse;
}): Promise<Context> => {
  return {
    prisma,
    req,
    res,
  };
};
