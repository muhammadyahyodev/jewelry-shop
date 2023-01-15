import { tokenStub } from '../test/stubs/tokens.stub';
import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  signupAdmin: jest.fn().mockResolvedValue(tokenStub()),
  signupUser: jest.fn().mockResolvedValue(tokenStub()),
  signinAdmin: jest.fn().mockResolvedValue(tokenStub()),
  signinUser: jest.fn().mockResolvedValue(tokenStub()),
  logout: jest.fn().mockResolvedValue(true),
  refreshToken: jest.fn().mockResolvedValue(tokenStub()),
  avtivate: jest.fn().mockResolvedValue(`<h1> Successfully registered </h1>`),
  restriction: jest.fn().mockResolvedValue(userStub()),
  findAllUsers: jest.fn().mockResolvedValue([userStub()]),
  findUserById: jest.fn().mockResolvedValue(userStub()),
  deleteUserById: jest.fn().mockResolvedValue({
    message: `Condidate with id:${userStub().id} deleted`,
  }),
});
