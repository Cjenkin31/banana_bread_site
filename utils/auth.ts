import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (token: string) => {
  try {
    if (JWT_SECRET) {
      return jwt.verify(token, JWT_SECRET as Secret);
    }
    return null;
  } catch (e) {
    return null;
  }
};
