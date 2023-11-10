import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';
import { Role } from './schemas/role.schema';

@Controller('role')
export class RoleController {
    constructor(private rolesService: RoleService) {}

    @Post()
    create(@Body() dto: createRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @Get()
    getAll(): Promise<Role[]> {
        return this.rolesService.getAll();
    }

    @Get(':value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleValue(value);
    }
}
