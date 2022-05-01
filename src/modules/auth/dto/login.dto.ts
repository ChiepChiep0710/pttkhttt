import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, MaxLength, Validate, IsOptional, IsString } from "class-validator";
import { ValidatePasswordRule } from "src/common/validations";

export class LoginDto {
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
}

export class LoginGoogleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'E1' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @MaxLength(256)
  @Validate(ValidatePasswordRule)
  name: string;
}
