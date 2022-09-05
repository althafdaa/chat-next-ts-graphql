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

export const getUserByUsername: FieldResolver<
  'Mutation',
  'UserByUsername'
> = async (_parent, args, ctx) => {
  const { data } = args;
  const userId = await checkAuth(ctx);

  if (data?.userName) {
    const user = await ctx.prisma.user.findUnique({
      where: { userName: data?.userName },
    });

    if (!user) throw new Error('User not found');
    if (user?.id === userId) throw new Error("You can't search yourself");

    const followings = await ctx.prisma.follow.findMany({
      where: { followerId: user.id },
    });

    const searchedFollowers = await ctx.prisma.follow.findMany({
      where: { followingId: user.id },
    });

    const isFollowed = searchedFollowers.some((item) => {
      return item.followerId.includes(userId);
    });

    return {
      ...user,
      followings,
      followers: searchedFollowers,
      followed: isFollowed,
    };
  }

  return null;
};
