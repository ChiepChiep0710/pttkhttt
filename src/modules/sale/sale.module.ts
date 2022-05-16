import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleSchema } from '../../database/models/sale.model';

import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Sale', schema: SaleSchema }]),

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
    controllers: [SaleController],
    providers: [SaleService],
})
export class SaleModule { }
