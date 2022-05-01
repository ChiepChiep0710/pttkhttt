import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/models/user.model';
import { RegisterDto } from './dto/register.dto';
import { Utils } from '../../common/utils/ultis';
import { ApiError } from '../../common/responses/api-error';
import { ApiOK } from '../../common/responses/api-ok';
import * as bcrypt from 'bcrypt';
import { VerifyOtpcodeDto } from './dto/verify.otpcode.dto';
import { LoginDto, LoginGoogleDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ResendCodeDto } from './dto/resend.code.dto';
import { Admin } from '../../database/models/admin.model';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const userByEmail = await this.userModel.findOne({
      email: { $regex: Utils.escapeRegex(data.email), $options: 'i' },
    });
    if (userByEmail)
      throw new ApiError(
        'Email đã được đăng kí.Vui lòng sử dụng email khác',
        'E2',
      );

    data.email = data.email.toLowerCase();
    const otpCode = Utils.generateOTP();
    const moment = new Date();
    const expiredDate = new Date();
    expiredDate.setDate(moment.getDate() + 1);

    const user = await this.userModel.create({
      email: data.email,
      password: await Utils.hashPassword(data.password),
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
    });

    const accessToken = Utils.generateToken(user, this.jwtService);
    user.lastToken = accessToken;
    await user.save();
    const jsonres = {
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      lastToken: accessToken,
    };
    return new ApiOK(jsonres);
  }

  async login(data: LoginDto) {
    console.log('hi', data);
    const user = await this.userModel.findOne({
      email: { $regex: Utils.escapeRegex(data.email), $options: 'i' },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new ApiError('Email hoặc mật khẩu không hợp lệ', 'E15', {});
    }

    const accessToken = Utils.generateToken(user, this.jwtService);
    await this.userModel.updateOne(
      { _id: user._id },
      { lastToken: accessToken },
    );
    const jsonres = {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      lastToken: accessToken,
    };
    return new ApiOK(jsonres);
  }

  async logout(request: any) {
    const user = Utils.decodeJwtService(
      request.headers['authorization'],
      this.jwtService,
    );
    try {
      await this.userModel.updateOne({ _id: user['_id'] }, { lastToken: null });
      return new ApiOK({ result: true });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logoutAdmin(request: any) {
    const user = Utils.decodeJwtService(
      request.headers['authorization'],
      this.jwtService,
    );
    try {
      await this.adminModel.updateOne(
        { _id: user['_id'] },
        { lastToken: null },
      );
      return new ApiOK({ result: true });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async loginAdmin(data: LoginDto) {
    const admin = await this.adminModel.findOne({ email: data.email });
    if (!admin || !(await bcrypt.compare(data.password, admin.password))) {
      throw new ApiError('Email hoặc mật khẩu không hợp lệ .', 'E15', {});
    }

    const accessToken = Utils.generateTokenAdmin(admin, this.jwtService);
    await this.adminModel.updateOne(
      { _id: admin._id },
      { lastToken: accessToken },
    );
    return new ApiOK({ lastToken: accessToken });
  }

  async resetPassword(data: LoginDto) {
    const user = await this.userModel.findOne({
      email: { $regex: Utils.escapeRegex(data.email), $options: 'i' },
    });
    if (!user) throw new ApiError('User không tồn tại', 'E1');
    const password = await Utils.hashPassword(data.password);
    user['password'] = password;
    await user.save();
    const accessToken = Utils.generateToken(user, this.jwtService);
    await this.userModel.updateOne(
      { _id: user._id },
      { lastToken: accessToken },
    );
    return new ApiOK({ lastToken: accessToken });
  }
  async getme(request) {
    const user = Utils.decodeJwtService(
      request.headers['authorization'],
      this.jwtService,
    );
    let email = user['email'];
    let searchres = await this.userModel.findOne({ email: email });

    if (searchres) {
      let userres = {
        _id: searchres._id,
        email: searchres.email,
        phoneNumber: searchres.phoneNumber,
        firstName: searchres.firstName,
        lastName: searchres.lastName,
        address: searchres.address,
      };
      return new ApiOK(userres);
    }
  }
  async getmeadmin(request) {
    const user = Utils.decodeJwtService(
      request.headers['authorization'],
      this.jwtService,
    );
    let email = user['email'];
    let searchres = await this.adminModel.findOne({ email: email });

    if (searchres) {
      let userres = {
        _id: searchres._id,
        email: searchres.email,
        phoneNumber: searchres.phoneNumber,
        firstName: searchres.firstName,
        lastName: searchres.lastName,
        address: searchres.address,
      };
      return new ApiOK(userres);
    }
  }
}
