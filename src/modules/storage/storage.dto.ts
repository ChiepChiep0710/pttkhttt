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
export class StorageDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    name: string;


    @ApiProperty({ required: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantity: number;
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;



}
export class StorageUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantity: number;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;


}

export class DeleteStorageDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchStorageDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    id: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantity: number;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;


}

export class searchStorageDto {
    @ApiProperty({ required: true })
    query: dataSearchStorageDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

