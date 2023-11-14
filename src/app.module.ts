import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ActorModule } from './actor/actor.module';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './auth/role.guard';
import { FilesModule } from './files/files.module';
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
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '..', 'src', 'static'),
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MovieModule,
        ActorModule,
        ReviewModule,
        UserModule,
        AuthModule,
        RoleModule,
        FilesModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}
