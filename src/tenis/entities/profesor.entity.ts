import { Entity, Column, PrimaryGeneratedColumn, Unique, DeleteDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
@Entity({ name: 'profesor' })
@Unique(['name'])
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;
  @Column()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  mail: string;
  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  alias: string;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}










