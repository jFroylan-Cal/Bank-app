import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { OperationType } from '../enum/operationType.enum';

@Entity({ name: 'Transactions' })
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'Transaction_intId' })
  id: number;

  @Column({ name: 'Transaction_strAccount' })
  bankAccount: string;

  @Column({ name: 'Transaction_enumOperation' })
  operationType: OperationType;

  @Column({ name: 'Transaction_intAmount' })
  amount: number;

  @Column({ name: 'Transaction_strConcept' })
  concept: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({name: 'User_intId'})
  user: User;
}
