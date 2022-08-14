import { FieldResolver } from 'nexus';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-micro';
import { createToken } from '@/utils/jwt';

export const loginResolver: FieldResolver<'Mutation', 'loginUser'> = async (
  _parent,
  args,
  ctx
) => {
  const { userName, password } = args.data;
  const isAccountExist = await ctx.prisma.user.findUnique({
    where: { userName },
  });

  if (password.length < 8) {
    throw Error('Password is too short');
  }

  if (!isAccountExist) {
    throw new AuthenticationError("Username doesn't exist");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isAccountExist.password
  );
  if (!isPasswordMatched) throw new AuthenticationError('Wrong password');

  const encodedTokens = (await createToken(
    { userId: isAccountExist.id },
    { expiresIn: '12h' }
  )) as string;

  return {
    token: encodedTokens,
    userName: isAccountExist.userName,
    id: isAccountExist.id,
    createdAt: isAccountExist.createdAt,
    firstName: isAccountExist.firstName,
    lastName: isAccountExist.lastName,
  };
};
