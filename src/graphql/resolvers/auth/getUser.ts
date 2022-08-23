import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const getUser: FieldResolver<'Query', 'UserById'> = async (
  _parent,
  args,
  ctx
) => {
  const { data } = args;
  const userId = await checkAuth(ctx);

  if (data?.id) {
    const users = ctx.prisma.user.findUnique({
      where: { id: data?.id },
    });

    return users;
  } else {
    const users = ctx.prisma.user.findUnique({
      where: { id: userId },
    });

    return users;
  }
};
