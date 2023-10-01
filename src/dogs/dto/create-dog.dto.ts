import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateDogDto {
    @IsString()
    @MinLength(1)
    name: string;
    @IsInt()
    age: number;
    @IsString()
    breed: string;

}
