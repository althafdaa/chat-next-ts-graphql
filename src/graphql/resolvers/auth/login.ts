import { FieldResolver } from 'nexus';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-micro';
import { createToken } from '@/utils/jwt';
import nookies from 'nookies';
import { CookieSerializeOptions } from 'next/dist/server/web/types';

export const loginResolver: FieldResolver<'Mutation', 'loginUser'> = async (
  _parent,
  args,
  ctx
) => {
  const { userName, password } = args.data;
  const isAccountExist = await ctx.prisma.user.findUnique({
    where: { userName },
  });
  if (password.length < 8) throw Error('Password is too short');
  if (!isAccountExist) throw new AuthenticationError("Username doesn't exist");
  const isPasswordMatched = await bcrypt.compare(
    password,
    isAccountExist.password
  );
  if (!isPasswordMatched) throw new AuthenticationError('Wrong password');
  const accessToken = await createToken(
    { userId: isAccountExist.id, userName: isAccountExist.userName },
    { expiresIn: '12h' }
  );

  nookies.set({ res: ctx.res }, 'token', accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    sameSite: true,
    path: '/',
  } as CookieSerializeOptions);

  return {
    token: accessToken,
    userName: isAccountExist.userName,
    id: isAccountExist.id,
    createdAt: isAccountExist.createdAt,
    firstName: isAccountExist.firstName,
    lastName: isAccountExist.lastName,
  };
};
