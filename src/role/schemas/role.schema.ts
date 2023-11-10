import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    @Prop({ unique: true, required: true })
    value: string;

    @Prop()
    description: string;

    @Prop({ ref: () => 'User', type: [{ type: mongoose.Schema.Types.ObjectId }] })
    users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
