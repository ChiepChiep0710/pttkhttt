import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingSchema } from '../../database/models/rating.model';

import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { UserSchema } from 'src/database/models/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                },
            }),
        }),
    ],
    controllers: [RatingController],
    providers: [RatingService],
})
export class RatingModule { }
