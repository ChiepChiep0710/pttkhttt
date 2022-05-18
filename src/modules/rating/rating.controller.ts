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
import { RatingService } from './rating.service';
import { RatingDto, DeleteRatingDto, searchRatingDto, RatingUpdateDto } from './rating.dto';
import { storage } from '../../config/storage.config';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';

@Controller('Rating')
@ApiTags('Rating')
export class RatingController {
    constructor(private readonly RatingService: RatingService) { }

    @Post('/insert')
    @Auth()
    @HttpCode(HttpStatus.OK)
    // @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'insert Rating' })
    async insertRating(@Body() data: RatingDto, @Request() request) {
        console.log(data)
        return await this.RatingService.insertRating(data, request);
    }

    @Delete('/deleteRating')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "deleteRating" })
    async deleteRating(@Body() id: DeleteRatingDto, @Request() request) {
        return await this.RatingService.deleteRating(id, request);

    }
    @Put('/update')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update Rating' })

    async updateRating(@Body() data: RatingUpdateDto, @Request() request) {


        return await this.RatingService.updateRating(data, request);
    }
    @Get('/getListRating')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get list of Rating " })
    async searchRating(@Query() data: searchRatingDto, @Request() request) {
        return await this.RatingService.searchRating(data, request);

    }

}
