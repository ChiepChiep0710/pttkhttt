import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator"
import { ValidatePasswordRule } from "src/common/validations"

export class ChangePasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'MSG_2' })
  @MinLength(8)
  @MaxLength(256)
  @Validate(ValidatePasswordRule)
  currentPassword: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'MSG_2' })
  @MinLength(8)
  @MaxLength(256)
  @Validate(ValidatePasswordRule)
  newPassword: string;
}
