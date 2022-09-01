import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const getMessagesResolver: FieldResolver<
  'Query',
  'msgBetweenUser'
> = async (_parent, args, ctx) => {
  const { receiverId } = args.data;
  const userId = await checkAuth(ctx);

  const messages = await ctx.prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      OR: [
        { receiverId, senderId: userId },
        { receiverId: userId, senderId: receiverId },
      ],
    },
  });

  const res = messages.map((item) => {
    if (item.senderId === userId) {
      return { ...item, type: 'sender' };
    }
    return { ...item, type: 'receiver' };
  });

  return res;
};
