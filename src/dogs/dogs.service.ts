import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class DogsService {

  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    ){}
  
  async create(createDogDto: CreateDogDto) {
    //const dog = this.catRepository.create(createDogDto);
    //return await this.catRepository.save(createDogDto);
    const breed = await this.breedRepository.findOneBy({name: createDogDto.breed});
    if(!breed){
      throw new BadRequestException('Breed not found');
    }
    return await this.dogRepository.save({...CreateDogDto,breed});
  }

  async findAll() {
    return await this.dogRepository.find();
  }

  async findOne(id: number) {
    return await this.dogRepository.findOneBy({id});
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    //return await this.catRepository.update(id,updateDogDto);
    return;
  }

  async remove(id: number) {
    return await this.dogRepository.softDelete({id});
  }
}
