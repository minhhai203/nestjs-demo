import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ example: 'Your Name hehe ' })
  name: string;

  @Column()
  @ApiProperty({ example: 'your username' })
  username: string;

  @Column()
  @ApiProperty({ example: ' ***** hehe' })
  password: string;

  @Column()
  @ApiProperty({ example: 'hehe@gmail.com' })
  email: string;

  @Column()
  @ApiProperty({ example: 'address...' })
  address: string;

  @Column()
  @ApiProperty({ example: 18 })
  age: number;

  @Column({ default: true })
  @ApiProperty()
  isActive: boolean;
}

export class Account {
  @PrimaryGeneratedColumn()
  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;
}
