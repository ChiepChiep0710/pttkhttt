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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ValidatePasswordRule } from 'src/common/validations';
export class gpssearch {
    @ApiProperty({ required: false })
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @ApiProperty({ required: false })
    @Type(() => Number)
    @IsNumber()
    offset: number;

    @ApiProperty({ required: true })
    @IsOptional()
    userId: string;
}