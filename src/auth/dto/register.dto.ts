import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto{
    //class validator para validar datos
    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(6)
    
    password: string;
}
