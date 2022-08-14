import { checkAuth } from '@/utils/checkAuth';
import { FieldResolver } from 'nexus';

export const SendMessageResolver: FieldResolver<
  'Mutation',
  'sendMessage'
> = async (_parent, args, ctx) => {
  const senderId = await checkAuth(ctx);
  const { text, receiverId } = args.data;

  if (!text) throw new Error('Empty string');
  if (!receiverId || !senderId) throw new Error('Something went wrong');

  const message = ctx.prisma.message.create({
    data: { text, senderId, receiverId },
  });

  return message;
};
