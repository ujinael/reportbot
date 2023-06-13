import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save({ ...createUserDto });
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          reason: '',
          errorText: (<Error>error).message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(
        {
          reason: '',
          errorText: (<Error>error).message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOneTelegramId(telegramId: number) {
    try {
      return await this.usersRepository.findOneBy({ telegramId });
    } catch (error) {
      throw new HttpException(
        {
          reason: '',
          errorText: (<Error>error).message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
