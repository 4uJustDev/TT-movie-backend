import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role, RoleSchema } from './schemas/role.schema';

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    exports: [RoleService],
})
export class RoleModule {}
