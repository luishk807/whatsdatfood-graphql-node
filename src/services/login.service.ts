import { createJSONWebToken, comparePassword } from 'helpers/login';
import UserRepository from 'repository/users.respository';
const UserRepo = new UserRepository();

const LoginServices = {
  async login(email: string, password: string) {
    const user = await UserRepo.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email and password');
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email and password');
    }

    const token = createJSONWebToken(user);
    return token;
  },
};

export default LoginServices;
