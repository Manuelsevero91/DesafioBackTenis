import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenisService } from './tenis.service';
import { Profesor } from './entities/profesor.entity'; 
import { TenisController } from './tenis.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesor]), 
  ],
  controllers: [TenisController],
  providers: [TenisService],
})
export class TenisModule {}