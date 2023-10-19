import { PartialType } from '@nestjs/mapped-types';
import { CreateDogDto } from './create-dog.dto';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateDogDto extends PartialType(CreateDogDto) {
/*
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;
    @IsInt()
    @IsOptional()
    age?: number;
    @IsString()
    @IsOptional()
    breed?: string;
    */
}
