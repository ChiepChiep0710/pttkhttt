import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../../database/models/order.model';

import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { UserSchema } from 'src/database/models/user.model';
import { BookSchema } from 'src/database/models/book.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'User', schema: UserSchema }, { name: 'Book', schema: BookSchema }]),

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
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
