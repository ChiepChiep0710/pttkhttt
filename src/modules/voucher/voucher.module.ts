import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherSchema } from '../../database/models/voucher.model';

import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { UserSchema } from 'src/database/models/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Voucher', schema: VoucherSchema }, { name: 'User', schema: UserSchema }]),

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
    controllers: [VoucherController],
    providers: [VoucherService],
})
export class VoucherModule { }
