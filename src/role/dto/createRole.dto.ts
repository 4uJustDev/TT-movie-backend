import { IsNotEmpty, IsString, Length } from 'class-validator';

export class createRoleDto {
    @IsString({ message: 'Role value must be a string.' })
    @IsNotEmpty({ message: 'Role value cannot be empty.' })
    @Length(4, 20, { message: 'Role value length should be between 4 and 20 characters.' })
    readonly value: string;

    @IsString({ message: 'Role description must be a string.' })
    @IsNotEmpty({ message: 'Role description cannot be empty.' })
    readonly description: string;
}
