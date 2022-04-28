/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('Api Get User Cac Thu', () => {
  let userService: UserService;

  const mockUserValue = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Dang Minh Hai 1',
                username: 'hai1',
                password: '123',
                email: 'hehe@haha.com',
                address: 'Bac Giang',
                age: 22,
                isActive: true,
              },
              {
                id: 2,
                name: 'Dang Minh Hai 2',
                username: 'hai2',
                password: '123',
                email: 'hehe@haha.com',
                address: 'Bac Giang',
                age: 20,
                isActive: true,
              },
            ]),
            getOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                name: 'Dang Minh Hai 1',
                username: 'hai1',
                password: '123',
                email: 'hehe@haha.com',
                address: 'Bac Giang',
                age: 22,
                isActive: true,
              }),
            ),
            insertOne: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 'a id', ...user }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
            queryAllUser: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockUserValue)
      .compile();

    userService = app.get<UserService>(UserService);
  });

  it('should be difined', () => {
    expect(userService).toBeDefined();
  });

  it('should be create user', () => {
    expect(
      userService.create({
        id: 1,
        name: 'Dang Minh Hai 1',
        username: 'hai1',
        password: '123',
        email: 'hehe@haha.com',
        address: 'Bac Giang',
        age: 22,
        isActive: true,
      }),
    ).toEqual({
      id: 1,
      name: 'Dang Minh Hai 1',
      username: 'hai1',
      password: '123',
      email: 'hehe@haha.com',
      address: 'Bac Giang',
      age: 22,
      isActive: true,
    });
    expect(mockUserValue.create).toHaveBeenCalled();
  });
});
