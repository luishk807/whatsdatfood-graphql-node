import { createJSONWebToken, comparePassword } from 'helpers/login';
import UserRepository from 'repository/users.respository';
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
      role: plainUser.role,
      phone: plainUser.phone,
      first_name: plainUser.first_name,
      last_name: plainUser.last_name,
      status_id: plainUser.status_id,
      dob: plainUser.dob,
      verification: plainUser.verification,
    });
    return {
      success: true,
      token,
    };
  },
};

export default LoginServices;
