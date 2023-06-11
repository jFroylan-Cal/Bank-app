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
import { OperationType } from './enum/operationType.enum';

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
    const transaction = await this.transactionRepository.find({
      where: { user: { id: id } },
    });
    let totalPayments = 0;
    let totalDeposits = 0;
    let totalTransfers = 0;

    transaction.forEach((element) => {
      if (element.operationType == OperationType.deposit) {
        totalDeposits = element.amount + totalDeposits;
      }
      if (element.operationType == OperationType.payment) {
        totalPayments = element.amount + totalPayments;
      }

      if (element.operationType == OperationType.transfer) {
        totalTransfers = element.amount + totalTransfers;
      }
    });
    return { transaction, totalDeposits, totalPayments, totalTransfers };
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
