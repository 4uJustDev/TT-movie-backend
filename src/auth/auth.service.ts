import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { createUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async registration(dto: createUserDto): Promise<{ token: string }> {
        const candidate = await this.userService.getUserByEmail(dto.email);

        if (candidate) {
            throw new UnauthorizedException({
                message: 'This email is already in use',
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'Bad Request',
            });
        }

        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(dto.password, salt);

        const user = await this.userService.createUser({ ...dto, password: passwordHash });

        return this.generateToken(user);
    }

    async login(dto: createUserDto): Promise<{ token: string }> {
        const user = await this.validateUser(dto);

        return this.generateToken(user);
    }

    private async generateToken(user): Promise<{ token: string }> {
        const payload = { email: user.email, id: user._id, roles: user.roles };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(dto: createUserDto): Promise<User> {
        const user = await this.userService.getUserByEmail(dto.email);

        const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);

        if (isPasswordCorrect && user) {
            return user;
        }

        throw new UnauthorizedException({
            message: 'Incorrect email or password',
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
        });
    }
}
