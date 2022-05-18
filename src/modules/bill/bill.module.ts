import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from '../../database/models/bill.model';

import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { UserSchema } from 'src/database/models/user.model';
import { BookSchema } from 'src/database/models/book.model';
import { OrderSchema } from 'src/database/models/order.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }, { name: 'User', schema: UserSchema }, { name: 'Book', schema: BookSchema }, { name: "Order", schema: OrderSchema }]),

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
    controllers: [BillController],
    providers: [BillService],
})
export class BillModule { }
