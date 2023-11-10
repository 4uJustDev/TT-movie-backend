import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() userDto: createUserDto): Promise<{ token: string }> {
        return this.authService.login(userDto);
    }

    @Post('registration')
    registration(@Body() userDto: createUserDto): Promise<{ token: string }> {
        return this.authService.registration(userDto);
    }
}
