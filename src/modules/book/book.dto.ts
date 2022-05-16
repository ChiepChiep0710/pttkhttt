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
export class BookDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    author: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    category: string[] = [];

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    rating: string[] = [];

    @ApiProperty({ required: false })
    @IsOptional()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    image: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    sale: string;

}
export class BookUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    author: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    category: string[] = [];

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    rating: string[] = [];

    @ApiProperty({ required: false })
    @IsOptional()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    image: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    sale: string;

}

export class DeleteBookDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchBookDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    id: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    author: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    category: string[] = [];

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    fromprice: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    toprice: number;

}

export class searchBookDto {
    @ApiProperty({ required: true })
    query: dataSearchBookDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

