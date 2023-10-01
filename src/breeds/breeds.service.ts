import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {


  constructor(
    @InjectRepository(Breed)
    private readonly breedrepository: Repository<Breed>
  ){}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedrepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedrepository.find();
  }

  async findOne(id: number) {
    return await this.breedrepository.findOneBy({id});
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  async remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
