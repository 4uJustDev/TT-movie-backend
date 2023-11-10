import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/schemas/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ ref: () => 'Role', type: [{ type: mongoose.Schema.Types.ObjectId }] })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
