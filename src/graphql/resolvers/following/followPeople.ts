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

export const unFollowPeopleResolver: FieldResolver<
  'Mutation',
  'unFollow'
> = async (_parent, args, ctx) => {
  const { followingId } = args.data;
  const userId = await checkAuth(ctx);

  const findPeople = await ctx.prisma.follow.findFirst({
    where: { AND: [{ followerId: userId }, { followingId }] },
  });

  if (!findPeople) throw new Error("You're not following in the first place");

  const unfollow = await ctx.prisma.follow.delete({
    where: { id: findPeople.id },
  });

  return unfollow;
};
