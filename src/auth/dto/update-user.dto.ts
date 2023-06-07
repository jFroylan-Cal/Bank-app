import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-user.dto';
import { IsBoolean } from 'class-validator'

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @IsBoolean()
    isActive: boolean;
}
