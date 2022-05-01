import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from "../contants/app-config";
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Validate,
  IsOptional,
  IsString,
  IsNumber,
  IsObject,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
export class Utils {
  public static escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  public static generateOTP() {
    return Math.random().toFixed(6).substr(-6)
  }

  public static hashPassword(password: string) {
    return bcrypt.hash(password, AppConfig.SALT_ROUND);
  }

  public static generateToken(user: any, jwtService: JwtService) {
    const payload = { _id: user._id, role: 'user', userName: user.userName, name: user.firstName + ' ' + user.lastName, email: user.email};
    return jwtService.sign(payload);
  }

  public static decodeJwtService(jwt: string, jwtService: JwtService) {
    const jwtArray = jwt.split(' ');
    return jwtService.decode(jwtArray[1]);
  }

  public static generateTokenAdmin(admin: any, jwtService: JwtService) {
    const payload = { _id: admin._id, role: 'admin', email: admin.email };
    return jwtService.sign(payload);
  }

  public static convertString(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim();
    str = str.replace(/ /g,"-")
    return str.toLowerCase();
  }

}
export class searchOptions{
  @ApiProperty({ required: false })
  @IsOptional()
  sortField: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  sortType: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @ApiProperty({ required: false })
  @Type(()=> Date)
  @IsDate()
  fromDate: Date;

  @ApiProperty({ required: false })
  @Type(()=> Date)
  @IsDate()
  toDate: Date



}
