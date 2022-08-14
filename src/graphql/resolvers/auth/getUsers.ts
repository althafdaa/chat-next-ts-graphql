import { checkAuth } from '@/utils/checkAuth';

import { FieldResolver } from 'nexus';

export const getUsers: FieldResolver<'Query', 'Users'> = async (
  _parent,
  _args,
  ctx
) => {
  const userId = await checkAuth(ctx);

  const users = ctx.prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    where: { id: { not: userId } },
  });
  return users;
};
