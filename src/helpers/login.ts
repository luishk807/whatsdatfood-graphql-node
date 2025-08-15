import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NotAuthorized } from 'graphql/customErrors';
import { User } from 'interfaces/user';
import cookie, { parse } from 'cookie';
import { _get } from 'helpers';
import { buildUserResponse } from 'helpers/users.sequelize';
import { dbAliases } from 'db';

export const createJSONWebToken = (obj: any) => {
  const env_token: string | undefined = process.env.ACCESS_TOKEN_SECRET || '';

  if (!env_token) {
    throw new Error('ERROR: missing access token');
  }

  return jwt.sign(obj, env_token, {
    expiresIn: '1h',
  });
};

export const createHashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

export const comparePassword = async (password1: string, password2: string) => {
  return bcrypt.compare(password1, password2);
};

export const authenticate = (req: any) => {
  if (!req || !req.headers || !req.headers.cookie) {
    return null;
  }
  if (!req.headers.cookie) {
    return null;
  }

  const cookies = parse(req.headers.cookie);
  const token = _get(cookies, 'token');

  if (!token) {
    throw new NotAuthorized('not authorized');
  }

  const env_token: string | undefined = process.env.ACCESS_TOKEN_SECRET || '';

  try {
    const decoded = jwt.verify(token, env_token) as JwtPayload;

    if (!decoded) {
      return null;
    }

    const user = buildUserResponse(decoded as User);
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    return null;
  }
};
