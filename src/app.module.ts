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

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    // gpsModule,
    userModule,
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
export class AppModule {}
