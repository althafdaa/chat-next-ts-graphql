import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { getMessagesResolver } from '../resolvers/message/getMessages';
import { SendMessageResolver } from '../resolvers/message/sendMessage';

export const Message = objectType({
  name: 'Message',
  definition: (t) => {
    t.nonNull.int('id');
    t.date('createdAt');
    t.nonNull.string('text');
    t.string('receiverId');
    t.string('senderId');
    t.string('type');
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
