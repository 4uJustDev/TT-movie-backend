import { IsMongoId, IsString } from 'class-validator';

export class addRoleDto {
    @IsString({ message: 'Role value must be a string.' })
    readonly value: string;

    @IsMongoId({ message: 'Invalid user ID.' })
    readonly userId: string; // Assuming the userId is a string representation of ObjectId
}
