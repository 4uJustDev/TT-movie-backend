import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roleAuth.decorator';
import { createUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() userDto: createUserDto) {
        return this.userService.createUser(userDto);
    }

    //@UseGuards(JwtAuthGuard)
    @Roles(Role.User, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Delete()
    removeDocuments() {
        return this.userService.removeAllUsers();
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<User> {
        return this.userService.remove(id);
    }
}
