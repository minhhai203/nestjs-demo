import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(query: any): Promise<User[]> {
    const { minAge = 0, skip = 0, take = 0, name = null } = query;

    let obj: {
      age?: any;
      take?: number;
      skip?: number;
      name?: string;
    } = {};
    let nameObj: { name?: string };

    const hehe = Object.assign(obj, nameObj);

    if (minAge) {
      obj = { age: MoreThanOrEqual(minAge) };
      if (name) {
        obj = hehe;
      }
    }

    if (take || skip) {
      obj = { take: take, skip: skip };
    }
    if (name) {
      obj = nameObj;
    }

    return await this.userRepository.find(obj);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async update(id: number, user: User): Promise<any> {
    return await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<any> {
    const user = await this.userRepository.delete(id);
    if (!user.affected) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return await this.userRepository.delete(id);
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      username,
    });
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }
}
