import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import {Profesor } from './entities/profesor.entity';
import { IResponse } from './response.interface';
@Injectable()
export class TenisService {
  constructor(
    @InjectRepository(Profesor)
    private tenisRepository: Repository<Profesor>,
  ) {}
  async create(createProfesorDto: CreateProfesorDto): Promise<IResponse> {
    try {
      const profesorFound = await this.tenisRepository.findOne({
        where: { name: createProfesorDto.name },
      });
      if (profesorFound) {
        throw new HttpException(
          `El profesor ${profesorFound.name} ya existe en la base de datos`,
          HttpStatus.CONFLICT,
        );
      }
      const newProfesor = this.tenisRepository.create(createProfesorDto);
      const savedProfesor = await this.tenisRepository.save(newProfesor);
      return {
        message: 'Profesor creado exitosamente',
        data: savedProfesor,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(): Promise<IResponse> {
    try {
      const profesores = await this.tenisRepository.find();
      if (!profesores.length)
        throw new HttpException(
          'No existen profesores registrados',
          HttpStatus.NOT_FOUND,
        );
      return {
        message: 'La lista de profesores está compuesta por:',
        data: profesores,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOne(name: string): Promise<IResponse> {
    try {
      const profesor = await this.tenisRepository.findOne({
        where: { name },
      });
      if (!profesor) {
        throw new HttpException(
         `El profesor con nombre ${name} no fue encontrado`,
          HttpStatus.CONFLICT,
        );
      }
      return {
        message: 'La profesor encontrado es:',
        data: profesor,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteByName(name: string): Promise<IResponse> {
    try {
      const profesor = await this.tenisRepository.findOne({
        where: { name },
      });
      if (!profesor) {
        throw new HttpException(
          `El profesor con nombre ${name} no existe en la base de datos`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.tenisRepository.softDelete({ name });
      return {
        message: `Se ha eliminado el profesor llamado ${name}`,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}