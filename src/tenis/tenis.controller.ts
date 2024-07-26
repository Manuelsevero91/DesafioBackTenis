import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TenisService } from './tenis.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { IResponse } from './response.interface';
@Controller('tenis')
export class TenisController {
  constructor(private readonly tenisService: TenisService) {}
  @Post()
  async create(@Body() createProfesorDto: CreateProfesorDto): Promise<IResponse> {
    try {
      return await this.tenisService.create(createProfesorDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get()
  async findAll(): Promise<IResponse> {
    try {
      return await this.tenisService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<IResponse> {
    try {
      return await this.tenisService.findOne(name);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Delete(':name')
  async deleteByName(@Param('name') name: string): Promise<IResponse> {
    try {
      return await this.tenisService.deleteByName(name);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}




