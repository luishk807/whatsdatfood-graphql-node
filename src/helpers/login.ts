import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NotAuthorized } from 'graphql/customErrors';
import { UserType } from 'types';
import cookie from 'cookie';
import { _get } from 'helpers';

export const createJSONWebToken = (obj: any) => {
  const env_token: string | undefined = process.env.ACCESS_TOKEN_SECRET || '';
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
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

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
      status_id: decoded.status_id,
      role: decoded.role,
      verification: decoded.verification,
      dob: new Date(decoded.dob),
    };
    return user;
  } catch (err) {
    return null;
  }
};
