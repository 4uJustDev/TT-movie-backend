import { ObjectId } from 'mongoose';

export class addRoleDto {
    readonly value: string;
    readonly userId: ObjectId;
}
