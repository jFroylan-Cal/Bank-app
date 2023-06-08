import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, user: User) {
    const { amount, concept, operationType, bankAccount } =
      createTransactionDto;
    try {
      const transaction = this.transactionRepository.create({
        amount: amount,
        concept: concept,
        operationType: operationType,
        bankAccount: bankAccount,
        user: user,
      });
      await this.transactionRepository.save(transaction);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findTransaction(id: number) {
    const transaction = await this.transactionRepository.findAndCount({
      where: { user: { id: id } },
    });
    return transaction;
  }

  async getStateAccount(id: number) {
    let totalAccount = 0;
    let date: string;
    date = new Date().toISOString();
    const transaction = await this.transactionRepository.find({
      where: { user: { id: id } },
    });
    transaction.forEach((element) => {
      totalAccount = element.amount + totalAccount;
    });

    return { transaction, totalAccount, date };
  }

  private handleErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Check servers errors');
  }
}
