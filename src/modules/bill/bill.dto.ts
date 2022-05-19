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
class bookrecduceDTo {
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    bookid: string;


    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    quantity: number;
}
export class BillDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    address: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    userid: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    status: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    phonenumber: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    voucher: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    checkout_result: [];

    @ApiProperty({ required: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number;


}
export class BillUpdateDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    _id: string;
    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    address: string;




    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    phonenumber: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    voucher: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    orderlist: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number;


}

export class DeleteBillDto {
    @ApiProperty({ required: true })
    @IsOptional()
    deleteId: [];
}


class dataSearchBillDto {

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    _id: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    address: string;


    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    phonenumber: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    name: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'E1' })
    voucher: string;


    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number;



}

export class searchBillDto {
    @ApiProperty({ required: true })
    query: dataSearchBillDto;

    @ApiProperty({ required: false })
    options: searchOptions;

}

export class checkoutDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'E1' })
    orderlist: [];


}

