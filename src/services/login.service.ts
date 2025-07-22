import { createJSONWebToken, comparePassword } from 'helpers/login';
import UserRepository from 'repository/users.respository';
import { _get } from 'helpers';
import { dbAliases } from 'db';
const UserRepo = new UserRepository();

const LoginServices = {
  async login(username: string, password: string) {
    const user = await UserRepo.findUserByUsername(username);

    if (!user) {
      throw new Error('Invalid email and password');
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email and password');
    }

    const plainUser = user.get({ plain: true });

    const token = createJSONWebToken({
      id: plainUser.id,
      email: plainUser.email,
      username: plainUser.username,
      role_id: plainUser.role_id,
      phone: plainUser.phone,
      first_name: plainUser.first_name,
      last_name: plainUser.last_name,
      status_id: plainUser.status_id,
      dob: plainUser.dob,
      verification: plainUser.verification,
      createdAt: _get(plainUser, 'createdAt'),
      updatedAt: _get(plainUser, 'updatedAt'),
      // [dbAliases.users.userSearches]: _get(
      //   plainUser,
      //   dbAliases.users.userSearches,
      //   [],
      // ),
      // [dbAliases.users.userRatings]: _get(
      //   plainUser,
      //   dbAliases.users.userRatings,
      //   [],
      // ),
      [dbAliases.users.status]: _get(plainUser, dbAliases.users.status),
      [dbAliases.users.userRole]: _get(plainUser, dbAliases.users.userRole),
    });
    return {
      success: true,
      token,
    };
  },
};

export default LoginServices;
