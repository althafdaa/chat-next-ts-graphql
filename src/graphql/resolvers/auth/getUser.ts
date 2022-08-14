import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const getUser: FieldResolver<'Query', 'UserById'> = async (
  _parent,
  _args,
  ctx
) => {
  const userId = await checkAuth(ctx);

  const users = ctx.prisma.user.findUnique({
    where: { id: userId },
  });
  return users;
};
