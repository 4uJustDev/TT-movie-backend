import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleService } from 'src/role/role.service';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';
import { createUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
        private roleService: RoleService,
    ) {}

    async createUser(dto: createUserDto): Promise<User> {
        const user = await this.userModel.create(dto);
        const role = await this.roleService.getRoleValue('user');

        await this.userModel.findByIdAndUpdate(user._id, { $push: { roles: role } });
        await this.roleModel.findByIdAndUpdate(role._id, { $push: { users: user } });

        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async remove(id: number): Promise<User> {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new UnauthorizedException({
                message: 'This user isn`t registrated',
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'Bad Request',
            });
        }
        const userId = user._id;
        for (const roleId of user.roles) {
            const role = await this.roleModel.findById(roleId);
            if (role) {
                role.users = role.users.filter(
                    (roleUserId) => roleUserId.toString() !== userId.toString(),
                );
                await role.save();
            }
        }

        return this.userModel.findByIdAndRemove(id);
    }

    async removeAll() {
        return this.userModel.deleteMany({});
    }
}
