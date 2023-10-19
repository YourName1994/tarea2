import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.enterface';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class DogsService {

  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    ){}
  
  async create(createDogDto: CreateDogDto, user: UserActiveInterface) {
    const breed = await this.validateBreed(createDogDto.breed);
    return await this.dogRepository.save({...createDogDto,breed: breed, userEmail: user.email
    });
  }

  async findAll(user: UserActiveInterface) {
    if(user.role === Role.ADMIN){
      return await this.dogRepository.find();
    }
    return await this.dogRepository.find(
      {where: {userEmail: user.email}}
    );
  }

  async findOne(id: number,user: UserActiveInterface) {
    
    const dog = await this.dogRepository.findOneBy({id});
    if(!dog){
      throw new BadRequestException('Cat not found');
    }
    this.validateOwership(dog,user);
    return dog;
  }

  async update(id: number, updateDogDto: UpdateDogDto,user: UserActiveInterface) {
    //return await this.catRepository.update(id,updateDogDto);
    await this.findOne(id,user);
    const bredValidator= await this.validateBreed(updateDogDto.breed);
    return await this.dogRepository.update(id,{...updateDogDto,
       breed: updateDogDto.breed ? bredValidator : undefined,
       userEmail: user.email});
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id,user);
    return await this.dogRepository.softDelete({id});
  }

  private validateOwership(dog: Dog, user: UserActiveInterface){
    if(user.role !== Role.ADMIN && dog.userEmail !== user.email){
      throw new UnauthorizedException();
    }
  }

  private async validateBreed(breed: string){
    const breedEntity = await this.breedRepository.findOneBy({name: breed});
    if(!breedEntity){
      throw new BadRequestException('Breed not found');
    }
    return breedEntity;
  }

}
