import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  console.warn('NO JWT SECRET');
}

export const createToken = (payload: object, options: jwt.SignOptions) => {
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
    jwt.verify(payload, process.env.JWT_SECRET as string, (err, encoded) => {
      if (err) return reject(err);
      else return resolve(encoded as string);
    });
  });
};
