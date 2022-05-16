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
export class CategoryDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    name: string;






}
export class CategoryUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;





}

export class DeleteCategoryDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchCategoryDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    id: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;





}

export class searchCategoryDto {
    @ApiProperty({ required: true })
    query: dataSearchCategoryDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

