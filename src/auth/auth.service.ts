import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-user.dto';
import { LogInDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { generateESignature } from './utilities/e.signature';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(createAuthDto: CreateAuthDto) {
    try {
      let dateCreated: string;
      dateCreated = new Date().toISOString();
      const { password, account, name, lastName, address, phone, roles } =
        createAuthDto;
      const user = this.userRepository.create({
        account: account,
        name: name,
        address: address,
        phone: phone,
        roles: roles,
        dateRegistration: dateCreated,
        eSignature: generateESignature(),
        lastName: lastName,
        password: bcrypt.hashSync(password, 10),
      });
      this.userRepository.save(user);
      return {
        token: this.getJwtToken({ id: user.id }),
        user: {
          account,
          name,
          address,
          phone,
          roles,
          lastName,
          userESignature: user.eSignature,
          id: user.id,
        },
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async login(loginDto: LogInDto) {
    const { account, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { account },
      select: {
        id: true,
        account: true,
        password: true,
        roles: true,
        name: true,
        lastName: true,
        phone: true,
        address: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return { token: this.getJwtToken({ id: user.id }), user };
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const { address, isActive, phone, password } = updateAuthDto;
    const user = await this.userRepository.preload({
      id,
      address,
      isActive,
      phone,
      password,
    });
    user.address = address;
    user.phone = phone;
    user.isActive = isActive;
    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }
    this.userRepository.save(user);
    return user;
  }

  private handleErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Check servers errors');
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
