import { createHashPassword, createJSONWebToken } from 'helpers/login';
import UserRepository from 'repository/users.respository';
const UserRepo = new UserRepository();

const LoginServices = {
  async login(email: string, password: string) {
    const has_password = await createHashPassword(password);
    const foundUser = UserRepo.findUserByPassword(email, has_password);

    if (!foundUser) {
      throw new Error('Invalid email and password');
    }

    const token = createJSONWebToken(foundUser);
    return token;
  },
};

export default LoginServices;
