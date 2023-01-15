import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

jest.mock('../user.service');
describe('user controller', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService, JwtService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined usersController', () => {
    expect(userController).toBeDefined();
  });

  it('should be defined usersService', () => {
    expect(userService).toBeDefined();
  });
});
