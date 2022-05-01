import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Utils } from '../../common/utils/ultis';
import { ApiOK } from 'src/common/responses/api-ok';
import { ApiError } from 'src/common/responses/api-error';
import { getlistuser } from './user.dto';
import { gpslog } from 'src/database/models/gps.model';

interface LooseObject {
  [key: string]: any;
}
@Injectable()
export class userService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('gpslog') private readonly gpsModel: Model<gpslog>,
    private readonly jwtService: JwtService,
  ) {}
  async getme(request) {
    const user = Utils.decodeJwtService(
      request.headers['authorization'],
      this.jwtService,
    );
    const email = user['email'];
    const searchres = await this.userModel.findOne({ email: email });

    if (searchres) {
      const userres = {
        email: searchres.email,
        phoneNumber: searchres.phoneNumber,
        firstName: searchres.firstName,
        lastName: searchres.lastName,
        address: searchres.address,
      };
      return new ApiOK({
        result: userres,
      });
    }
  }
  async getlistuser(data: getlistuser, request) {
    const admin = Utils.decodeJwtService(
      request.headers['authorization'],
      this.jwtService,
    );
    console.log(admin);
    if (admin['role'] !== 'admin')
      throw new ApiError('Bạn không có quyền để thực hiện hành động này', 'E3');
    const offset = Number(data.offset) || 0;
    const limit = Number(data.limit) || 0;
    let email: any;
    const query: LooseObject = {};
    if (data.email) {
      query.email = Utils.convertString(data.email);
      query.email = { $regex: Utils.escapeRegex(query.email), $options: 'i' };
    }
    if (data.id) {
      query._id = data.id;
    }
    console.log(query);
    try {
      const searchres = await this.userModel
        .find({ query })
        .select({ password: 0, lastToken: 0 })
        .skip(offset)
        .limit(limit)
        .lean();
      return new ApiOK(searchres);
    } catch (err) {
      return new ApiError(err.message);
    }
  }
  async getdetailuser(data: any, request) {
    const admin = Utils.decodeJwtService(
      request.headers['authorization'],
      this.jwtService,
    );
    console.log(admin);
    if (admin['role'] !== 'admin')
      throw new ApiError('Bạn không có quyền để thực hiện hành động này', 'E3');
    const offset = Number(data.offset) || 0;
    const limit = Number(data.limit) || 30;
    const userId = data.userId;
    console.log('ussẻ ìd', userId);
    try {
      const searchres = await this.gpsModel.findOne({ userId: userId });

      const searchuser = await this.userModel
        .findOne({ _id: userId })
        .select({ password: 0, lastToken: 0 })
        .lean();
      console.log('selo', searchres);
      console.log('user se', searchuser);
      return new ApiOK({
        locations: searchres.logLocation,
        ...searchuser,
      });
    } catch (err) {
      return new ApiError(err.message);
    }
  }
}
