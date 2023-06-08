import { IsString, MaxLength } from 'class-validator';
import { ValidRoles } from '../enums/valid-roles.enum';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  account: string;

  @IsString()
  password: string;

  @IsString()
  @MaxLength(16)
  phone: string;

  @IsString()
  roles: string[];
}
