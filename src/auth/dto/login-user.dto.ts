import { IsString } from 'class-validator';
export class LogInDto {
  @IsString()
  account: string;

  @IsString()
  password: string;
}
