import { AuthenticationError } from 'apollo-server-micro';
import { FieldResolver } from 'nexus';
import bcrypt from 'bcryptjs';

export const registerResolver: FieldResolver<
  'Mutation',
  'registerUser'
> = async (_parent, args, ctx) => {
  const { email, firstName, lastName, userName, password, confirmPassword } =
    args.data;

  const checkUser = await ctx.prisma.user.findUnique({
    where: { email },
  });
  if (checkUser) throw new AuthenticationError('Account already exist');

  if (password !== confirmPassword) {
    throw new AuthenticationError(
      "Your password and confirmation doesn't match"
    );
  }

  if (password.length < 8) {
    throw new AuthenticationError(
      'Please user password with minimum 8 characters'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createNewUser = await ctx.prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    },
  });

  return createNewUser;
};
