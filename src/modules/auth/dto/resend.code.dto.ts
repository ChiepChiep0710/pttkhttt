import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class ResendCodeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'E1' })
  @IsString()
  @IsMongoId()
  userId: string;
}
