import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { gpslogSchema } from "src/database/models/gps.model";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { JwtModule } from "@nestjs/jwt";
import { gpsController } from "./gps.controller";
import { gpsService } from "./gps.service";
import { UserSchema } from "src/database/models/user.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "gpslog", schema: gpslogSchema }]),
        MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
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
    controllers: [gpsController],
    providers: [gpsService],
})
export class gpsModule { }