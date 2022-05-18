import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    Post,
    Request,
    Param,
    Delete,
    Put,
    Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { BillDto, DeleteBillDto, searchBillDto, BillUpdateDto, checkoutDto } from './bill.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Bill')
@ApiTags('Bill')
export class BillController {
    constructor(private readonly BillService: BillService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Bill' })
    async insertBill(@Body() data: BillDto, @Request() request) {
        console.log(data)
        return await this.BillService.insertBill(data, request);
    }

    @Post('/checkout')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Bill' })
    async checkout(@Body() data: checkoutDto, @Request() request) {
        console.log(data)
        return await this.BillService.checkout(data, request);
    }

    @Delete('/deleteBill')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteBill" })
    async deleteBill(@Body() id: DeleteBillDto, @Request() request) {
        return await this.BillService.deleteBill(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Bill' })

    async updateBill(@Body() data: BillUpdateDto, @Request() request) {


        return await this.BillService.updateBill(data, request);
    }
    @Get('/getListBill')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Bill " })
    async searchBill(@Query() data: searchBillDto, @Request() request) {
        return await this.BillService.searchBill(data, request);

    }

}
