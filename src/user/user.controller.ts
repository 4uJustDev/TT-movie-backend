import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    //Создание пользователя без JWT
    @Post()
    create(@Body() userDto: createUserDto) {
        return this.userService.createUser(userDto);
    }
    //Получение списка всех пользователей
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
    //Выдача ролей
    // @Post('role')
    // addRole(@Body() dto: addRoleDto) {
    //     return this.userService.addRole(dto);
    // }

    @Delete()
    removeDocuments() {
        return this.userService.removeAll();
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<User> {
        return this.userService.remove(id);
    }
}
