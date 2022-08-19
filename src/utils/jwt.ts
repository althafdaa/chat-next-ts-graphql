import jwt, { JwtPayload } from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  console.warn('NO JWT SECRET');
}

export const createToken = (payload: object, options: jwt.SignOptions) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      options,
      (err, encoded) => {
        if (err) return reject(err);
        else return resolve(encoded as string);
      }
    );
  });
};

export const verifyToken = (payload: string) => {
  return new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(payload, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) return reject(err);
      else return resolve(decoded as JwtPayload);
    });
  });
};
