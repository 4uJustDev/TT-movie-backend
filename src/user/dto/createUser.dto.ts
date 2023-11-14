import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class createUserDto {
    @IsString({ message: 'Email must be a string.' })
    @IsEmail({}, { message: 'Invalid email format.' })
    readonly email: string;

    @IsString({ message: 'Password must be a string.' })
    @Length(8, 20, {
        message: 'Password should be between 8 and 20 characters.',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
            'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    readonly password: string;
}
