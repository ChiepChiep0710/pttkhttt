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
import { SaleService } from './sale.service';
import { SaleDto, DeleteSaleDto, searchSaleDto, SaleUpdateDto } from './sale.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Sale')
@ApiTags('Sale')
export class SaleController {
    constructor(private readonly SaleService: SaleService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Sale' })
    async insertSale(@Body() data: SaleDto, @Request() request) {
        console.log(data)
        return await this.SaleService.insertSale(data, request);
    }

    @Delete('/deleteSale')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteSale" })
    async deleteSale(@Body() id: DeleteSaleDto, @Request() request) {
        return await this.SaleService.deleteSale(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Sale' })

    async updateSale(@Body() data: SaleUpdateDto, @Request() request) {


        return await this.SaleService.updateSale(data, request);
    }
    @Get('/getListSale')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Sale " })
    async searchSale(@Query() data: searchSaleDto) {
        return await this.SaleService.searchSale(data);

    }

}
