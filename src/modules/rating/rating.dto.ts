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
export class RatingDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    comment: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    userid: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;

    @ApiProperty({ required: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    rating: number





}
export class RatingUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    comment: string;


    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    rating: number
}

export class DeleteRatingDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchRatingDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    id: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    comment: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    userid: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    rating: number

}

export class searchRatingDto {
    @ApiProperty({ required: true })
    query: dataSearchRatingDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

