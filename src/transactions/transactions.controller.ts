import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Auth(ValidRoles.user)
  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ) {
    return this.transactionsService.create(createTransactionDto, user);
  }

  @Auth(ValidRoles.user, ValidRoles.admin)
  @Get(':id')
  async findTransaction(@Param('id') id: number) {
    return await this.transactionsService.findTransaction(+id);
  }

  @Auth(ValidRoles.admin)
  @Get('/accountState/:id')
  async getAccountState(@Param('id') id: number) {
    return await this.transactionsService.getStateAccount(+id);
  }
}
