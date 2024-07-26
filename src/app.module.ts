import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenisModule } from './tenis/tenis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'Desafio',
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true, 
    }),
    
    TenisModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}