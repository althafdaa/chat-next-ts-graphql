import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const followPeopleResolver: FieldResolver<
  'Mutation',
  'followPeople'
> = async (_parent, args, ctx) => {
  const { followingId } = args.data;
  const userId = await checkAuth(ctx);

  const followPeople = await ctx.prisma.follow.create({
    data: { followerId: userId, followingId },
  });

  return followPeople;
};
