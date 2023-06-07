import { IsString, MaxLength } from 'class-validator';

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
}
