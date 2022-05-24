/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('Api Get User Cac Thu', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUserValue = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    findAll: jest.fn().mockRejectedValue([
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
    findOneById: jest.fn().mockResolvedValue((id: number) =>
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
            // getOne: jest.fn().mockImplementation((id: string) =>
            getOne: jest.fn().mockResolvedValue((id: number) =>
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
    // userRepository = app.get<Repository<User>>
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

  it('should be find all user hehe', () => {
    const query = {};
    const users = userService.findAll(query);
    expect(users).resolves.toEqual(mockUserValue.findAll);
  });

  // it('should be return user with id = 1', async () => {
  //   const repo = jest.spyOn(userRepository, 'findOne');
  //   await expect(userService.findOne(1)).resolves.toEqual(
  //     mockUserValue.findOneById,
  //   );
  //   expect(repo).toBeCalledWith({
  //     id: 1,
  //     name: 'Dang Minh Hai 1',
  //     username: 'hai1',
  //     password: '123',
  //     email: 'hehe@haha.com',
  //     address: 'Bac Giang',
  //     age: 22,
  //     isActive: true,
  //   });
  // });
});
