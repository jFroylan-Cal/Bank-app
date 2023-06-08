import { IsEnum, IsNumber, IsString } from 'class-validator';
import { OperationType } from '../enum/operationType.enum';

export class CreateTransactionDto {
  @IsString()
  bankAccount: string;

  @IsEnum(OperationType)
  operationType: OperationType;

  @IsNumber()
  amount: number;

  @IsString()
  concept: string;
}
