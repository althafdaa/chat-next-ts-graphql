import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const getFollowingResolver: FieldResolver<
  'Query',
  'getFollowing'
> = async (_parent, _args, ctx) => {
  const userId = await checkAuth(ctx);
  return ctx.prisma.follow.findMany({ where: { followerId: userId } });
};
