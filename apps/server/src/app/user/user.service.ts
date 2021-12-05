/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    createUserDto.password = await this.hashPassword(createUserDto.password);
    Object.assign(user, createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findByUserName(userName: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ userName });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
