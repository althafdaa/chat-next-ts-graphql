import { checkAuth } from '@/utils/checkAuth';
import { UserInputError } from 'apollo-server-micro';
import { FieldResolver } from 'nexus';
import bcrypt from 'bcryptjs';

export const updatePasswordResolver: FieldResolver<
  'Mutation',
  'updatePassword'
> = async (_parent, args, ctx) => {
  const { newPassword, password, confirmPassword } = args.data;

  if (newPassword.length < 8) throw Error('New password is too short');
  if (password.length < 8) throw Error('Password is too short');

  if (password !== confirmPassword) {
    throw new UserInputError("Your password confirmation doesn't match");
  }
  const userId = await checkAuth(ctx);
  const isAccountExist = await ctx.prisma.user.findUnique({
    where: { id: userId },
  });
  if (!isAccountExist) throw new Error('Account not found');

  const isPasswordMatched = await bcrypt.compare(
    password,
    isAccountExist.password
  );

  if (!isPasswordMatched) throw new Error('Wrong password');
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedData = await ctx.prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { updatedAt: updatedData.updatedAt, message: 'Password changed' };
};
