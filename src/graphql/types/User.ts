import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { loginResolver } from '../resolvers/auth/login';
import { registerResolver } from '../resolvers/auth/register';
import { getUsers } from '../resolvers/auth/getUsers';
import { getUser } from '../resolvers/auth/getUser';
import { Follow } from './Follow';

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.nonNull.string('id');
    t.date('createdAt');
    t.string('email');
    t.string('firstName');
    t.string('lastName');
    t.string('userName');
    t.list.field('following', {
      type: Follow,
      resolve: (parent, _args, ctx) => {
        const { id } = parent;
        return ctx.prisma.follow.findMany({ where: { followerId: id } });
      },
    });
  },
});

export const UserByIdInput = inputObjectType({
  name: 'UserByIdInput',
  definition: (t) => {
    t.nonNull.string('id');
  },
});

export const UserById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('UserById', {
      type: User,
      args: { data: nonNull(UserByIdInput) },
      resolve: getUser,
    });
  },
});

export const Users = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('Users', {
      type: User,
      resolve: getUsers,
    });
  },
});

export const RegisterInput = inputObjectType({
  name: 'RegisterInput',
  definition: (t) => {
    t.nonNull.string('email');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('userName');
    t.nonNull.string('password');
    t.nonNull.string('confirmPassword');
  },
});

export const registerUser = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('registerUser', {
      type: User,
      args: {
        data: nonNull(RegisterInput),
      },
      resolve: registerResolver,
    });
  },
});

export const LoginResponse = objectType({
  name: 'LoginResponse',
  definition: (t) => {
    t.date('createdAt');
    t.string('id');
    t.string('token');
    t.string('userName');
    t.string('firstName');
    t.string('lastName');
  },
});

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition: (t) => {
    t.nonNull.string('userName');
    t.nonNull.string('password');
  },
});

export const loginUser = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('loginUser', {
      type: LoginResponse,
      args: { data: nonNull(LoginInput) },
      resolve: loginResolver,
    });
  },
});
