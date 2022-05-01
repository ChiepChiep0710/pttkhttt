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
import { ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';
import { gpssearch } from './gpsdto';
import { gpsService } from './gps.service';
@Controller('gps')
@ApiTags('gps')
export class gpsController {
    constructor(private readonly gpsService: gpsService) { }
    @Get('/getDetailUser')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get location " })
    async searchCatalog(@Query() data: gpssearch, @Request() request) {
        return await this.gpsService.gpsgetlog(data, request);

    }
}