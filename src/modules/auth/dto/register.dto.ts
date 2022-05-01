import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, MaxLength, Validate, IsOptional, IsString } from "class-validator";
import { ValidatePasswordRule } from "src/common/validations";

export class RegisterDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'E1' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(256)
  @Validate(ValidatePasswordRule)
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(10)
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8, { message: 'E15' })
  @MaxLength(512, { message: 'E15' })
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8, { message: 'E15' })
  @MaxLength(256, { message: 'E15' })
  userName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8, { message: 'E15' })
  @MaxLength(256, { message: 'E15' })
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8, { message: 'E15' })
  @MaxLength(256, { message: 'E15' })
  lastName: string;
}
