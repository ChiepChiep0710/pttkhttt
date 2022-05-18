import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AppConfig } from './common/contants/app-config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { gpsModule } from './modules/gps/gps.module';
import { userModule } from './modules/user/user.module';
import { AppGateway } from './app.gateway';
import { BookModule } from './modules/book/book.module';
import { SaleModule } from './modules/sale/sale.module';
import { CategoryModule } from './modules/category/category.module';
import { StorageModule } from './modules/storage/storage.module';
import { OrderSchema } from './database/models/order.model';
import { OrderModule } from './modules/order/order.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { RatingModule } from './modules/rating/rating.module';
import { BillModule } from './modules/bill/bill.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    // gpsModule,
    userModule,
    BookModule,
    SaleModule,
    CategoryModule,
    StorageModule,
    OrderModule,
    VoucherModule,
    RatingModule,
    BillModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', AppConfig.STATIC_DIR),
    // }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
