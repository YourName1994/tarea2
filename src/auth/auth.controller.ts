import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { register } from 'module';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { get } from 'http';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.enterface';


interface RequestWhitUser extends Request{
    user: {
        email: string;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){
        
    }

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,){
        console.log(registerDto);
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ){
        return this.authService.login(loginDto);
    }
/*
    @Get('profile')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    profile(
        @Req()
        req: RequestWhitUser,
    ){
        //return req.user;
        
        return this.authService.profile(req.user);
    }
*/
    @Get('profile')
    @Auth(Role.USER)
    profile(
        @ActiveUser() user: UserActiveInterface,
    ){
        //return req.user;
        
        return this.authService.profile(user);
    }
}
