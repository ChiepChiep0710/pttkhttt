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
export class SaleDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    name: string;


    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    percent: number;



}
export class SaleUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    name: string;


    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    percent: number;


}

export class DeleteSaleDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchSaleDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    id: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;


    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    percent: number;


}

export class searchSaleDto {
    @ApiProperty({ required: true })
    query: dataSearchSaleDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

