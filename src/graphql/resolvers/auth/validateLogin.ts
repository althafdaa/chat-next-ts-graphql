import { verifyToken } from '@/utils/jwt';
import { AuthenticationError } from 'apollo-server-micro';
import { FieldResolver } from 'nexus';
import nookies from 'nookies';

export const validateLoginResolver: FieldResolver<
  'Query',
  'validateLogin'
> = async (_parent, _args, ctx) => {
  try {
    const cookies = nookies.get({ req: ctx.req });
    const token = cookies.token || null;
    if (!token) throw new AuthenticationError("You're not authorized");
    const verifiedToken = await verifyToken(token);

    return {
      isLoggedIn: true,
      userName: verifiedToken.userName,
    };
  } catch (err) {
    return {
      isLoggedIn: false,
    };
  }
};
