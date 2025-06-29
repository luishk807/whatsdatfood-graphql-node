import jwt, { JwtPayload } from 'jsonwebtoken';
import bycript from 'bcrypt';
import { NotAuthorized } from 'graphql/customErrors';
import { UserType } from 'types';

export const createJSONWebToken = (obj: any) => {
  const env_token: string | undefined = process.env.ACCESS_TOKEN_SECRET || '';
  return jwt.sign(obj, env_token, {
    expiresIn: '1h',
  });
};

export const createHashPassword = async (password: any) => {
  try {
    const saltRounds = 10;
    const salt = await bycript.genSalt(saltRounds);
    const hashedPassword = await bycript.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

export const authenticate = (req: any) => {
  const authheader = req.headers['authorization'];
  if (!authheader) {
    throw new NotAuthorized('not authorized');
  }
  const token: string = authheader.split(' ')[1];

  const env_token: string | undefined = process.env.ACCESS_TOKEN_SECRET || '';

  try {
    const decoded = jwt.verify(token, env_token) as JwtPayload;

    if (!decoded) {
      return null;
    }

    const user: UserType = {
      id: decoded.id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      password: decoded.password,
      phone: decoded.phone,
      email: decoded.email,
      role: decoded.role,
      verification: decoded.verification,
      dob: new Date(decoded.dob),
    };
    return user;
  } catch (err) {
    return null;
  }
};
