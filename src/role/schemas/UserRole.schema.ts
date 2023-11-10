import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Role } from './role.schema';

export type UserRoleDocument = HydratedDocument<UserRole>;

@Schema()
export class UserRole {
    @Prop({ ref: () => Role.name, type: [{ type: mongoose.Schema.Types.ObjectId }] })
    roleId: ObjectId[];

    @Prop({ ref: () => User.name, type: [{ type: mongoose.Schema.Types.ObjectId }] })
    userId: ObjectId[];
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
