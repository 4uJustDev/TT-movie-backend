import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createRoleDto } from './dto/createRole.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

    async createRole(dto: createRoleDto) {
        return await this.roleModel.create(dto);
    }

    async getRoleValue(value: string) {
        return await this.roleModel.findOne({ value });
    }
    async getAll(): Promise<Role[]> {
        return await this.roleModel.find().exec();
    }
}
