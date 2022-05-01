/* eslint-disable prettier/prettier */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, Request
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { VerifyOtpcodeDto } from "./dto/verify.otpcode.dto";
import { LoginDto, LoginGoogleDto } from "./dto/login.dto";
import { Auth } from "../../common/decorator/auth.decorator";
import { ResendCodeDto } from "./dto/resend.code.dto";
import { AuthGuard } from "@nestjs/passport";
import * as http from "http";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'register new user' })
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Post('login-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'user login' })
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Post('logout-user')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'logout' })
  async logout(@Request() request) {
    return await this.authService.logout(request);
  }

  @Post('logout-admin')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'logout admin' })
  async logoutAdmin(@Request() request) {
    return await this.authService.logoutAdmin(request);
  }

  @Post('login-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login with admin' })
  async loginAdmin(@Body() data: LoginDto) {
    return await this.authService.loginAdmin(data);
  }



  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'verify otp code to reset password' })
  async resetPassword(@Body() data: LoginDto) {
    return await this.authService.resetPassword(data);
  }
  @Get('/getMe')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get location " })
  async getMe(@Request() request) {
    return await this.authService.getme(request);

  }
  @Get('/getMeAdmin')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get location " })
  async getmeadmin(@Request() request) {
    return await this.authService.getmeadmin(request);

  }


}
