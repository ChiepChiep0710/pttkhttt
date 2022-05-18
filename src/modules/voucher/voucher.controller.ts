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
import { VoucherService } from './voucher.service';
import { VoucherDto, DeleteVoucherDto, searchVoucherDto, VoucherUpdateDto, saveVoucherDto } from './voucher.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Voucher')
@ApiTags('Voucher')
export class VoucherController {
    constructor(private readonly VoucherService: VoucherService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Voucher' })
    async insertVoucher(@Body() data: VoucherDto, @Request() request) {
        console.log(data)
        return await this.VoucherService.insertVoucher(data, request);
    }

    @Delete('/deleteVoucher')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteVoucher" })
    async deleteVoucher(@Body() id: DeleteVoucherDto, @Request() request) {
        return await this.VoucherService.deleteVoucher(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Voucher' })

    async updateVoucher(@Body() data: VoucherUpdateDto, @Request() request) {


        return await this.VoucherService.updateVoucher(data, request);
    }
    @Get('/getListVoucher')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Voucher " })
    async searchVoucher(@Query() data: searchVoucherDto) {
        return await this.VoucherService.searchVoucher(data);

    }
    @Put('/saveVoucher')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Voucher' })

    async saveVoucher(@Body() data: saveVoucherDto, @Request() request) {


        return await this.VoucherService.saveVoucher(data, request);
    }
    @Get('/getUserVoucher')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Voucher " })
    async getUserVoucher(@Request() request) {
    return await this.VoucherService.getVoucher(request);

}

}
