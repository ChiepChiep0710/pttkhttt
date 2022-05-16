import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageSchema } from '../../database/models/storage.model';

import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Storage', schema: StorageSchema }]),

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
    controllers: [StorageController],
    providers: [StorageService],
})
export class StorageModule { }
