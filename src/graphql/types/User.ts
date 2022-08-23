import {
  extendType,
  inputObjectType,
  nonNull,
  nullable,
  objectType,
} from 'nexus';
import { loginResolver } from '../resolvers/auth/login';
import { registerResolver } from '../resolvers/auth/register';
import { getUsers } from '../resolvers/auth/getUsers';
import { getUser } from '../resolvers/auth/getUser';
import { Follow } from './Follow';
import { validateLoginResolver } from '../resolvers/auth/validateLogin';
import { destroyCookie } from 'nookies';
import { checkAuth } from '@/utils/checkAuth';
import { updateUserResolver } from '../resolvers/auth/updateUser';

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
    t.nullable.string('id');
  },
});

export const UserById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('UserById', {
      type: User,
      args: { data: nullable(UserByIdInput) },
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

export const validateLoginResponse = objectType({
  name: 'ValidateLogin',
  definition: (t) => {
    t.boolean('isLoggedIn');
    t.string('userName');
  },
});

export const validateLogin = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('validateLogin', {
      type: validateLoginResponse,
      resolve: validateLoginResolver,
    });
  },
});

export const LogoutResponse = objectType({
  name: 'LogoutResponse',
  definition: (t) => {
    t.string('id');
    t.string('userName');
    t.string('message');
  },
});

export const logout = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('logout', {
      type: LogoutResponse,
      resolve: async (_parent, _args, ctx) => {
        const userId = await checkAuth(ctx);
        const user = await ctx.prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user) throw new Error("User doesn't exist");
        destroyCookie({ res: ctx.res }, 'token', {
          path: '/',
        });
        return {
          id: userId,
          userName: user.userName,
          message: 'Logout success',
        };
      },
    });
  },
});

export const updatedUserResponse = objectType({
  name: 'UpdatedUser',
  definition: (t) => {
    t.date('updatedAt');
    t.string('userName');
  },
});

export const updateUserPayload = inputObjectType({
  name: 'payload',
  definition: (t) => {
    t.nullable.string('userName');
  },
});

export const updateUser = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updatedProfile', {
      type: updatedUserResponse,
      args: { data: nonNull(updateUserPayload) },
      resolve: updateUserResolver,
    });
  },
});
