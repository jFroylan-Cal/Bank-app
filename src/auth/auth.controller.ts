import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { LogInDto } from './dto/login-user.dto';
import { ValidRoles } from './enums/valid-roles.enum';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signin')
  async singIn(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.singIn(createAuthDto);
  }

  @Post('login')
  async login(@Body() logInDto: LogInDto) {
    return await this.authService.login(logInDto);
  }

  @Auth(ValidRoles.user, ValidRoles.user)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }
}
