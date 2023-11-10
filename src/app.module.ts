import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorModule } from './actor/actor.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MovieModule,
        ActorModule,
        ReviewModule,
        UserModule,
        AuthModule,
        RoleModule,
    ],
})
export class AppModule {}
