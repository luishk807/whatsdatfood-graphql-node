import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NotAuthorized } from 'graphql/customErrors';
import { UserType } from 'types';
import cookie, { parse } from 'cookie';
import { _get } from 'helpers';
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

    const user: UserType = {
      id: decoded.id,
      username: decoded.username,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      password: decoded.password,
      phone: decoded.phone,
      email: decoded.email,
      createdAt: _get(decoded, 'createdAt'),
      updatedAt: _get(decoded, 'updatedAt'),
      status_id: decoded.status_id,
      role_id: decoded.role_id,
      verification: decoded.verification,
      dob: new Date(decoded.dob),
      [dbAliases.users.status]: _get(decoded, dbAliases.users.status),
      [dbAliases.users.userSearches]: _get(
        decoded,
        dbAliases.users.userSearches,
        [],
      ),
      [dbAliases.users.userRatings]: _get(
        decoded,
        dbAliases.users.userRatings,
        [],
      ),
      [dbAliases.users.userRole]: _get(decoded, dbAliases.users.userRole),
    };
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    return null;
  }
};
