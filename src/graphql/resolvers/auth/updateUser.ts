import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const updateUserResolver: FieldResolver<
  'Mutation',
  'updatedProfile'
> = async (_parent, args, ctx) => {
  const { userName } = args.data || {};
  const userId = await checkAuth(ctx);

  if (!userName) throw new Error("Username can't be empty");

  const updateUser = await ctx.prisma.user.update({
    where: { id: userId },
    data: { userName: userName },
  });

  const response = {
    updatedAt: updateUser.updatedAt,
    userName: updateUser.userName,
  };

  return response;
};
