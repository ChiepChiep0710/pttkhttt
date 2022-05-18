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
import { searchOptions } from 'src/common/utils/ultis';
export class VoucherDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    description: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    code: string;

    @ApiProperty({ required: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    percent: number;




}
export class saveVoucherDto {
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    voucherlist: [];



}
export class VoucherUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    description: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    code: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    percent: number;





}

export class DeleteVoucherDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchVoucherDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    id: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    description: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    code: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    percent: number;





}

export class searchVoucherDto {
    @ApiProperty({ required: true })
    query: dataSearchVoucherDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

