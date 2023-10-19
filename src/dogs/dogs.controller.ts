import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.enterface';

@Auth(Role.USER)
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto, @ActiveUser() user: UserActiveInterface ) {
    return this.dogsService.create(createDogDto,user);
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.dogsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.dogsService.findOne(id,user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDogDto: UpdateDogDto, @ActiveUser() user: UserActiveInterface) {
    return this.dogsService.update(id, updateDogDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.dogsService.remove(id,user);
  }
}
