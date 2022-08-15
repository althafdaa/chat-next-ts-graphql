import { objectType, extendType, inputObjectType, nonNull } from 'nexus';
import {
  followPeopleResolver,
  unFollowPeopleResolver,
} from '../resolvers/following/followPeople';
import { getFollowingResolver } from '../resolvers/following/getFollowing';
import { User } from './User';

export const Follow = objectType({
  name: 'Follow',
  definition: (t) => {
    t.nonNull.string('id');
    t.date('createdAt');
    t.string('followerId');
    t.nonNull.string('followingId');
    t.field('user', {
      type: User,
      resolve: (parent, _args, ctx) => {
        const { followingId } = parent;

        return ctx.prisma.user.findUnique({ where: { id: followingId } });
      },
    });
    t.string('following');
  },
});

export const getFollowing = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('getFollowing', {
      type: Follow,
      resolve: getFollowingResolver,
    });
  },
});

export const followPeopleInput = inputObjectType({
  name: 'followPeopleInput',
  definition: (t) => {
    t.nonNull.string('followingId');
  },
});

export const followPeople = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('followPeople', {
      type: Follow,
      args: { data: nonNull(followPeopleInput) },
      resolve: followPeopleResolver,
    });
  },
});

export const unFollow = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('unFollow', {
      type: Follow,
      args: { data: nonNull(followPeopleInput) },
      resolve: unFollowPeopleResolver,
    });
  },
});
