import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  @MinLength(10)
  phoneNumber: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @MaxLength(512)
  address: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @MinLength(8)
  @MaxLength(256)
  userName: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @MinLength(8)
  @MaxLength(256)
  firstName: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @MinLength(8)
  @MaxLength(256)
  lastName: string;
}
