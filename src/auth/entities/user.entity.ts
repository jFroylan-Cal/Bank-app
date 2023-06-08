import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'User_intId', type: 'int' })
  id: number;

  @Column({ name: 'User_strName', type: 'varchar', length: 32 })
  name: string;

  @Column({ name: 'User_strLastName', type: 'varchar', length: 32 })
  lastName: string;

  @Column({ name: 'User_strAddress', type: 'varchar', length: 32 })
  address: string;

  @Column({
    name: 'User_strAccount',
    type: 'varchar',
    length: 32,
    unique: true,
  })
  account: string;

  @Column({ name: 'User_strPassword', type: 'varchar' })
  password: string;

  @Column({ name: 'User_strPhone', type: 'varchar', length: 16 })
  phone: string;

  @Column({ name: 'User_strESignature', type: 'varchar', length: 20 })
  eSignature: string;

  @Column({ name: 'User_dtmDateRegistration', type: 'date' })
  dateRegistration: string;

  @Column({
    name: 'User_strRol',
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column({ name: 'User_BoolStatus', type: 'bool', default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
