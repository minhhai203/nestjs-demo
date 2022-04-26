/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AccountLogin {
  @Column()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  provider: string;

  @Column()
  @PrimaryColumn()
  @ApiProperty()
  id: string;
}
