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
export class OrderDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;

    @ApiProperty({ required: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number

    @ApiProperty({ required: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantity: number



}
export class OrderUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantity: number

}

export class DeleteOrderDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchOrderDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    id: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantity: number

}

export class searchOrderDto {
    @ApiProperty({ required: true })
    query: dataSearchOrderDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

