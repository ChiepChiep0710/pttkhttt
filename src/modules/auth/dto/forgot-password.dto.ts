import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'E1' })
  @IsEmail()
  email: string;
}
