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
import { StorageService } from './storage.service';
import { StorageDto, DeleteStorageDto, searchStorageDto, StorageUpdateDto } from './storage.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Storage')
@ApiTags('Storage')
export class StorageController {
    constructor(private readonly StorageService: StorageService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Storage' })
    async insertStorage(@Body() data: StorageDto, @Request() request) {
        console.log(data)
        return await this.StorageService.insertStorage(data, request);
    }

    @Delete('/deleteStorage')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteStorage" })
    async deleteStorage(@Body() id: DeleteStorageDto, @Request() request) {
        return await this.StorageService.deleteStorage(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Storage' })

    async updateStorage(@Body() data: StorageUpdateDto, @Request() request) {


        return await this.StorageService.updateStorage(data, request);
    }
    @Get('/getListStorage')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Storage " })
    async searchStorage(@Query() data: searchStorageDto) {
        return await this.StorageService.searchStorage(data);

    }

}
