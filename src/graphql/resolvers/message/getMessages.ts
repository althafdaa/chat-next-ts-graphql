import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const getMessagesResolver: FieldResolver<
  'Query',
  'msgBetweenUser'
> = async (_parent, args, ctx) => {
  const { receiverId } = args.data;
  const userId = await checkAuth(ctx);

  const messages = await ctx.prisma.message.findMany({
    where: {
      OR: [
        { receiverId, senderId: userId },
        { receiverId: userId, senderId: receiverId },
      ],
    },
  });

  return messages;
};
