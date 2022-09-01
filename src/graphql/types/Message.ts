import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { getMessagesResolver } from '../resolvers/message/getMessages';
import { SendMessageResolver } from '../resolvers/message/sendMessage';
import { User } from './User';

export const Message = objectType({
  name: 'Message',
  definition: (t) => {
    t.nonNull.int('id');
    t.date('createdAt');
    t.nonNull.string('text');
    t.string('receiverId');
    t.string('senderId');
    t.string('type');
    t.field('receiver', {
      type: User,
      resolve: async (parent, _args, ctx) => {
        const { receiverId } = parent;
        if (!receiverId) return null;
        return await ctx.prisma.user.findUnique({ where: { id: receiverId } });
      },
    });
  },
});

export const MessageInput = inputObjectType({
  name: 'MessageInput',
  definition: (t) => {
    t.nonNull.string('text');
    t.nonNull.string('receiverId');
  },
});

export const sendMessage = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('sendMessage', {
      type: Message,
      args: { data: nonNull(MessageInput) },
      resolve: SendMessageResolver,
    });
  },
});

export const msgBetweenUserInput = inputObjectType({
  name: 'msgBetweenUserInput',
  definition: (t) => {
    t.nonNull.string('receiverId');
  },
});

export const msgBetweenUser = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('msgBetweenUser', {
      type: Message,
      args: { data: nonNull(msgBetweenUserInput) },
      resolve: getMessagesResolver,
    });
  },
});
